/*
 * @Author: learnerty 
 * @Date: 2019-03-21 21:06:53 
 * @Last Modified by: learnerty
 * @Last Modified time: 2019-03-21 21:12:08
 */
import React from 'react';
import { createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems, createMaterialTopTabNavigator } from "react-navigation";
import { BottomTabBar, createBottomTabNavigator } from 'react-navigation-tabs';
import JokePage from '../page/Joke'
import ComingSoon from '../page/ComingSoon'
import Setting from '../page/Setting'
import { ScrollView } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigationUtil from '../navigator/NavigationUtil'

export const DrawerNavigator = createDrawerNavigator({
  JokePage: {
    screen: JokePage
  },
  Setting: {
    screen: Setting
  }
}, {
    initialRouteName: 'JokePage',
    contentOptions: {
      activeTintColor: '#108ee9',
    },
    contentComponent: (props) => (
      <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
        <DrawerItems {...props} />
      </ScrollView>
    )
  })

const TABS = { //在这里配置页面的路由
  HomePage: {
    screen: DrawerNavigator,
    navigationOptions: {
      tabBarLabel: '首页',
      tabBarIcon: ({ tintColor }) => (
        <AntDesign
          name={'home'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }
  },
  ComingSoon: {
    screen: ComingSoon,
    navigationOptions: {
      tabBarLabel: '敬请期待',
      tabBarIcon: ({ tintColor }) => (
        <AntDesign
          name={'frown'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }
  }
};

export class DynamicTabNavigator extends React.Component {
  /**
   * 获取动态的Tab
   * @returns {*}
   * @private
   */
  _tabNavigator() {
    let tabs = {};
    if (this.props.navigation.state.params && this.props.navigation.state.params.tabs) {
      /**
       * 取出上一个页面传过来的要显示的tab参数，也可以是从服务端下发的的Tab的配置，
       * 比如显示createBottomTabNavigator中的那些Tab,
       * 这个配置页可以是在其他页面获取之后通过AsyncStorage写入到本地缓存，
       * 然后在这里读取缓存，也可以通过其他方式如props、global config等获取
       ***/
      this.props.navigation.state.params.tabs.forEach(e => {//根据需要定制要显示的tab
        tabs[e] = TABS[e];
      })

    } else {
      const { HomePage, ComingSoon } = TABS;//根据需要定制要显示的tab
      tabs = { HomePage, ComingSoon };
    }
    return createAppContainer(createBottomTabNavigator(tabs, {//应用修改后的tab
      tabBarComponent: TabBarComponent
    }));
  }

  render() {
    const Tabs = this._tabNavigator();
    NavigationUtil.navigation = this.props.navigation
    return (
      <Tabs />
    );
  }
}

class TabBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.theme = {
      tintColor: props.activeTintColor,
      updateTime: new Date().getTime()
    }
  }

  render() {
    const { routes, index } = this.props.navigation.state;
    if (routes[index].params) {
      const { theme } = routes[index].params;
      if (theme && theme.updateTime > this.theme.updateTime) {
        this.theme = theme;
      }
    }

    return (
      <BottomTabBar
        {...this.props}
        activeTintColor={this.theme.tintColor || this.props.activeTintColor}
      />
    );
  }
}

const MainNavigator = createStackNavigator({
  IndexPage: {
    screen: DynamicTabNavigator,
    navigationOptions: {
      header: null
    }
  },
  detailsPage: {
    screen: Setting,
    navigationOptions: {
      header: null
    }
  }
})

export const RootNavigator = createAppContainer(MainNavigator);
