import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ComingSoon extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>暂未开放，敬请期待</Text>
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
