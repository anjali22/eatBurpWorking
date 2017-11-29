import React from 'react';
import {
  connect,
} from 'react-redux';

import Actions from '../state/Actions';
import RestaurantDetails from '../components/RestaurantDetails';

@connect((data, props) => RestaurantDetailsScreen.getDataProps(data, props))
export default class RestaurantDetailsScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    }
  }

  static getDataProps(data, props) {
    let restaurantId = props.navigation.state.params.restaurantId;
    let restaurant = data.restaurants.all.find(restaurant => restaurant.id === restaurantId);

    return {
      restaurant,
    };
  }

  render() {
    return (
      <RestaurantDetails
        restaurant={this.props.restaurant}
        isVisited={this.props.isVisited}
        onToggleVisited={this._onToggleVisited}
      />
    );
  }
}
