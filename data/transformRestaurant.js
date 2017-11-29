import days from 'days';

type RestaurantHours = {
  monday_open: string,
  monday_close: string,
  tuesday_open: string,
  tuesday_close: string,
  wednesday_open: string,
  wednesday_close: string,
  thursday_open: string,
  thursday_close: string,
  friday_open: string,
  friday_close: string,
  saturday_open: string,
  saturday_close: string,
  sunday_open: string,
  sunday_close: string,
}

type Rating = {
  id: number,
  value: number,
}

type RestaurantData = {
  accentColor?: string,
  address: string,
  city: string,
  color?: string,
  description: string,
  hours: RestaurantHours,
  id: number,
  latitude: string,
  logo: string,
  logo_small: string,
  longitude: string,
  postal_code: string,
  social_instagram: string,
  summary?: ?string,
  title: string,
  ratings: Rating[],
}

export default function transformRestaurant(restaurant: RestaurantData, currentDate = new Date()): any {
  let { hours } = restaurant;
  let day = days[currentDate.getDay()];
  let currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:00`;
  let openingTimeToday = hours[`${day.toLowerCase()}_open`];
  let closingTimeToday = hours[`${day.toLowerCase()}_close`];

  let isOpeningLater = currentTime < openingTimeToday;

  let isOpen = (
    (currentTime > openingTimeToday) &&
    (currentTime < closingTimeToday || closingTimeToday === '00:00:00')
  ) || (
    (closingTimeToday < openingTimeToday) &&
    (currentTime > openingTimeToday)
  );



  return {
    accentColor: restaurant.accentColor || '#000',
    address: restaurant.address,
    city: restaurant.city,
    closingTimeToday,
    color: restaurant.color || '#fff',
    description: restaurant.description,
    hours: restaurant.hours,
    id: restaurant.id,
    instagram: restaurant.social_instagram,
    isOpen,
    isOpeningLater,
    latitude: parseFloat(restaurant.latitude),
    logo: restaurant.logo,
    longitude: parseFloat(restaurant.longitude),
    name: restaurant.title,
    openingTimeToday,
    postalCode: restaurant.postal_code.split(' ').join('').toUpperCase(),
    smallLogo: restaurant.logo_small,
    summary: restaurant.summary,
    ratings: restaurant.ratings,
  };
}
