import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableHighlight, View, Alert, Image, Button } from 'react-native';

class loginScreen extends React.Component {

    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Details Screen</Text>
          <Button
            title="Go to Details... again"
            onPress={() => this.props.navigation.navigate('Details')}
          />
        </View>
      );
    }
  }
export default loginScreen;