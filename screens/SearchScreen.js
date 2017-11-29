import React from 'react';
import {
  connect,
} from 'react-redux';
import {
    Animated,
    Platform,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    TextInput,
    Text,
    ListView,
  } from 'react-native';
import Actions from '../state/Actions';
import RestaurantDetails from '../components/RestaurantDetails';

var adresses = [
  {
    street: "1 Martin Place",
      city: "Sydney",
    country: "Australia"
    },{
    street: "1 Martin Street",
      city: "Sydney",
    country: "Australia"
  }
];

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


@connect((data, props) => SearchScreen.getDataProps(data, props))
export default class SearchScreen extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      searchedAdresses: []
    };
  };

  searchedAdresses = (searchedText) => {
    var searchedAdresses = adresses.filter(function(adress) {
      return adress.street.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
    });
    this.setState({searchedAdresses: searchedAdresses});
  };

    renderAdress = (adress) => {
    return (
      <View>
        <Text>{adress.street}, {adress.city}, {adress.country}</Text>
      </View>
    );
  };

  static route = {
    navigationBar: {
      visible: false,
    }
  }

  static getDataProps(data, props) {
    let searchValue = props.navigation.state.params.searchValue;
    //let restaurant = data.restaurants.all.find(restaurant => restaurant.id === restaurantId);
    return {
        searchValue,
      };
    
    // return {
    //   restaurant,
    // };
  }

  render() {
   return (
      <View style={styles.container}>
        <TextInput 
            style={styles.textinput}
            onChangeText={this.searchedAdresses}
            placeholder="Type your adress here" />
        <ListView
                    dataSource={ds.cloneWithRows(this.state.searchedAdresses)}
          renderRow={this.renderAdress} />
      </View>
    );
  };
   
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  textinput: {
    marginTop: 30,
    backgroundColor: '#DDDDDD',
    height: 40,
    width: 200
  }
});
