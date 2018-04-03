/**
 * Fountain Container
 */

import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import {
    Content
} from '@components';

const styles = require("@styles/myAccount");

export default class Fountain extends Component<{}> {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Content hasHeader={false}>
                <View>
                    <Text>Fountain</Text>
                </View>
            </Content>
        );
    }
}
