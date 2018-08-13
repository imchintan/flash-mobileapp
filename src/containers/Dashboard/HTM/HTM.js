/**
 * HTM Home Container
 */

import React, {Component} from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import {
    Container,
    Content,
    Header,
    HeaderLeft,
    HeaderRight,
    HeaderTitle,
    Icon,
    Button,
    Toast,
    Text
} from '@components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '@actions';

import { PROFILE_URL } from '@src/config';
import * as constants from '@src/constants';
import * as utils from '@lib/utils';

const { width } = Dimensions.get('window');

class HTM extends Component < {} > {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/htm'):require('@styles/htm'));
        return (
            <Container>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={()=>this.props.screenProps.rootNavigation.goBack()}
                                style={styles.headerBackIcon} name='angle-left' />
                        </TouchableOpacity>
                    </HeaderLeft>
                    <HeaderTitle>HTM</HeaderTitle>
                    <HeaderRight>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('ChatHistory')}>
                            <Icon style={[styles.headerFAIcon,{
                                    fontSize:24,
                                    paddingHorizontal: 12
                                }]}
                                name='send'/>
                            <Text style={{
                                position: 'absolute',
                                fontFamily: 'futura-medium',
                                backgroundColor: '#E0AE27',
                                color: '#191714',
                                borderRadius: 10,
                                height: 20,
                                paddingVertical: 2,
                                width: 20,
                                textAlign: 'center',
                                fontSize: 13,
                                top: 0,
                                right: 0
                            }}>19</Text>
                        </TouchableOpacity>
                    </HeaderRight>
                </Header>
                <Content bounces={false} style={styles.content}>
                    <View style={{
                        width: '100%',
                        backgroundColor: '#191714'
                    }}>
                        <Image
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: 40,
                                alignSelf: 'center',
                                marginTop: 30
                            }}
                            source={this.props.profile_pic_url?
                                {uri:PROFILE_URL+this.props.profile_pic_url}:
                                utils.getCurrencyIcon(constants.CURRENCY_TYPE.FLASH)} />
                        <View style={{
                            marginTop: 20,
                            marginBottom: 10,
                            alignSelf: 'center',
                            flexDirection: 'row',
                        }}>
                            <Text style={{
                                alignSelf: 'center',
                                color: '#FFFFFF',
                                fontSize: 20,
                                fontWeight: '500'
                            }}>{this.props.htmProfile.display_name ||
                                this.props.profile.display_name}</Text>
                            <TouchableOpacity onPress={()=>this.props
                                .navigation.navigate('EditHTMProfile')}>
                                <Icon style={{
                                    bottom: -5,
                                    paddingLeft: 10,
                                    fontSize: 22,
                                    color: '#c2c2c2'
                                }} name={'edit'}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            marginBottom: 10,
                            alignItems: 'center',
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                marginBottom: 5,
                            }}>
                                <Icon style={{
                                    top: 2,
                                    paddingRight: 5,
                                    fontSize: 16,
                                    color: '#c2c2c2'
                                }} name={'envelope'}/>
                                <Text style={{
                                    fontSize: 18,
                                    color: '#c2c2c2'
                                }}>{this.props.htmProfile.email ||
                                    this.props.profile.email}</Text>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                marginBottom: 5,
                            }}>
                                <Icon style={{
                                    paddingRight: 5,
                                    fontSize: 20,
                                    color: '#c2c2c2'
                                }} name={'map-marker'}/>
                                <Text style={{
                                    fontSize: 18,
                                    color: '#c2c2c2'
                                }}>{this.props.htmProfile.country ||
                                    ''}</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={{
                        fontSize: 16,
                        textAlign: 'justify',
                        color: '#4A4A4A',
                        margin: 30,
                    }}>
                        {"Lorem Ipsum is simply dummy text of the printing and "+
                            "typesetting industry. Lorem Ipsum has been the industry's "+
                            "standard dummy text ever, when an unknown "+
                            "printer took a galley of type it to make "+
                            "a type specimen book."}
                    </Text>
                    <Button
                        style={[{
                            marginBottom: 20,
                        },!this.props.htmProfile.enable && {
                            backgroundColor: '#C2C2C2',
                        }]}
                        value={'Near by HTM Seller'}
                        onPress={()=>{
                            if(!!this.props.htmProfile.enable)
                                this.props.navigation.navigate('HTMListingMap',{type:'seller'})
                            else
                                return Toast.showTop("Please enable your HTM profile!");
                        }} />
                    <Button
                        value={'Near by HTM Buyer'}
                        style={[!this.props.htmProfile.enable && {
                            backgroundColor: '#C2C2C2',
                        }]}
                        onPress={()=>{
                            if(!!this.props.htmProfile.enable)
                                this.props.navigation.navigate('HTMListingMap',{type:'buyer'})
                            else
                                return Toast.showTop("Please enable your HTM profile!");
                        }} />
                </Content>
                {!this.props.htmProfile.display_name?
                    <View style={{
                        position: 'absolute',
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#000D',
                        top: 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: '#E2E2E2',
                            textAlign: 'center',
                            marginHorizontal: 30,
                            marginBottom: 30,
                        }}>
                            {"Lorem Ipsum has been the industry's standard "+
                            "dummy text ever since the 1500s"}
                        </Text>
                        <Button
                            value={'Setup HTM Profile'}
                            onPress={()=>this.props.navigation.navigate('SetupHTMProfile')} />
                    </View>:null
                }
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {
        nightMode: params.nightMode,
        profile: params.profile,
        htmProfile: params.htmProfile || {},
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HTM);
