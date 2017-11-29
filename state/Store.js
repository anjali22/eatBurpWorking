import { applyMiddleware, combineReducers, createStore } from 'redux';
import { effectsMiddleware } from 'redux-effex';

import CurrentUserReducer from './CurrentUserReducer';
import RestaurantsReducer from './RestaurantsReducer';
import Effects from '../effects';

export default createStore(
  combineReducers({
    currentUser: CurrentUserReducer,
    restaurants: RestaurantsReducer,
  }),
  applyMiddleware(effectsMiddleware(Effects)),
);
