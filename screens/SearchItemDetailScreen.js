import React from 'react';
import {
  connect,
} from 'react-redux';

import {
    View, Text
} from 'react-native';
import Actions from '../state/Actions';
import RestaurantDetails from '../components/RestaurantDetails';

//@connect((data, props) => SearchItemDetailsScreen.getDataProps(data, props))
export default class SearchItemDetailsScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    }
  }

//   static getDataProps(data, props) {
//     // let restaurantId = props.navigation.state.params.listItem;
//     // //let restaurant = data.restaurants.all.find(restaurant => restaurant.id === restaurantId);

//     // return {
//     //   listItem,
//     // };
//   }

  render() {
    return (
      <View><Text>kjlkdsjlkls</Text></View>
    );
  }
}