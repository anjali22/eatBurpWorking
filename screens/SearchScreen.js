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
    SectionList,
    Modal,
    FlatList,
  } from 'react-native';
import Actions from '../state/Actions';
import RestaurantDetails from '../components/RestaurantDetails';

var adresses = [
  {
    street: "1 Martin Place",
      city: "Sydney",
    country: "Australia"
    },{
    street: "vijaynagar",
      city: "Sydney",
    country: "Australia"
  },{
    street: "geetabhavan",
      city: "Sydney",
    country: "Australia"
  },{
    street: "palasia",
      city: "Sydney",
    country: "Australia"
  },{
    street: "rajendra nagar",
      city: "Sydney",
    country: "Australia"
  },{
    street: "sukhliya",
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
     
      defaultButton:'Food',
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
      <View           
      style= {styles.listItem}>
        <Text 
          style={styles.listItemText}
          onPress={() => this._handlePressListItem(adress)}
        >
        {adress.street}, {adress.city}, {adress.country}</Text>
      </View>
    );
  };

  _handlePressListItem = listItem => {
    console.log(listItem);
    this.props.navigation.navigate('searchItemDetails', { listItem: listItem });
    
  }

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

  _onPressFoodButton= () =>{
    console.log('food button clicked');
  }

  _onPressPlacesButton= () =>{
    console.log('places button clicked');
  }

  _onPressPeopleButton= () =>{
    console.log('people button clicked');
  }

  render() {
   return (
      <View style={{flex:1, marginTop: 25,}}>
      <View style={styles.searchBar}>
<View style={{
  flexDirection: 'row', 
  backgroundColor:'#f7f7f7',}}>

<View style={styles.searchInputContainer}>
  
  <TextInput style={styles.searchInput}
       placeholder="What do you wanna eat??"
        onChangeText={this.searchedAdresses}
        onFocus= {() => this.setState({text : ''})}
        //value={this.state.searchValue}
      />
</View>

<View style={styles.searchButtonContainer}>
<TouchableOpacity
onPress = { () => this._onPressGoButton(this.state.searchValue)}>

  <Text style={styles.searchButtonText}>Go!</Text>
    
</TouchableOpacity>
</View>
</View>
      
<View style={{
  flexDirection:'row',
  justifyContent: 'space-around',
  }}>
<View style={styles.searchFilterButton}>
<TouchableOpacity
onPress = { () => this._onPressFoodButton()}>

  <Text style={styles.searchFilterButtonText}>Food</Text>
      {/* <Image style={{}}
          source={require('./search.png')}
      /> */}

</TouchableOpacity></View>

<View style={styles.searchFilterButton}>
<TouchableOpacity
onPress = { () => this._onPressPlacesButton()}>

  <Text style={styles.searchFilterButtonText}>Places</Text>
      {/* <Image style={{}}
          source={require('./search.png')}
      /> */}

</TouchableOpacity></View>

<View style={styles.searchFilterButton}>
<TouchableOpacity
onPress = { () => this._onPressPeopleButton()}>

  <Text style={styles.searchFilterButtonText}>People</Text>
      {/* <Image style={{}}
          source={require('./search.png')}
      /> */}

</TouchableOpacity></View>
</View>   
</View>

<View style={{
  backgroundColor:'#f7f7f7',
  marginTop: 20,
  
  }}>

        <ListView

          dataSource={ds.cloneWithRows(this.state.searchedAdresses)}
          renderRow={this.renderAdress} />
        </View>
          
         {/* <View style={{backgroundColor:'#e7e7e7'}}>
         
         <SectionList
          sections={[
            {title: 'D', data: ['Devin']},
            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
        />
         </View> */}

      </View>
      
    );
  };
   
}

var styles = StyleSheet.create({
  searchBar:{
    backgroundColor: '#f7f7f7',
    paddingBottom:10,
  },
  searchFilterButton: {
    backgroundColor: '#f7f7f7',
    justifyContent: 'center', 
    alignItems: 'center',
    // borderBottomRightRadius:30,
    // borderTopRightRadius:30,
  },
  searchFilterButtonText: {
    color: '#ff8342', 
    fontWeight:'bold', 
    fontSize:20,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ff8342',
  },
  textinput: {
    marginTop: 30,
    backgroundColor: '#DDDDDD',
    height: 40,
    width: 150,
  },
  searchInputContainer: {
    flex:1, 
    paddingLeft:20,
    justifyContent: 'center',
    marginRight: 40,
    marginTop:10,
    marginLeft:10,
    marginBottom:10,
    backgroundColor: '#fff', 
    height: 40, 
    width:280,
    borderTopLeftRadius:30, 
    borderBottomLeftRadius:30,
    borderWidth:1,
    borderColor: '#ff8342',
  },
  searchInput: {
    fontSize: 15,
    textAlign: 'auto',
    color: '#878787',
  },
  searchButtonContainer: {
    backgroundColor: '#fff',
    marginRight:10,
    marginTop:5,
    height:50, width: 50, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderRadius:30,
    position:'absolute',
    left:300,
    borderWidth:1,
    
    borderColor: '#ff8342',
    // borderBottomRightRadius:30,
    // borderTopRightRadius:30,
  },
  searchButtonText: {
    color: '#ff8342', 
    fontWeight:'bold', 
    fontSize:20,
  },
  listItem: {
    backgroundColor: '#fff',
    borderBottomWidth:2,
    borderBottomColor:'#f7f7f7',
    justifyContent: 'flex-start',
    padding: 5,
  },
  listItemText: {
    fontSize: 20,
  }
});
