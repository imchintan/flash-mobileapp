/**
 * Home Container
 */

import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import {
    Container,
    Header,
    HeaderTitle,
    Content
} from '@components';

const styles = require("@styles/login");

export default class Send extends Component<{}> {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Container>
                <Header>
                    <HeaderTitle>
                        Send
                    </HeaderTitle>
                </Header>
                <Content>
                    <View>
                        <Text>Send</Text>
                    </View>
                </Content>
            </Container>
        );
    }
}
