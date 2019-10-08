import React, { Component } from 'react';
import { Platform, Dimensions } from 'react-native';
import {createDrawerNavigator,createAppContainer} from 'react-navigation';

import homescreen  from '../src/homescreen';
import DetailsScreen from '../src/DetailsScreen';

const WIDTH = Dimensions.get('window').width;


const DrawerNavigator = createDrawerNavigator({
    Home:{
        screen:homescreen
    },
    Detail:{
         screen:DetailsScreen
    }

    
})

export default createAppContainer(DrawerNavigator);
