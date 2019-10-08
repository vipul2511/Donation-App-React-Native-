import * as React from 'react';
import { Appbar } from 'react-native-paper';
import {View,StyleSheet,UIManager,findNodeHandle,Image,ScrollView} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button,  Right, Left, Body,} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';  
//import { MenuProvider } from 'react-native-popup-menu';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu'; 
//import { ScrollView } from 'react-native-gesture-handler';
 class Headertile extends React.Component {
        
  
  render() {
    return (
        
        <View style={styles.container} >
     
      <View>
    <Menu>
    <Appbar.Header>
        <Appbar.BackAction
          onPress={this._goBack}
        />
        <Appbar.Content
          title="Profile"
        />
         
      </Appbar.Header>
     <MenuTrigger >
             <Icon name="home" />
        </MenuTrigger>
      <MenuOptions>
        <MenuOption onSelect={() => alert(`Save`)} text='Save' />
        <MenuOption onSelect={() => alert(`Delete`)} >
          <Text style={{color: 'red'}}>Delete</Text>
        </MenuOption>
        <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
      </MenuOptions>
    </Menu>
  </View>
      <View>
      <Image
                  source={require('./vs.jpg')} style={styles.setProfile} /></View>
     
   <Card style={styles.cardBody}>
   
       <Header style={styles.headerCard}>
           </Header>
            <CardItem header>
              <Text style={{color:'Black'}}>Name</Text>
              <Text style={styles.Name} >Varshang shrimali</Text>
            </CardItem>
            <CardItem header>
              <Text style={{color:'Black'}}>Total Donation's</Text>
              <Text style={styles.Name} >122</Text>
           
            </CardItem>
            <CardItem header>
              <Text style={{color:'Black'}}>Address</Text>
              <Text style={styles.Address} >Sai vilaa shrimali colony nr. dharamraj ki temple,Badgaon,Udaipur</Text>
           
            </CardItem>
            <CardItem header>
              <Text style={{color:'Black'}}>Phone No.</Text>
              <Text style={styles.Name} >9079947710</Text>
           
            </CardItem>
            <CardItem header>
              <Text style={{color:'Black'}}>E-mail</Text>
              <Text style={styles.Name} >vshrimali@gmail.com</Text>
           
            </CardItem>
            <CardItem header>
              <Text style={{color:'Black'}}>City</Text>
              <Text style={styles.Name} >Udaipur</Text>
           
            </CardItem>
           

   </Card>

      </View>
    
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#DCDCDC'
    },
    cardBody:{
        flex:1,
        marginTop:170,
        marginLeft:20,
        marginRight:20,
        borderRadius:10,
        bottom:0,
        width:370,
        height:460,
       
    },
    headerCard:{
        backgroundColor:'#f5f5f5',
        borderTopEndRadius:10,
        borderTopStartRadius:10,
       

    },
   Name:{
       flex:1,
       textAlign:'right',
      /* justifyContent: "center",
       borderBottomColor: '#5c5e5e',
       borderBottomWidth: 0.25,*/
      },
      Address:{
          flex:1,
          textAlign:'right',
          paddingLeft:100
      },
      setProfile:{
          flex:1,
        width:150,height:150, borderRadius: 80,
        position: "absolute",
        top: 20,
       right : 150,
       
        
        
      }
   
  })
export default Headertile;