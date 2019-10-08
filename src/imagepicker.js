import React, { Component } from 'react';
console.log("executed");
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  Platform,
  Button,
  View
} from 'react-native';

import firebase from 'firebase';
import storage from './firebase';
import auth from './firebase';
import database from './firebase'
import RNFetchBlob from 'react-native-fetch-blob'

var ImagePicker = require('react-native-image-picker');

// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};



// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export default class App extends Component {
  
 constructor(){
    super()
    this.getImage = this.getImage.bind(this)
    this.state = {
      image_uri: '',
      response:false,
    }
  }

  uploadImage(uri, mime = 'application/octet-stream') {
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'android' ? uri.replace('file://', '') : uri
      let uploadBlob = null

    const users=  firebase.auth().onAuthStateChanged(user => {
      
     
    
      const imageRef = firebase.storage().ref('images').child('user/'+user.uid)

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
  })
  }
  

  getImage(){

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // let source = { uri: response.uri };
        // this.setState({image_uri: response.uri})

        // You can also display the image using data:
        // let image_uri = { uri: 'data:image/jpeg;base64,' + response.data };

      this.uploadImage(response.uri)
        .then(url =>   this.setState({image_uri: url}))
        .then(() => {
          const url = this.state.image_uri;
          alert('heloo'+url)
          firebase.database().ref(`/images/`).push({ url });
        }).catch(error => alert(error))
   

      }
    });

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to our Example using Firebase Storage and Camera!
        </Text>
       
        <Button
          onPress={this.getImage}
          title="Change Image"
          color="#841584"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});