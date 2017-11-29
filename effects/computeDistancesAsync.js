import {
  Platform,
} from 'react-native';
import {
  Location,
  Permissions,
} from 'expo';
import geolib from 'geolib';

import Actions from '../state/Actions';

export default async function computeDistancesAsync({dispatch, getState}) {
  let { restaurants } = getState();
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') { return; }

  let { coords } = await Location.getCurrentPositionAsync({
    enableHighAccuracy: Platform.OS === 'ios',
  });

  let restaurantsWithDistances = restaurants.all.map(restaurant => {
    let distanceM = geolib.getDistance(
      {latitude: coords.latitude, longitude: coords.longitude},
      {latitude: restaurant.latitude, longitude: restaurant.longitude},
    );

    let distanceKm = (distanceM / 1000.0).toFixed(2);
    let formattedDistance = `${distanceKm}km`;

    let direction = geolib.getCompassDirection(
      {latitude: coords.latitude, longitude: coords.longitude},
      {latitude: restaurant.latitude, longitude: restaurant.longitude},
    );

    return restaurant.
      set('distance', formattedDistance).
      set('direction', direction);
  });


  let nearbyRestaurants = restaurantsWithDistances.
    sortBy(restaurant => restaurant.distance).
    map(restaurant => restaurant.id);

  dispatch(Actions.setRestaurants(restaurantsWithDistances));
  dispatch(Actions.setNearbyRestaurants(nearbyRestaurants));
}
