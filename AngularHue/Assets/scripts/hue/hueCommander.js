/**
 * Dmitry Sadakov's Philips Hue Commander wrapper, exposed as an AMD module.
 * Dependencies:
 *    - jQuery 1.8.3
 *    - colors.js (packaged alongside this file)
 * Copyright (c) 2014 Dmitry Sadakov, All rights reserved. */

/*globals trackEvent*/
/*exported hueCommander */
 
var hueCommander = function ($, hue, colorUtil, sceneCmd) { 
    
    'use strict';
    
    var logger = null,
        actors = null,
        executeCommand = function(command) {
            log('executing command: ' + command + ' on actors: ' + actors);
            trackEvent('huecommander', 'command', command);

            if (command === '#brighten') {
                hue.brightenAll(Math.floor(255 / 3));
            }
            if (command === '#darken') {
                hue.brightenAll(Math.floor(-255 / 3));
            }
            if (command === 'on') {
                executeOnActors(function(bulb){
                    hue.turnOn(bulb);
                });
                return;
            }
            if (command === 'off') {
                executeOnActors(function(bulb){
                    hue.turnOff(bulb);
                });
                return;
            }
            var bri = detectBrigthness(command);
            if (bri !== null) {
                executeOnActors(function(bulb){
                    hue.setBrightness(bulb, bri);
                });
                return;
            }
            var color = colorUtil.getColor(command);
            if (color !== false) {
                executeOnActors(function(bulb){
                    hue.setColor(bulb, color.substring(1));
                });
                return;
            }

            if (command === 'scene:stop') {
                sceneCmd.stop();
            }
            if (command.lastIndexOf('scene:', 0) === 0) {
                var sceneName = command.substring(6);
                var lampids = hue.getLampIds(actors);
                sceneCmd.start(sceneName, lampids);
                return;
            }
        },
        executeOnActors = function(func){
            sceneCmd.stop();
            var lampIds = hue.getLampIds(actors);
            if (!$.isArray(lampIds)) {
                lampIds = [lampIds];
            }
            $.each(lampIds, function(index, val){
                func(val);
            });
        },
        detectBrigthness = function(command){
            if (command.startsWith('bri:')) {
                return command.substring('bri:'.length);
            }
            return null;
        },
        log = function (text){
            if (logger !== null) {
                logger(text);
            }
        };
        
 
    return {
        setActor: function(actor) {
            actors = actor;
        },
        getActor: function(actor) {
            return actors;
        },
        getActorStates: function(actor) {
            var lampIds = hue.getLampIds(actors);
            var state = window.hue.getState();
            var actorStates= [];
            if (state.lights !== null) {
                $.each(state.lights, function(key, lamp) {
                    if (lampIds.indexOf(key) !== -1) {
                        log('Lights: ' + key  + 
                            ', name: ' + lamp.name + 
                            ', reachable: ' + lamp.state.reachable + 
                            ', on: ' + lamp.state.on);
                        actorStates.push(lamp);
                    }
                });
            } 
            return actorStates;
        },
        command: function(commandText) {
            executeCommand(commandText);
        },
        setLogger: function(logHandler) {
            logger = logHandler;
        }
    };
};
