/**
 * Scene Commander
 * Dependencies:
 *    - jQuery 1.8.3
 *    - colors.js (packaged alongside this file)
 * Copyright (c) 2014 Dmitry Sadakov, All rights reserved. */

/*globals scenes */
/*exported sceneCommander */

'use strict';

var sceneCommander = function ($, hue) { 
    var logger = null,
        scene = null,
        sceneTimer = null,
        sceneStart = function(sceneName, lampIds) 
        {
        	sceneStop(); 
            log('Starting scene ' + sceneName);
            scene = scenes[sceneName];
            if (scene === undefined) {
                // might be programmed into the bridge already:
                var state = hue.getState();
                if (state.scenes[sceneName] !== undefined) {
                    hue.startScene(sceneName);
                }
            } else {
                if (scene.interval === 0) {
                	// one time hit
                	setTimeout(sceneUpdate, 10);
                }
                else {
                	// counter
    	            sceneTimer = setInterval(function intervaledSceneUpdate() {
                        sceneUpdate(lampIds);
                    }, scene.interval); 
                    sceneUpdate(lampIds); // start now.
    	        }
            }
        },
        sceneStop = function(){
            log('Stop scenes');
            clearInterval(sceneTimer);
            scene = null;
        },
        sceneUpdate = function(lampIds){
            log('Updating scenes');
            if(scene === null) {
                clearInterval(sceneTimer);
            } else {
                var lightStates = scene.update(lampIds);
                $(lightStates).each(function setSceneState(index, state) {
                    var time = state.transitionTime; 
                    if (state.color !== undefined) {
                    	var co = state.color.color !== undefined ? state.color.color : state.color;
                        hue.setColor(state.lamp, co.substring(1), time, state.bri);
                    } else if (state.bri !== undefined) {
                        hue.brighten(state.lamp, state.bri, time);
                    }
                });
            }
        },
        log = function (text){
            if (logger !== null) {
                logger(text);
            }
        };
        
 
    return {
    	executing: function(){
    		return scene; // null if none
    	},
        sceneExists: function(sceneName) {
			return scenes[sceneName] !== undefined;
        },
        start: function(sceneName, actors) {
			sceneStart(sceneName, actors);
        },
        stop: function() {
			sceneStop();
        },
        setLogger: function(logHandler) {
            logger = logHandler;
        }
    };
};
