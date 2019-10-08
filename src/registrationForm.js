import React from 'react';
import { StyleSheet, Platform,Text,TextInput, Picker, YellowBox,View,TouchableOpacity,ScrollView,Image} from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { Appbar, Button } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import RNFetchBlob from 'react-native-fetch-blob'
import { database } from './firebase';
import firebase from 'firebase';
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

const DeviceWidth = Dimensions.get('window').width;
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
export default class Registration  extends React.Component{
  static navigationOptions = {
    header:null   
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
        this.state={
             Name:false,
             Email:false,
             Contact:false,
            City:false,
          
        }
    }
    uploadImage(uri, mime = 'application/octet-stream') {
      return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS === 'android' ? uri.replace('file://', '') : uri
        let uploadBlob = null
  
      const users=  firebase.auth().onAuthStateChanged(user => {
        
       
      
        const imageRef = firebase.storage().ref('images').child('userPic/'+user.uid)
  
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
            firebase.database().ref(`User/`).push({ url });
          }).catch(error => alert(error))
     
  
        }
      });
  
    }
    UsersData(Name,Email,Contact,City,url){
      database.ref('Users/').push({
          Name,
          Email,
          Contact,
          City,
          url:'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjRwqSLk5fkAhUCfSsKHXj7AQsQjRx6BAgBEAQ&url=https%3A%2F%2Fpngtree.com%2Ffree-icon%2Fuser-avatar_35720&psig=AOvVaw0I6xWd9u9YFOjH_K3wbY02&ust=1566586344548154'
         
      }).then((data)=>{
          //success callback
          console.log('data ' , data)
        alert('success')
      }).catch((error)=>{
          //error callback
         
          console.log('error ' , error)
          alert('not send'+error)
      })
  }
  validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(text) === false)
    {
    console.log("Email is Not Correct");
    
    this.setState({email:text})
    alert("This E-mail already Exists")
    return false;
    
      }
    else {
      this.setState({email:text})
      alert("correct")
      console.log("Email is Correct");
    }
    }
    render(){
        return(
          <ScrollView>
            <View style={styles.contanier}>
                <Appbar.Header>
        <Appbar.BackAction
          onPress={this._goBack}
        />
        <Appbar.Content
          title="Profile Form"
        />
        <Appbar.Action icon="skip-next"></Appbar.Action>        
      </Appbar.Header>
             
              <TouchableOpacity  onPress={this.getImage}>
  <View style={styles.Images}>
 
  <Image
                  source={require('./student.jpg')} style={{ height:80, width: 130, flex: 1, borderRadius: 90}} ></Image>
               
                      <Icon style={styles.close} name="camera" size={25} /> 
                    
  </View>
  </TouchableOpacity>
  <View style={styles.Note}>
                  <Text style={styles.NoteWord}>*Optional:If you want to Show for Profile to other Users</Text></View>
            <View style={styles.regsform}>
                
                <TextInput style={styles.textinput} placeholder="Your Name"  underlineColorAndroid={'transparent'}
                onChangeText={(text) => this.setState({ Name:text })}
                value={this.state.Name}
                />

                <TextInput style={styles.textinput} placeholder="Your email" underlineColorAndroid={'transparent'}
                      onChangeText={(text) => this.setState({Email:text})}
                value={this.state.Email}
                /> 
                <TextInput style={styles.textinput} placeholder="Your Contact no." underlineColorAndroid={'transparent'}
                
                onChangeText={(text) => this.setState({ Contact:text })}
              value={this.state.Contact}
                /> 
                
                
           
          
    
            <View style={[styles.ViewDropdown, {}]} >
               <Picker
                               
                               underlineColorAndroid={'transparent'}
                               onValueChange={(itemValue) =>
                               this.setState({City: itemValue})}
                               selectedValue={this.state.City}>

                                    
                  <Picker.Item label="Select City" value="java" />
                <Picker.Item label="Udaipur" value="Udaipur" />
                <Picker.Item label="Bikanar" value="Bikanar" />
                <Picker.Item label="Ajmer" value="Ajmer" />
                <Picker.Item label="Jaipur" value="Jaipur" />
                 </Picker>
            </View>
            </View>
     <View style={styles.button}>
     <LinearGradient
    colors={[ '#4C64FF', '#6536FF', '#8000FF']}
    start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
    style={{ height: 48, width: 200, alignItems: 'center', justifyContent: 'center', width: 200}}
>
    <TouchableOpacity style={styles.buttonContainer} onPress={() => this.UsersData(this.state.Name,this.state.Email,this.state.Contact,this.state.City)}>
        <Text style={styles.buttonText}>
          Submit
        </Text>
    </TouchableOpacity>
</LinearGradient>
              </View>
  
          </View>
          </ScrollView>
           
        );
    }
}
const styles=StyleSheet.create({
    contanier:{
     // flex:1,
     
      backgroundColor:'#fff',
     
    },
    regsform:{
        alignSelf:'stretch',
        color:'#fff',
        paddingLeft:60,
        paddingRight:6,
        justifyContent:'center',
    },
  
    textinput:{
        alignSelf:'stretch',
        height:40,
        marginBottom:38,
        borderBottomColor:'rgb(98, 0, 238)',
        borderBottomWidth:1,
    },
    TextStyles: { fontSize: 17, color: 'black' },
  ViewDropdown: {
    borderRadius: 50, marginBottom: 10,width:350,
    height: DeviceWidth * 0.1, justifyContent: 'center', paddingLeft: DeviceWidth * 0.03,  borderBottomColor:'rgb(98, 0, 238)',
    borderBottomWidth:1
  },
  Images:{
    height:120,
  width:130,
 marginBottom:40,
marginLeft:145,
marginTop:35
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
    color:'white',
    marginTop:40
  },
  buttonContainer: {
    width: 200,
    alignItems: 'center',
   
},
button:{
  marginTop:30,
  marginLeft:100

},

buttonText: {
  textAlign: 'center',
  color: '#fff',
  padding: 15,
  marginLeft: 1,
  marginRight: 1,
  width: 198
  
},
Note:{
   marginLeft:60,
   marginBottom:20
},
NoteWord:{
   fontSize:10
}
})