/**
 * Chat Room Container
 */

import React, {Component} from 'react';
import {
    View,
    TouchableOpacity
} from 'react-native';
import {
    Container,
    Content,
    Header,
    HeaderLeft,
    HeaderRight,
    HeaderTitle,
    Icon,
    Text
} from '@components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '@actions';

class ChatRoom extends Component < {} > {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/htm'):require('@styles/htm'));
        return (
            <Container>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={() => this.props.navigation.goBack()} style={styles.headerBackIcon} name='angle-left'/>
                        </TouchableOpacity>
                    </HeaderLeft>
                    <HeaderTitle>Chat Room</HeaderTitle>
                    <HeaderRight>
                        <TouchableOpacity>
                            <Icon style={styles.headerFAIcon} name='ellipsis-v' />
                        </TouchableOpacity>
                    </HeaderRight>
                </Header>
                <Content bounces={false} style={styles.content}>
                    <Text> To do somthing here </Text>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {
        nightMode: params.nightMode,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
