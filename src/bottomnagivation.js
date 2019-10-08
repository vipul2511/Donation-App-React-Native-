import React from 'react';
import { createBottomTabNavigator,
         } from "react-navigation"; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';  
//import {MultiBarToggle,MultiBar} from 'react-native-multibar'
import profile from './profile';
import loginScreen from './loginscreen';
import DetailsScreen from './DetailsScreen';
import Headertitle from './userProfile';
import Registration from './registrationForm';

export default SignedIn = createBottomTabNavigator({

    
  
  Home: { screen: profile,
           navigationOptions: {
            
            tabBarIcon: ({tintColor}) => (
                <Icon
                    name="home"
                    color={tintColor}
                    size={24}
                />
               
            )
        }
    },
  Search:{ screen: DetailsScreen,
 
           navigationOptions:{  
            
         
               
            tabBarIcon: ({tintColor}) => (
                <Icon
                    name="clipboard-text"
                    color={tintColor}
                    size={24}
                />
            )
           }
  }, 
  AddPost: { screen: Headertitle ,
            navigationOptions: {
                tabBarIcon: ({tintColor}) =>(
                    <Icon
                        name="account"
                        color={tintColor}
                        size={24}
                    />
                )
            }
  },
  
 /* Notifications: { screen: SignUp,
              navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <Icon
                        name="user"
                        color={tintColor}
                        size={24}
                    />
                )         
                }
    },
 /* Profile: { screen : ProfileStack,
                navigationOptions:{
                    tabBarIcon: ({tintColor}) => (
                        <Icon
                            name="account"
                            color={tintColor}
                            size={24}
                        />
                    )
                }
  },*/

}, {
    
    tabBarOptions: {
        showLabel: false, // hide labels
        activeTintColor: '#F8F8F8', // active icon color
        inactiveTintColor: 'rgb(175, 126, 247)',  // inactive icon color
        style: {
            backgroundColor: 'rgb(98, 0, 238)' // TabBar background
        },
    }
},

);
