import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigationUtil from '../navigator/NavigationUtil'

export default class Header extends Component {
  render() {
    const { navigation,title,firstpage } = this.props
    return (
      <View style={styles.header}>
        {
          firstpage ?
            <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.iconBox}>
              <AntDesign
                name={'menu-fold'}
                size={22}
                style={styles.icon}
              />
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => NavigationUtil.goBack(navigation)} style={styles.iconBox}>
              <AntDesign
                name={'stepbackward'}
                size={22}
                style={styles.icon}
              />
            </TouchableOpacity>
        }
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 40,
    backgroundColor: '#69c0ff',
    position: 'relative'
  },
  title: {
    lineHeight: 40,
    textAlign: 'center',
    color: '#fff'
  },
  iconBox: {
    position: 'absolute',
    width: 26,
    left: 10,
    top: 10,
    zIndex: 9
  },
  icon: {
    textAlign: 'center',
    color: '#fff'
  }
});