import ActionTypes from './ActionTypes';

export default class Actions {
  static setCurrentUser(user) {
    return {
      type: ActionTypes.SET_CURRENT_USER,
      user,
    }
  }

  static signIn(user) {
    return {
      type: ActionTypes.SIGN_IN,
      user,
    }
  }

  static signOut() {
    return {
      type: ActionTypes.SIGN_OUT,
    }
  }

  static setRestaurants(restaurants) {
    return {
      type: ActionTypes.SET_RESTAURANTS,
      restaurants,
    }
  }

  static setNearbyRestaurants(restaurantIds) {
    return {
      type: ActionTypes.SET_NEARBY_BREWERIES,
      restaurantIds,
    }
  }

  static setVisitedRestaurants(restaurantIds) {
    return {
      type: ActionTypes.SET_VISITED_BREWERIES,
      restaurantIds,
    }
  }

  static toggleVisitedRestaurant(restaurantId) {
    return {
      type: ActionTypes.TOGGLE_VISITED_BREWERY,
      restaurantId,
    }
  }

  static addVisitedRestaurant(restaurantId) {
    return {
      type: ActionTypes.ADD_VISITED_BREWERY,
      restaurantId,
    }
  }

  static removeVisitedRestaurant(restaurantId) {
    return {
      type: ActionTypes.REMOVE_VISITED_BREWERY,
      restaurantId,
    }
  }

  static computeDistances() {
    return {
      type: ActionTypes.COMPUTE_DISTANCES,
    }
  }
}
