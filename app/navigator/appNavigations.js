/*
 * @Author: learnerty 
 * @Date: 2019-03-21 21:06:53 
 * @Last Modified by: learnerty
 * @Last Modified time: 2019-03-21 21:12:08
 */
import React from 'react';
import { createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems, SafeAreaView } from "react-navigation";
import HomePage from '../page/Home'
import Setting from '../page/Setting'
import DrawerPage from '../page/Drawer'
import { ScrollView } from 'react-native'


export const DrawerNavigator = createDrawerNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null,
        }
    },
    Setting: {
        screen: Setting
    }
},
    {
        initialRouteName: 'HomePage',
        contentOptions: {
            activeTintColor: '#108ee9',
        },
        contentComponent: (props) => (
            <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                    <DrawerItems {...props} />
                </SafeAreaView>
            </ScrollView>
        )
    })

const MainNavigator = createStackNavigator({
    DrawerPage: {
        screen: DrawerNavigator,
        navigationOptions: {
            header: null, // 通过将header设为null 来禁用StackNavigator的Navigation Bar
        }
    }
})

export const RootNavigator = createAppContainer(MainNavigator);
