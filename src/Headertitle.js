import * as React from 'react';
import {View} from 'react-native';
import  {Appbar}  from 'react-native-paper';
import profile from './profile';

 class Headertile extends React.Component {
        
  _goBack = () => console.log('Went back');

  _onSearch = () => console.log('Searching');

  _onMore = () => console.log('Shown more');

  render() {
    return (
      <View>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={this._goBack}
        />
        <Appbar.Content
          title="Title"
          subtitle="Subtitle"
        />
        <Appbar.Action icon="search" onPress={this._onSearch} />
        <Appbar.Action icon="more-vert" onPress={this._onMore} />
      </Appbar.Header>
     
      </View>
    );
  }
}
export default Headertile;