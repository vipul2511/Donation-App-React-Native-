/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableHighlight, View, Alert, Image, Button } from 'react-native';
import firebase from 'firebase';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import Permissions from 'react-native-permissions'
import Loading from './src/loading';
import Registration from './src/registrationForm';
import { MenuProvider } from 'react-native-popup-menu';

//import RNFetchBlob from 'react-native-fetch-blob';

import DetailsScreen from './src/DetailsScreen';
import homescreen from './src/homescreen';
import  SignedIn  from './src/bottomnagivation';

import profile from './src/profile';




//import DrawerNavigator from './src/drawernagivation';*/




/*const Blob=RNFetchBlob.polyfill.Blob
const fs= RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob*/

/* _takePicture = () => {
    const cam_options = {
      mediaType: 'photo',
      maxWidth: 1000,
      maxHeight: 1000,
      quality: 1,
      noData: true,
    };
    ImagePicker.launchCamera(cam_options, (response) => {
      if (response.didCancel) {
      }
      else if (response.error) {
      }
      else {
        this.setState({
          imagePath: response.uri,
          imageHeight: response.height,
          imageWidth: response.width,
        })
      }
    })
  }

/* const uploadImage = (uri, imageName, mime = 'image/jpg') => {
  return new Promise((resolve, reject) => {
   // const uploadUri = Platform.OS === 'android' ? uri.replace('file://', '') : uri
      let uploadBlob = null
      const imageRef = firebaseApp.storage().ref('posts').child('gallery')
      fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const storeReference =(downloadUrl,sessionId)=>{
  let imageRef=firebase.storage().ref('posts').child('gallery')
  let image={
    type:'image',
    url:downloadUrl,
    createdAt:sessionId,
    user:{
      id:currentUser.uid,
      email:currentUser.email
    }
  }
  firebase.database().ref('Users/').push(image);
}*/



const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const RootStack = createStackNavigator({
  Loader : Loading,
  Register:Registration,
  Home: homescreen,
  Bottom: SignedIn,
  Details:DetailsScreen,
  Imgupload:Registration

},
  {
    initialRouteName: 'Loader',
    
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false
    },
      headerTintColor: '#ffffff',
    
    },
    
  
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  static navigationOption = {
    header: null
  }

  
  





  /*s4= () =>{
    return Math.floor((1+Math.random())* 0x10000)
    .toString(16).substring(1);
  }
uniqueId =()=>{
  return this.s4() + this.s4()+ '-' +this.s4()+ '-' + this.s4() +'-'+
  this.s4() +'-' + this.s4()+'-' + this.s4() +'-' + this.s4();
}

findNewImage = async() =>{

 

  let result = await ImagePicker.launchImageCameraAsync({
      aspect:[4,3],
    allowsEditing: true
  });
  if(!result.cancelled){
    this.setState({image:result.uri});
    console.log("logged");
  }
  else{
    console.log("not uploa");
  }
}*/










  /*writeUserData(Username,password){                          // fucnction of firebase to add the data
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
  }*/





  render() {

    return (
      <MenuProvider>
      <AppContainer />
      </MenuProvider>

    );

  }


}













