import ActionTypes from './ActionTypes';
import { RestaurantsState, Restaurant } from './Records';

class RestaurantsReducer {
  static reduce(state = new RestaurantsState(), action) {
    if (RestaurantsReducer[action.type]) {
      return RestaurantsReducer[action.type](state, action);
    } else {
      return state;
    }
  }

  static [ActionTypes.SET_RESTAURANTS](state, action) {
    let restaurants = action.restaurants.sortBy(restaurant => restaurant.name);
    return state.set('all', restaurants);
  }

  static [ActionTypes.SET_NEARBY_BREWERIES](state, action) {
    return state.set('nearby', action.restaurantIds);
  }

  static [ActionTypes.SET_VISITED_BREWERIES](state, action) {
    return state.set('visited', action.restaurantIds);
  }

  static [ActionTypes.ADD_VISITED_BREWERY](state, action) {
    let visited = state.visited.push(action.restaurantId);
    return state.set('visited', visited);
  }

  static [ActionTypes.REMOVE_VISITED_BREWERY](state, action) {
    let index = state.visited.indexOf(action.restaurantId);

    if (index === -1) {
      return state;
    }

    return state.set('visited', state.visited.delete(index));
  }
}

export default RestaurantsReducer.reduce;
