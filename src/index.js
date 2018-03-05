/**
 * App Navigation
 */

import React, { Component } from 'react';
import {
  StatusBar,
  View,
} from 'react-native';

import AppNavigation from './AppNavigation';

console.disableYellowBox = true;

export default class App extends Component<{}> {
    constructor(props) {
      super(props);
      this.state={}
      _fn={
          setState:(obj)=>this.setState(obj),
      }
  }

  _getProps=()=>{
        return {
        }
    }


  render() {
    return (
        <View style={{flex:1}}>
            <StatusBar
                backgroundColor="#009DE4"
                barStyle="light-content"
              />
            <AppNavigation screenProps={this._getProps()}  />
        </View>
    );
  }
}
