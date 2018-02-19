/**
 * App Navigation
 */

import React, { Component } from 'react';
import {
  StatusBar,
  View,
} from 'react-native';

import AppNavigation from './routes';

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
            myVisitorList:this.state.myVisitorList,
            csvPath:this.state.csvPath,
        }
    }


  render() {
    return (
        <View style={{flex:1}}>
            <StatusBar
                backgroundColor="#b9862f"
                barStyle="light-content"
              />
            <AppNavigation screenProps={this._getProps()}  />
        </View>
    );
  }
}
