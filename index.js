/*
 * @Author: learnerty 
 * @Date: 2019-03-21 21:12:43 
 * @Last Modified by:   learnerty 
 * @Last Modified time: 2019-03-21 21:12:43 
 */

import { AppRegistry } from 'react-native';
import { RootNavigator as App } from './app/navigator/appNavigations';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
