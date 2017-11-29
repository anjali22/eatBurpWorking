import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { MapView } from 'expo';

@connect(data => RestaurantMapScreen.getDataProps(data))
export default class RestaurantMapScreen extends React.Component {
  static getDataProps(data) {
    return {
      restaurants: data.restaurants.all,
    };
  }

  render() {
    let { restaurants } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={styles.map}
          loadingBackgroundColor="#f9f5ed"
          showsUserLocation
          initialRegion={{
            latitude: 49.28827,
            longitude: -123.0977,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}>
          {this.props.restaurants.map(restaurant => {
            let { latitude, longitude, name, isOpen } = restaurant;

            return (
              <MapView.Marker
                key={name}
                pinColor={isOpen ? 'green' : 'red'}
                coordinate={{ latitude, longitude }}
                title={name}
              />
            );
          })}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
