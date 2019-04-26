/*
 * @Author: learnerty 
 * @Date: 2019-03-21 21:08:04 
 * @Last Modified by: learnerty
 * @Last Modified time: 2019-03-21 21:12:17
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Drawer extends Component {
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>home</Text>
        <Button title="打开抽屉" onPress={() => navigation.openDrawer()}></Button>
        <Button title="关闭抽屉" onPress={() => navigation.closeDrawer()}></Button>
        <Button title="切换抽屉" onPress={() => navigation.toggleDrawer()}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
