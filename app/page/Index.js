import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {DynamicTabNavigator} from '../navigator/appNavigations'

export default class Index extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>首页</Text>
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
