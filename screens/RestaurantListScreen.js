import React from 'react';
import {
  Font,
} from 'expo';
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
} from 'react-native';
import { Constants } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import TouchableNativeFeedback from '@expo/react-native-touchable-native-feedback-safe';
import Modal from 'react-native-root-modal';
import { Header } from 'react-navigation';

import Actions from '../state/Actions';
import RestaurantList from '../components/RestaurantList';
import Layout from '../constants/Layout';
import { BoldText, RegularText } from '../components/StyledText';
import Colors from '../constants/Colors';

const MenuOptions = ['All', 'Nearby', 'Visited', 'Unvisited'];

@connect()
export default class RestaurantListScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  };

  state = {
    menuIsVisible: false,
    menuValue: new Animated.Value(0),
    selectedOption: MenuOptions[0],
  };

  componentDidMount() {
    requestAnimationFrame(() => {
      this.props.dispatch(Actions.computeDistances());
    });
  }

  render() {
    let { selectedOption } = this.state;
    let defaultListProps = {
      key: 'list',
      setRef: view => {
        this._list = view;
      },
      contentContainerStyle: { paddingTop: Layout.HEADER_HEIGHT },
    };

    return (
      
      
      <View style={styles.container}>
       
        {selectedOption === 'All' && <RestaurantList {...defaultListProps} />}
        {selectedOption === 'Nearby' && (
          <RestaurantList {...defaultListProps} nearby />
        )}
        {selectedOption === 'Visited' && (
          <RestaurantList {...defaultListProps} visited />
        )}
        {selectedOption === 'Unvisited' && (
          <RestaurantList {...defaultListProps} notVisited />
        )}

        

        {this._renderNavigationBar()}

      
        

        <Modal
          style={styles.menuModal}
          visible={this.state.menuIsVisible}
          collapsible={false}>
          
          {this._renderMenuOverlay()}

          {this._renderMenu()}
          
        </Modal>
      </View>
     
    );
  }

  _renderMenuOverlay() {
    let opacity = this.state.menuValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.4],
    });

    return (
      <TouchableWithoutFeedback onPress={this._handleToggleMenu}>
        <Animated.View
          pointerEvents={this.state.menuIsVisible ? 'auto' : 'none'}
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: '#000', opacity },
          ]}
        />
      </TouchableWithoutFeedback>
    );
  }

  _renderMenu() {
    let translateY = this.state.menuValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-300, 0],
    });

    return (
      <Animated.View style={[styles.menu, { transform: [{ translateY }] }]}>
        {MenuOptions.map(this._renderMenuOption)}
      </Animated.View>
    );
  }

  _renderMenuOption = title => {
    return (
      <TouchableNativeFeedback
        fallback={TouchableHighlight}
        underlayColor="#eee"
        key={title}
        onPress={() => this._handleSelectOption(title)}>
        <View style={styles.menuOption}>
          <RegularText>{title}</RegularText>
        </View>
      </TouchableNativeFeedback>
    );
  };

  _navigationBarAnimatedStyles = {};

  _renderSearchBar() {
    return (
      // <SearchBar 
      //   placeholder="Type Here..." lightTheme round 
      //   />

<View style={{flex:1, 
  flexDirection: 'row', 
  backgroundColor:'#f7f7f7',
  
  }}>

<View style={{flex:1, 
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
  borderWidth:1.5,
  borderColor: '#ff8342',
  }}>
  <TextInput style={{
    fontSize: 15,
    textAlign: 'auto',
    color: '#878787',
  }}
       
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}

      />
</View>

<View style={
  {
  backgroundColor: '#fff',
  marginRight:10,
  marginTop:5,
  height:50, width: 50, 
  justifyContent: 'center', 
  alignItems: 'center',
  borderRadius:30,
  position:'absolute',
  left:300,
  borderWidth:1.5,
  
  borderColor: '#ff8342',
  // borderBottomRightRadius:30,
  // borderTopRightRadius:30,
  }}>
<TouchableOpacity>

  <Text style={{color: '#ff8342', fontWeight:'bold', fontSize:20}}>Go!</Text>
      {/* <Image style={{}}
          source={require('./search.png')}
      /> */}

</TouchableOpacity>
</View>
</View>

    )
  }

  _renderNavigationBar() {
    let { contentHeight, menuValue } = this.state;

    let arrowRotation = menuValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['90deg', '-90deg'],
    });
    return (
      <View key="navbar" style={styles.navigationBarContainer}>
        <View style={styles.navigationBarTitleContainer}>
          <TouchableWithoutFeedback
            hitSlop={{ left: 40, top: 30, right: 40, bottom: 10 }}
            onPress={this._handleToggleMenu}>
            <View style={{ flexDirection: 'row' }}>
              <BoldText style={styles.navigationBarTitle}>
                Eatburp!
              </BoldText>

              <Animated.View
                style={{
                  marginLeft: 2,
                  marginTop: 2,
                  transform: [{ rotate: arrowRotation }],
                }}>
                <MaterialIcons name="chevron-right" size={22} />
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.navigationBarRightButton}>
          <TouchableNativeFeedback onPress={this._handlePressUpdateLocation}>
            <MaterialIcons name="my-location" size={20} />
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }

  _handleSelectOption = option => {
    this.setState({ selectedOption: option });
    this._handleToggleMenu();
  };

  _handleToggleMenu = () => {
    let { menuIsVisible } = this.state;
    let onCompleteAnimation = () => {};

    // When transitioning from visible->hidden, we wait until the animation
    // completes before updating the state, otherwise it will be hidden
    // before the animation can be run
    if (this.state.menuIsVisible) {
      onCompleteAnimation = ({ finished }) => {
        this.setState({ menuIsVisible: false });
      };
    } else {
      this.setState({ menuIsVisible: true });
    }

    Animated.spring(this.state.menuValue, {
      toValue: menuIsVisible ? 0 : 1,
      overshootClamping: true,
    }).start(onCompleteAnimation);
  };

  _handlePressUpdateLocation = () => {
    this.props.dispatch(Actions.computeDistances());
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigationBarContainer: {
    backgroundColor: '#ff8342',
    height: Layout.HEADER_HEIGHT,
    //borderBottomWidth: 2,
    //borderBottomColor: '#e7e7e7',
    position: 'absolute',
    overflow: 'hidden',
    paddingTop: Constants.statusBarHeight,
    top: 0,
    left: 0,
    right: 0,
  },
  navigationBarTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    //justifyContent: Platform.OS === 'ios' ? 'center' : 'flex-start',
  },
  navigationBarTitle: {
    //fontFamily: 'Pacifico',
  
    color:'#fff',
    
    fontSize: 20,
    //letterSpacing: -0.5,
  },
  navigationBarRightButton: {
    position: 'absolute',
    top: 0,
    right: 15,
    bottom: 0,
    top: Constants.statusBarHeight,
    justifyContent: 'center',
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  menuModal: {
    ...StyleSheet.absoluteFillObject,
    top: Layout.HEADER_HEIGHT,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  menuOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    width: Layout.window.width,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
});
