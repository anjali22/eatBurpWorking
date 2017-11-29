import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import StarRating from 'react-native-star-rating';

export default class AddRatingScreen extends React.Component {

    state = {
        restaurantName: '',
        review: ''
     }

    constructor(props) {
        super(props);
        this.state = {
          starCount: 3.5
        };
      }

      onStarRatingPress(rating) {
        this.setState({
          starCount: rating
        });
      }

   handleRestaurantName = (text) => {
      this.setState({ email: text })
   }
   handleReview = (text) => {
      this.setState({ password: text })
   }
   login = (email, pass) => {
      alert('email: ' + email + ' password: ' + pass)
   }
   render(){
      return (
         <View style = {styles.container}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Restaurant Name"
               placeholderTextColor = "#000000"
               autoCapitalize = "none"
               onChangeText = {this.handleRestaurantName}/>
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Review"
               placeholderTextColor = "#000000"
               autoCapitalize = "none"
               onChangeText = {this.handleReview}/>
            
            <StarRating
                disabled={false}
                maxStars={5}
                rating={this.state.starCount}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
            />

            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.login(this.state.restaurantName, this.state.review)
               }>
               <Text style = {styles.submitButtonText}> Add Review </Text>
            </TouchableOpacity>
         </View>
      )
   }
}


const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#ff8742',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#ff8742',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   }
})