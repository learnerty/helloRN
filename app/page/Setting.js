/*
 * @Author: learnerty 
 * @Date: 2019-03-21 21:08:15 
 * @Last Modified by: learnerty
 * @Last Modified time: 2019-03-21 21:12:27
 */
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Setting extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Setting</Text>
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
