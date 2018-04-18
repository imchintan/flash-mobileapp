/**
 * Security Question Container
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

export default class SecurityQuestion extends Component<{}> {

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
                    <Text>Security Question</Text>
                </View>
            </Content>
        );
    }
}
