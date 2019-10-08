import React, { Component } from 'react';
import { Image, StyleSheet,ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Right, Left, Body, View } from 'native-base';
import { Appbar } from 'react-native-paper';
import { f, auth, storage, database } from './firebase';


class profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
   
  }
  componentDidMount (){
    database.ref('Users/').on('value',(snap) =>{
      let items =[];
      snap.forEach((child)=>{
        items.push({
          City_Name:child.val().City,
          Name_value: child.val().Name,
         Email_value:child.val().Email,
         profile_img:child.val().url,
         total_item:child.val().Totaldonation
        });
      });
      itm = items;
      this.setState({ items:items});
      console.log(itm);
    
      console.log('itemstate ' + this.state.items);
      itm.forEach((itms) =>{
        console.log('title *' + itms.Branch);
       
      
      });

    });
  }
  signOutUser = async () => {
    try {
        await firebase.auth().signOut();
        navigate('');
    } catch (e) {
        console.log(e);
    }
}
  render() {
    return (
      <ScrollView>

      <View style={styles.container} >

        
        <Appbar.Header>

          <Appbar.Content
            title="Recent 10 Donators"

          />
          <Appbar.Action icon="search" onPress={this.signOutUser} />
          <Appbar.Action icon="more-vert" onPress={() => this.props.navigation.navigate('Imgupload'
        )} />
        </Appbar.Header>
     
          <View>
       {this.state.items.map((w,i) => {
         
          return <Card style={styles.card} 
          word = {w} definition = {this.state.Branch}>
            
            <Image
                  source={{uri: w.profile_img}} style={{ height: 150, width: 150, borderRadius: 80,marginTop:10,marginLeft:80}} />
                  <CardItem header>
                  <Text style={{color:'Black',textAlign:'left'}}>Name</Text>
                  <Text style={styles.name_style}>{w.Name_value}</Text>
                  </CardItem>
                  <CardItem header>
                  <Text style={{color:'Black',textAlign:'left'}}>City</Text>
                  <Text style={styles.name_style}>{w.City_Name}</Text>
                  </CardItem>
                  <CardItem header>
                  <Text style={{color:'Black',textAlign:'left'}}>Total Donation's</Text>
                  <Text style={styles.name_style}>{w.total_item}</Text>
                  </CardItem>
                  <CardItem header style={styles.carditem}> 
                  <Text style={{color:'Black',textAlign:'left'}}>E-mail</Text>
            <Text style={styles.name_style}>{w.Email_value}</Text>
            </CardItem>
            
              
          </Card> 
       })}
       </View>
      
              <Content>
              <Card style={styles.card}>
            <CardItem>
              <Body>
                  
                <Image
                  source={require('./student.jpg')} style={{ height: 150, width: 150, flex: 1, borderRadius: 80 }} />
                <Text>
                  varshang shrimali
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
            
              </Left>
            </CardItem>
          </Card>
        </Content>
      </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCDCDC'
  },
  card: {
    justifyContent: 'center',
    //alignItems: 'center',
    width: 350,
    marginLeft: 30,
    marginTop: 20,
    
  },
  name: {
    marginLeft: 190,

  },
  Branchs:{
    width:300,
    marginTop:20,
    height:350,
    justifyContent: 'center',
    alignItems: 'center',

  },
  name_style:{
    flex:1,
    textAlign:'right',
    color:'black',
    fontWeight:"bold"
  },
 
});
export default profile;