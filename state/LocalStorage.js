import { AsyncStorage } from 'react-native';

const Keys = {
  User: 'User',
  VisitedRestaurants: 'Visited',
};

async function getUserAsync() {
  let results = await AsyncStorage.getItem(Keys.User);

  try {
    return JSON.parse(results);
  } catch(e) {
    return null;
  }
}

function saveUserAsync(user) {
  return AsyncStorage.setItem(Keys.User, JSON.stringify(user));
}

function removeUserAsync() {
  return AsyncStorage.removeItem(Keys.User);
}

function saveVisitedRestaurantsAsync(restaurantIds) {
  return AsyncStorage.setItem(Keys.VisitedRestaurants, JSON.stringify(restaurantIds));
}

async function getVisitedRestaurantsAsync() {
  let results = await AsyncStorage.getItem(Keys.VisitedRestaurants);

  try {
    return JSON.parse(results);
  } catch(e) {
    return null;
  }
}

function clearAllAsync() {
  return AsyncStorage.clear();
}

export default {
  saveUserAsync,
  getUserAsync,
  removeUserAsync,
  saveVisitedRestaurantsAsync,
  getVisitedRestaurantsAsync,
  clearAllAsync,
};
