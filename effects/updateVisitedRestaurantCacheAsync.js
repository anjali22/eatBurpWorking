import LocalStorage from '../state/LocalStorage';

export default function updateVisitedCacheAsync({getState}) {
  let { restaurants } = getState();
  let { visited } = restaurants;

  LocalStorage.saveVisitedRestaurantsAsync(visited.toJS());
}
