import React from 'react';
import {
  ActivityIndicator,
  TextInput,
  Animated,
  FlatList,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { List, ListItem, SearchBar } from "react-native-elements";

import RestaurantListItem from './RestaurantListItem';

function restaurantsFromIds(all, ids) {
  return ids.map(id => all.find(restaurant => restaurant.id === id));
}

@withNavigation
@connect((data, props) => RestaurantList.getDataProps(data, props))
export default class RestaurantList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      text: 'What do you wanna eat?',
      searchValue: '', 
    };
    
  }

  
  //suggestion as user types
  search = searchValue =>{

      //this.setState({searchValue}, () => console.log(this.state.searchValue))
      this.props.navigation.navigate('searchScreen', { searchValue: searchValue });
      console.log('onbuttonpress', this.state.searchValue);

      //this.props.navigation.navigate('search', { searchValue: searchValue });
    
      //this.setState({ searchValue});
      return(
        <View></View>
      );
      //let billamt = this.state.searchValue;
      //console.log(billamt);
      
  }

  _onPressGoButton = (searchValue) => {
    //this.setState({searchValue}, () => console.log(this.state.searchValue))
    this.props.navigation.navigate('search', { searchValue: searchValue });
    console.log('onbuttonpress', this.state.searchValue);
  }


  static getDataProps(data, props) {
    let { restaurants } = data;
    let { all, nearby, visited } = restaurants;

    if (props.nearby) {
      restaurants = restaurantsFromIds(all, nearby);
    } else if (props.visited) {
      restaurants = restaurantsFromIds(all, visited);
    } else if (props.notVisited) {
      let allRestaurantIds = all.map(restaurant => restaurant.id);
      let notVisited = allRestaurantIds.filter(id => !visited.includes(id));
      restaurants = restaurantsFromIds(all, notVisited);
    } else {
      restaurants = all;
    }

    return {
      restaurants,
    };
  }

  state = {
    renderContents: false,
  };

  componentDidMount() {
    this.props.setRef && this.props.setRef(this);
    setTimeout(() => {
      this.setState({ renderContents: true });
    }, 100);
  }

  componentDidUpdate() {
    this.props.setRef && this.props.setRef(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.restaurants !== this.props.restaurants ||
      nextState.renderContents !== this.state.renderContents
    );
  }

  scrollTo(opts) {
    this._scrollView._component.scrollTo(opts);
  }

  renderHeader = () => {
    return (
      // <SearchBar 
      //   placeholder="Type Here..." lightTheme round 
      //   />

<View style={{flex:1, 
  flexDirection: 'row', 
  backgroundColor:'#f7f7f7',
  
  }}>

<View style={{flex:1, 
  paddingLeft:20,
  justifyContent: 'center',
  marginRight: 40,
  marginTop:10,
  marginLeft:10,
  marginBottom:10,
  backgroundColor: '#fff', 
  height: 40, 
  width:280,
  borderTopLeftRadius:30, 
  borderBottomLeftRadius:30,
  borderWidth:1,
  borderColor: '#ff8342',
  }}>
  
  <TextInput style={{
    fontSize: 15,
    textAlign: 'auto',
    color: '#878787',
  }}
       placeholder="What do you wanna eat??"
        onFocus={ () => this.search() }
        //onFocus= {() => this.setState({text : ''})}
        //value={this.state.searchValue}
      />
</View>

<View style={
  {
  backgroundColor: '#fff',
  marginRight:10,
  marginTop:5,
  height:50, width: 50, 
  justifyContent: 'center', 
  alignItems: 'center',
  borderRadius:30,
  position:'absolute',
  left:300,
  borderWidth:1,
  
  borderColor: '#ff8342',
  // borderBottomRightRadius:30,
  // borderTopRightRadius:30,
  }}>
<TouchableOpacity
onPress = { () => this._onPressGoButton(this.state.searchValue)}>

  <Text style={{color: '#ff8342', fontWeight:'bold', fontSize:20}}>Go!</Text>
      {/* <Image style={{}}
          source={require('./search.png')}
      /> */}

</TouchableOpacity>
</View>
</View>

    )
  };

  render() {
    return (
      
      
      <View onLayout={this.props.onLayout} style={styles.container}>
     
        {this.state.renderContents ? (
          <FlatList
            ref={view => {
              this._scrollView = view;
            }}
            contentContainerStyle={this.props.contentContainerStyle}
            renderItem={this._renderItem}
            style={styles.container}
            data={this.props.restaurants.toJS()}
            keyExtractor={item => item.name}
            ListHeaderComponent={this.renderHeader}
          />
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: 75,
            }}>
            <ActivityIndicator />
          </View>
        )}

        <StatusBar barStyle="default" />
      </View>
     
    );
  }

  _renderItem = ({ item }) => {
    return (
      <RestaurantListItem
        onPress={() => this._handlePressRestaurant(item)}
        restaurant={item}
      />
    );
  }

  _handlePressRestaurant = restaurant => {
    this.props.navigation.navigate('details', { restaurantId: restaurant.id });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
});
