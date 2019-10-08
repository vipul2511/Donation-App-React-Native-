import React, { Component } from 'react';
import {StyleSheet, Text, TextInput, TouchableHighlight, View, Image } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import profile from './profile';
//import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'firebase';
import auth from './firebase';

//import firebase from './firebase';
class homescreen extends React.Component {
  static navigationOptions = {
    header:null   
  }
  state = { email: '', password: '', errorMessage: null }
    
      
    
  handleSignUp = (email,password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email,password)
      .then(() => this.props.navigation.navigate('Bottom'))
      .catch(error => alert({ errorMessage: error.message }))
  
  }

  
  



  
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://www.lboro.ac.uk/media/wwwlboroacuk/external/content/services/itservices/ittoolkit/Icon_4%20.jpg' }} />
          <TextInput style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(email) => this.setState({ email })} />
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://cdn3.iconfinder.com/data/icons/black-easy/512/538684-lock_512x512.png' }} />
          <TextInput style={styles.inputs}
            placeholder=" Password"
         //   keyboardType="visible-password"
            underlineColorAndroid='transparent'
            secureTextEntry={true} 
                       onChangeText={(password) => this.setState({ password }) } 
             />
            
        </View>
       


       

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.handleSignUp(this.state.email,this.state.password )}>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} >
          <Text>Create New Account</Text>
        </TouchableHighlight>

        <View>
  <Image style={styles.google_img} source={require('./google.jpg')}/>
</View>
      </View>
    )
  }



}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  },
  
});
export default homescreen;