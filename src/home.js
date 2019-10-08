import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableHighlight, View, Alert, Image, Button } from 'react-native';
import { f, auth, storage, database } from './firebase';


class home extends React.Component{

  constructor(props){
    super(props);
    this.state={
      Username:false,
      password:false

    }
  }
  writeUserData(Username,password){                          // fucnction of firebase to add the data
    firebase.database().ref('Users/').push({
        Username,
        password
    }).then((data)=>{
        //success callback
        alert('sucessfully data entered');
        console.log('data ' , data)
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    })
  }
    render(){
        return(
            <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
          <TextInput style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(email) => this.setState({ email })} />
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
          <TextInput style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => this.setState({ password })} />
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.writeUserData(this.state.email, this.state.password)}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
          <Text>Forgot your password?</Text>
        </TouchableHighlight>

        <Button
        title="Go to Jane's profile"
        onPress={() => navigate('Profile', {name: 'Jane'})}
      />
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
    }
  });
export default home;