/* (C) 2014 Dmitry Sadakov */

'use strict';

/*global config:true */

config.ambieye = true;
config.scenes = true;
config.search = true;
config.tabs = true;
config.feedback = true;

switch(config.app) {
  case 'light':
      config.ambieye = false;
      config.scenes = false;
      config.search = false;
      config.tabs = false;
      config.uservoice = true;
      break;
  case 'pro':
      config.ambieye = true;
      config.scenes = true;
      config.search = true;
      config.tabs = true;
      config.uservoice = true;
      break;
  case 'app':
      config.ambieye = false;
      config.scenes = true;
      config.search = false;
      config.tabs = true;
      config.feedback = false;
      config.uservoice = false;
      break;
  case 'ambieye':
      config.ambieye = true;
      config.scenes = false;
      config.search = false;
      config.tabs = true;
      config.uservoice = true;
      break;
    case 'web':
        config.ambieye = false;
        config.scenes = true;
        config.search = true;
        config.tabs = true;
        config.uservoice = true;
        break;
 }

