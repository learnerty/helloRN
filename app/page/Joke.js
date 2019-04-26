import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import {createMaterialTopTabNavigator,createAppContainer} from 'react-navigation';
import Header from '../component/Header'
import NavigationUtil from '../navigator/NavigationUtil'

const {width} = Dimensions.get('window')

class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.item);
  };

  render() {
    let {item} = this.props
    let header = `https://${item.header.split('http://') && item.header.split('http://')[1]}`
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={styles.itemSty}>
          <Image source={{uri: header}}
            style={styles.itemImage}/>
          <View style={styles.itemContent}>
            <Text style={styles.itemTitle} numberOfLines={1} ellipsizeMode='tail'>{item.text}</Text>
            <View style={styles.itemAuthorOfTime}>
              <Text>{item.username}</Text>
              <Text>{item.passtime}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

class TopTab extends Component {
  constructor () {
    super()
    this.state = {
      page: 1,
      type: '1',
      data: []
    }
  }
  getListData () {
    fetch(`https://www.apiopen.top/satinGodApi?type=${this.state.type}&page=${this.state.page}`,{
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
    .then(resJson => {
      if (resJson.data && resJson.data.length) {
        console.log(this.state.data)
        this.setState({
          data: [...this.state.data, ...resJson.data],
          page: this.state.page + 1
        })
      }
    })
  }
  _keyExtractor = (item, index) => item.uid + index;
  _onPressItem = (item) => {
    // this.props.navigation.navigate('detailsPage')
    NavigationUtil.goPage({},'detailsPage')
  }
  _onEndReached = () => {
    this.getListData()
  }
  _renderItem = ({item}) => {
    return (
      <MyListItem
        onPressItem={this._onPressItem}
        item={item}
      />
    )
  }
  componentDidMount () {
    this.setState({
      type: this.props.type
    }, () => this.getListData())
  }
  render () {
    return (
      <View>
        <FlatList
          data={this.state.data}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={1}
        />
      </View>
    )
  }
}

const MaterialTopTabNavigator = createMaterialTopTabNavigator({//在这里配置页面的路由
  all: {
    screen: (props) => <TopTab {...props} type="1"/>,
    navigationOptions: {
      tabBarLabel: '全部',
    }
  },
  text: {
    screen: (props) => <TopTab {...props} type="2"/>,
    navigationOptions: {
      tabBarLabel: '文字'
    }
  },
  img: {
    screen: (props) => <TopTab {...props} type="3"/>,
    navigationOptions: {
      tabBarLabel: '图片'
    }
  },
  gif: {
    screen: (props) => <TopTab {...props} type="4"/>,
    navigationOptions: {
      tabBarLabel: 'gif'
    }
  },
  video: {
    screen: (props) => <TopTab {...props} type="5"/>,
    navigationOptions: {
      tabBarLabel: '视频'
    }
  },
},
  {
    tabBarOptions: {
      tabStyle: {
        minWidth: 40
      },
      upperCaseLabel: false,//是否使标签大写，默认为true
      scrollEnabled: true,//是否支持 选项卡滚动，默认false
      // activeTintColor: 'white',//label和icon的前景色 活跃状态下（选中）
      // inactiveTintColor: 'gray',//label和icon的前景色 活跃状态下（未选中）
      style: {
        backgroundColor: '#678',//TabBar 的背景颜色
      },
      indicatorStyle: {
        height: 2,
        backgroundColor: 'white',
      },//标签指示器的样式
      labelStyle: {
        fontSize: 13,
        marginTop: 6,
        marginBottom: 6,
      },//文字的样式
    },
  }
);

const MaterialTopTabNavigatorContainer = createAppContainer(MaterialTopTabNavigator)

export default class Joke extends Component {
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Header navigation={navigation} title="段子" firstpage={true}/>
        <MaterialTopTabNavigatorContainer/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  itemSty: {
    padding: 10,
    flexDirection: 'row'
  },
  itemImage: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  itemContent: {
    flexGrow: 1
  },
  itemTitle: {
    marginBottom: 6,
    width: width - 70,
    color: '#262626',
    fontSize: 14
  },
  itemAuthorOfTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#bfbfbf'
  }
});
