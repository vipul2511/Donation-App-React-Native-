import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {Icon} from 'react-native-ionicons'
export default class MenuIcon extends React.Component{
    render(){
        return(
           
            <Icon name="md-menu"
            color="#000000"
            size={32}
            style={style.menuIcon}
            onPress={() =>{}}>
            </Icon>
        )
    }
}
const style = StyleSheet.create({
    menuIcon:{
        zIndex:9,
        position:'absolute',
        top:40,
        left:20,
    }
})
