import React from 'react';
import { Platform } from 'react-native';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { capitalize } from 'lodash';

import AuthenticationScreen from '../screens/AuthenticationScreen';
import RestaurantDetailsScreen from '../screens/RestaurantDetailsScreen';
import RestaurantListScreen from '../screens/RestaurantListScreen';
import RestaurantMapScreen from '../screens/RestaurantMapScreen';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import SettingsScreen from '../screens/SettingsScreen';
import AddRatingScreen from '../screens/AddRatingScreen';
import SearchScreen from '../screens/SearchScreen';
import SearchItemDetailScreen from '../screens/SearchItemDetailScreen';



const SearchStack = StackNavigator(
  {
    searchItemDetails: {
      screen: SearchItemDetailScreen,
    },
    searchScreen: {
      screen: SearchScreen,
    },
  }
);

const ListStack = StackNavigator(
  {
    list: {
      screen: RestaurantListScreen,
    },
    details: {
      screen: RestaurantDetailsScreen,
    },
    search: {
      screen: SearchStack,
    }
  },
  {
    headerMode: 'none',
    cardStyle: {
      backgroundColor: '#fff',
    },
  }
);

const SettingsStack = StackNavigator(
  {
    mainSettings: {
      screen: SettingsScreen,
    },
  },
  {
    navigationOptions: {
      title: 'Settings',
      headerTitleStyle: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 17,
        letterSpacing: -0.5,
        fontWeight: Platform.OS === 'android' ? '400' : 'normal',
      },
      headerStyle: {
        backgroundColor: '#fff',
      },
    },
  }
);

const TabLayout = TabNavigator(
  {
    list: {
      screen: ListStack,
    },
    map: {
      screen: RestaurantMapScreen,
    },
    addRating: {
      screen: AddRatingScreen,
    },
    settings: {
      screen: SettingsStack,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: () => {
        const { routeName } = navigation.state;
        let label = capitalize(routeName);
        if (label === 'List') {
          return 'Cafes';
        } if(label === 'Addrating'){
          return 'Add Rating';
        }else {
          return label;
        }
      },
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;                                                                       
        switch (routeName) {
          case 'list':
            iconName = Platform.OS === 'ios' ? 'ios-list' : 'md-list';
            break;
          case 'map':
            iconName = Platform.OS === 'ios' ? 'ios-map-outline' : 'md-map';
            break;
          case 'settings':
            iconName = Platform.OS === 'ios' ? 'ios-options-outline' : 'md-options';
            break;
          case 'addRating' :
          iconName = Platform.OS === 'ios' ? 'ion-md-star-outline' : 'md-star';
        }
        return (
          <Ionicons
            name={iconName}
            size={Platform.OS === 'ios' ? 30 : 27}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      style: {
        backgroundColor: Colors.appThemeColor,
      },
      activeTintColor: Colors.tabIconSelected,
      inactiveTintColor: Colors.tabIconDefault,
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);

export default StackNavigator(
  {
    tabs: {
      screen: TabLayout,
    },
  },
  {
    headerMode: 'none',
    cardStyle: {
      backgroundColor: '#fff',
    },
  }
);