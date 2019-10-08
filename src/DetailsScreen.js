  import React from 'react';
import { StyleSheet, Text,TextInput,Alert ,Picker,Platform, View, YellowBox,TouchableOpacity,ScrollView,Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { Appbar } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Dimensions from 'Dimensions';
import { database } from './firebase';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import firebase from 'firebase';
import storage from './firebase';
import auth from './firebase';
//import database from './firebase'
import RNFetchBlob from 'react-native-fetch-blob'
var ImagePicker = require('react-native-image-picker');

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

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob




const DeviceWidth = Dimensions.get('window').width;

class DetailsScreen extends React.Component {
  
  static navigationOptions = {
    header: {
       visible: false,
    }
  }
 

  constructor(props) {
    super(props);
    this.getImage = this.getImage.bind(this)
    this.state = {
      image_uri: '',
      response:false,
    }
     users=''
    YellowBox.ignoreWarnings([
      'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'
    ]);
    
    this.state = {
      Name:false,
      Branch:false,
      Address:false,
      Description:false,
      Quantity:false,
      Category:false,
         };
    
  }

  uploadImage(uri, mime = 'application/octet-stream') {
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'android' ? uri.replace('file://', '') : uri
      let uploadBlob = null

    const users=  firebase.auth().onAuthStateChanged(user => {
      
     
    
      const imageRef = firebase.storage().ref('images').child('DonationPic/'+user.uid)

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
   User =  firebase.auth().onAuthStateChanged(user => {
     users=user.uid
     
    
  })
  
  writeUserData(title,Quantity,Address,Description,Category){
    database.ref('Donations/').push({
        title,
        Quantity,
        Address,
        Description,
        Category
       
    }).then((data)=>{
        //success callback
        console.log('data ' , data)
     Alert.alert('SuccessFully Donated ')
    }).catch((error)=>{
        //error callback
       
        console.log('error ' , error)
        alert('not send'+error)
    })
}
   
  render() {
    return (
      <ScrollView>
      
      

        <Appbar.Header>

<Appbar.Content
  title="Form"

/>

<Appbar.Action icon="check" onPress={() => this.writeUserData(this.state.Name,this.state.Quantity,this.state.Address,this.state.Description,this.state.Category)} />
</Appbar.Header>
         
<KeyboardAwareScrollView>
<View style={styles.container}>
<TouchableOpacity  onPress={this.getImage}>
  <View style={styles.Images}>
 
  <Image
                  source={require('./book.jpg')} style={{ height:80, width: 130, flex: 1, borderRadius: 90}} ></Image>
               
                      <Icon style={styles.close} name="camera" size={25} /> 
                  
                    
  </View>
  </TouchableOpacity>
  <View style={styles.Note}>
                  <Text style={styles.NoteWord}>*NOTE:Upload the image of Donating Product/item</Text></View>
          <View> 
              <Text style={styles.TextStyles}>Title</Text>
              <TextInput 
              placeholder='Enter the Title of Donation...'
              style={styles.TextInput}  
              onChangeText={(text) => this.setState({ Name:text })}
              value={this.state.Name}
            
              ></TextInput>
            </View>
            <View style={{ justifyContent: 'space-between', width: DeviceWidth * 0.8, marginTop: 10 }} >
            <Text style={styles.TextStyles}>Category</Text>
            <View style={[styles.ViewDropdown, {}]}>
               <Picker
                               
                               
                               onValueChange={(itemValue) =>
                               this.setState({Category: itemValue})}
                               selectedValue={this.state.Category}>

                                    
                  <Picker.Item label="Books" value="Books" />
                <Picker.Item label="Clothes" value="Clothes" />
                <Picker.Item label="Shoes" value="Shoes" />
                <Picker.Item label="Bags" value="Bags" />
                <Picker.Item label="Bed" value="Bed" />
                <Picker.Item label="Utensils" value="Utensils" />
                <Picker.Item label="Other Useful Items" value="Other Useful Items" />
                 </Picker>
            </View>
            
          </View>
  
          <View>
              <Text style={styles.TextStyles}>Quantity</Text>
              <TextInput 
              placeholder='example..2'
              style={styles.TextInput}
              onChangeText={(text) => this.setState({Quantity:text })} 
              value={this.state.Quantity}
              ></TextInput>
            </View>
            
          <View>
              <Text style={styles.TextStyles}>Address</Text>
              <TextInput 
              placeholder='Enter Your Address'
              style={styles.textAddress}
              onChangeText={(text) => this.setState({ Address:text })}
              value={this.state.Address}
              ></TextInput>
            </View>

            <View>
              <Text style={styles.TextStyles}>Description</Text>
              <TextInput 
              placeholder='Write a Description of Product'
              style={styles.textAddress}
              onChangeText={(text) => this.setState({ Description:text })}
              value={this.state.Description}
              ></TextInput>
            </View>
        </View>
      </KeyboardAwareScrollView>
      </ScrollView>

    );
  }
}
var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
    flex: 1,

  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    backgroundColor: '#1e90ff',
    borderColor: '#1e90ff',
    borderWidth: 1,
    width: 200,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 30,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  TextStyles: { fontSize: 17, fontWeight: "500", color: 'black' },
  ViewDropdown: {
    borderWidth: 2, borderColor: 'lightgrey', borderRadius: 50, marginTop: 10, marginBottom: 10,
    height: DeviceWidth * 0.1, justifyContent: 'center', paddingLeft: DeviceWidth * 0.03
  },
  DropdownLatestStyle: {
    borderWidth: 2, borderColor: 'lightgrey', borderRadius: DeviceWidth * 0.1,
    marginTop: DeviceWidth * 0.02, marginBottom: DeviceWidth * 0.05, height: DeviceWidth * 0.1, justifyContent:'center',
    paddingLeft: DeviceWidth * 0.03
  },
  ViewButton: {
    width: DeviceWidth * 0.8, justifyContent: 'center', alignItems: 'center', height: DeviceWidth * 0.1, backgroundColor: '#005a00',
    borderRadius: DeviceWidth * 0.1
  },
  TextButtonStyle: { textAlign: 'center', fontSize: DeviceWidth * 0.04, fontWeight: 'bold', color: 'white' },
  TextInput:{
    backgroundColor:'white',
    borderColor:'lightgrey',
    width:330,
    borderWidth:2,
    borderRadius:50,
   paddingLeft: DeviceWidth * 0.03,
   marginTop: 10, marginBottom: 10,
    height: 45, justifyContent: 'center', 

   

  },
  textAddress:{
    backgroundColor:'white',
    borderColor:'lightgrey',
    width:330,
    borderWidth:2,
    borderRadius:20,
   paddingLeft: DeviceWidth * 0.03,
   marginTop: 10, marginBottom: 10,
    height: 80, justifyContent: 'center', 

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
    backgroundColor: 'rgb(98, 0, 238)',
    opacity:0.8,
    },
  loginText: {
    color: 'white',
  },
  Images:{
    height:120,
  width:130,
 
  
  },
  /*camera_icon:{
     backgroundColor:'green'
  },*/
  close: {
//margin: 5,
marginTop:3,
padding:8,
borderRadius:39,
    position: "absolute",
    textAlign:'center',
    bottom: 0,
    right: 0,
    width: 40,
    height: 38,
    backgroundColor:'rgb(98, 0, 238)',
    color:'white'
  },
  Note:{
    marginTop:10,
    marginBottom:10

  },
  NoteWord:{
     fontSize:10
  }
});
export default DetailsScreen;