/**
 * Home Container
 */

import React, { Component } from 'react';
import {
    View,
    Image,
    ImageBackground,
    Text,

} from 'react-native';
import {
    Container,
    Content,
    Header,
    HeaderTitle,
    Icon
} from '@components';

const styles = require("@styles/home");

export default class Home extends Component<{}> {

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
                        FLASH
                    </HeaderTitle>
                </Header>
                <Content bounces={false}>
                    <ImageBackground style={{width:'100%', height: 400, alignItems: 'center'}} source={require('@images/bg-black.png')}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginVertical: 30,
                        }}>
                            <Text style={{
                                color:'#FFFFFF',
                                fontSize: 24,
                                fontWeight: '600',
                                paddingRight: 10,
                            }}>Bal : 1032.00000000</Text>
                            <Image style={{width:25, height: 25}}source={require('@images/app-icon.png')}/>
                        </View>
                        <View style={{
                            borderBottomWidth: 2,
                            borderBottomColor: '#ffdf26',
                            paddingBottom: 2,
                            marginBottom: 20,
                        }}>
                            <Text style={{
                                color:'#FFFFFF',
                                fontSize: 17,
                                fontWeight: '600',
                            }}>Key Performance Indicators</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: 300
                        }}>
                            <View style={{
                                width: 135,
                                alignItems: 'center'}}>
                                <View style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#AFAFAF',
                                    paddingBottom: 2,
                                    marginBottom: 3,
                                    alignItems: 'center',
                                    width: '100%'
                                }}>
                                    <Text style={{
                                        color:'#CFCFCF',
                                        fontWeight:'600',
                                        fontSize: 13,
                                        borderBottomWidth: 1,
                                        borderBottomColor: '#AFAFAF',
                                    }}>475024</Text>
                                </View>
                                <Text style={{
                                    color:'#AFAFAF',
                                    fontSize: 11,
                                }}>Addresses with Balance</Text>
                            </View>
                            <View style={{
                                width: 135,
                                alignItems: 'center'}}>
                                <View style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#AFAFAF',
                                    paddingBottom: 2,
                                    marginBottom: 3,
                                    alignItems: 'center',
                                    width: '100%'
                                }}>
                                    <Text style={{
                                        color:'#CFCFCF',
                                        fontWeight:'600',
                                        fontSize: 13,
                                        borderBottomWidth: 1,
                                        borderBottomColor: '#AFAFAF',
                                    }}>75433</Text>
                                </View>
                                <Text style={{
                                    color:'#AFAFAF',
                                    fontSize: 11,
                                }}>Total Web-wallet Signups</Text>
                            </View>
                        </View>
                        <Text style={{
                            marginTop: 25,
                            marginBottom: 15,
                            color:'#FFFFFF',
                            fontSize: 15,
                            fontWeight: '600',
                        }}>Transactions 24h</Text>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: 300
                        }}>
                            <View style={{
                                width: 90,
                                alignItems: 'center'}}>
                                <View style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#AFAFAF',
                                    paddingBottom: 2,
                                    marginBottom: 3,
                                    alignItems: 'center',
                                    width: '100%'
                                }}>
                                    <Text style={{
                                        color:'#CFCFCF',
                                        fontWeight:'600',
                                        fontSize: 13,
                                        borderBottomWidth: 1,
                                        borderBottomColor: '#AFAFAF',
                                    }}>813429</Text>
                                </View>
                                <Text style={{
                                    color:'#AFAFAF',
                                    fontSize: 11,
                                }}>Total Txs</Text>
                            </View>
                            <View style={{
                                width: 90,
                                alignItems: 'center'}}>
                                <View style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#AFAFAF',
                                    paddingBottom: 2,
                                    marginBottom: 3,
                                    alignItems: 'center',
                                    width: '100%'
                                }}>
                                    <Text style={{
                                        color:'#CFCFCF',
                                        fontWeight:'600',
                                        fontSize: 13,
                                        borderBottomWidth: 1,
                                        borderBottomColor: '#AFAFAF',
                                    }}>1254</Text>
                                </View>
                                <Text style={{
                                    color:'#AFAFAF',
                                    fontSize: 11,
                                }}>Total Txs 24h</Text>
                            </View>
                            <View style={{
                                width: 90,
                                alignItems: 'center'}}>
                                <View style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#AFAFAF',
                                    paddingBottom: 2,
                                    marginBottom: 3,
                                    alignItems: 'center',
                                    width: '100%'
                                }}>
                                    <Text style={{
                                        color:'#CFCFCF',
                                        fontWeight:'600',
                                        fontSize: 13,
                                        borderBottomWidth: 1,
                                        borderBottomColor: '#AFAFAF',
                                    }}>2.20 sec</Text>
                                </View>
                                <Text style={{
                                    color:'#AFAFAF',
                                    fontSize: 11,
                                }}>Ave Txn Time</Text>
                            </View>
                        </View>
                        <Text style={{
                            marginTop: 25,
                            marginBottom: 15,
                            color:'#FFFFFF',
                            fontSize: 15,
                            fontWeight: '600',
                        }}>Circulating Supply: 900 Million</Text>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: 300
                        }}>
                            <View style={{
                                width: 70,
                                alignItems: 'center'}}>
                                <View style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#AFAFAF',
                                    paddingBottom: 2,
                                    marginBottom: 3,
                                    alignItems: 'center',
                                    width: '100%'
                                }}>
                                    <Text style={{
                                        color:'#CFCFCF',
                                        fontWeight:'600',
                                        fontSize: 13,
                                        borderBottomWidth: 1,
                                        borderBottomColor: '#AFAFAF',
                                    }}>381360</Text>
                                </View>
                                <Text style={{
                                    color:'#AFAFAF',
                                    fontSize: 11,
                                }}>Total Blocks</Text>
                            </View>
                            <View style={{
                                width: 40,
                                alignItems: 'center'}}>
                                <View style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#AFAFAF',
                                    paddingBottom: 2,
                                    marginBottom: 3,
                                    alignItems: 'center',
                                    width: '100%'
                                }}>
                                    <Text style={{
                                        color:'#CFCFCF',
                                        fontWeight:'600',
                                        fontSize: 13,
                                        borderBottomWidth: 1,
                                        borderBottomColor: '#AFAFAF',
                                    }}>276</Text>
                                </View>
                                <Text style={{
                                    color:'#AFAFAF',
                                    fontSize: 11,
                                }}>Rank</Text>
                            </View>
                            <View style={{
                                width: 160,
                                alignItems: 'center'}}>
                                <View style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#AFAFAF',
                                    paddingBottom: 2,
                                    marginBottom: 3,
                                    alignItems: 'center',
                                    width: '100%'
                                }}>
                                    <Text style={{
                                        color:'#CFCFCF',
                                        fontWeight:'600',
                                        fontSize: 13,
                                        borderBottomWidth: 1,
                                        borderBottomColor: '#AFAFAF',
                                    }}>365 sat [~0.0394 usd]</Text>
                                </View>
                                <Text style={{
                                    color:'#AFAFAF',
                                    fontSize: 11,
                                }}>Market Price <Text style={{color: '#f00'}}>(-0.7%)</Text></Text>
                            </View>
                        </View>
                    </ImageBackground>
                    <View>
                    </View>
                </Content>
            </Container>
        );
    }
}
