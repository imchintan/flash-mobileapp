/**
 * Settings Container
 */

import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Platform,
    Image,
    Linking
} from 'react-native';
import {
    Container,
    Content,
    Icon,
    Text,
} from '@components';
import { APP_VERSION } from '@src/config';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';

class About extends Component<{}> {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/about'):
            require('@styles/about'));

        return (
            <Container>
                <Content style={styles.content} hasHeader={false} >
                    <View style={styles.aboutLogoBox}>
                        <TouchableOpacity style={styles.headerBackBtn}>
                            <Icon onPress={()=>this.props.navigation.goBack()}
                                style={styles.headerBackIcon} name='angle-left' />
                        </TouchableOpacity>
                        <Image style={styles.appLogo} source={Platform.OS === 'ios'?
                        require('@images/app-text-icon-white-vertical-ios.png'):
                        require('@images/app-text-icon-white-vertical.png')}/>
                        <Text style={styles.versionText}>Version: {APP_VERSION}</Text>
                        <TouchableOpacity style={styles.emailBox}
                            onPress={()=>Linking.openURL("mailto:?to=support@flashcoin.io")}>
                            <Icon style={styles.envelopeIcon} name="envelope"/>
                            <Text style={styles.emailText}>support@flashcoin.io</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.aboutInfoBox}>
                        <Text style={styles.aboutInfoText}>
                            {"FLASH is not money, it's a much bigger idea than money. "+
                            "It's a community supported blockchain designed for "+
                            "small and fast transactions. People can send and "+
                            "receive FLASH and use it for just about anything, "+
                            "limited only by their imaginations. There are only "+
                            "900M coins and they were all distributed to the community."}
                        </Text>
                        <Text style={styles.aboutInfoText}>
                            {"FLASH is based on Litecoin, but even lighter. It's "+
                            "very efficient and because the mining is minimal "+
                            "and done by volunteers, transaction fees are very "+
                            "low. Our goal is to create a safe and secure environment "+
                            "for community members to participate in FLASH and "+
                            "facilitate communications and commerce without "+
                            "friction. Security is provided through our unique "+
                            "distributed node based governance model that we "+
                            "call GovNodes."}
                        </Text>
                        <Text style={styles.aboutInfoTitleText}>The FLASH Advantage :</Text>
                        <View style={styles.aboutInfoAdv}>
                            <Icon style={styles.aboutInfoAdvIcon} name={'circle'}/>
                            <Text style={styles.aboutInfoAdvText}>
                                Public blockchain operated for the public good.
                            </Text>
                        </View>
                        <View style={styles.aboutInfoAdv}>
                            <Icon style={styles.aboutInfoAdvIcon} name={'circle'}/>
                            <Text style={styles.aboutInfoAdvText}>
                                Zero Inflation. All coins were issued to the community.
                                No new coins will ever be issued.
                            </Text>
                        </View>
                        <View style={styles.aboutInfoAdv}>
                            <Icon style={styles.aboutInfoAdvIcon} name={'circle'}/>
                            <Text style={styles.aboutInfoAdvText}>
                                If you want some FLASH you will need to trade with community members.
                            </Text>
                        </View>
                        <View style={styles.aboutInfoAdv}>
                            <Icon style={styles.aboutInfoAdvIcon} name={'circle'}/>
                            <Text style={styles.aboutInfoAdvText}>
                                {"No Unfair Advantage, everyone donated something "+
                                "for their FLASH, except for less than 0.1% of the "+
                                "FLASH that was given to people who tested FLASH. "+
                                "There is no developer slush fund, please don't "+
                                "ask for free coins."}
                            </Text>
                        </View>
                        <View style={styles.aboutInfoAdv}>
                            <Icon style={styles.aboutInfoAdvIcon} name={'circle'}/>
                            <Text style={styles.aboutInfoAdvText}>
                                Optimized and tested for efficiency and high volume.
                            </Text>
                        </View>
                        <View style={styles.aboutInfoAdv}>
                            <Icon style={styles.aboutInfoAdvIcon} name={'circle'}/>
                            <Text style={styles.aboutInfoAdvText}>
                                Decentralized governance (GovNodes)
                            </Text>
                        </View>
                        <View style={styles.aboutInfoAdv}>
                            <Icon style={styles.aboutInfoAdvIcon} name={'circle'}/>
                            <Text style={styles.aboutInfoAdvText}>
                                Community supported. Anyone can develop using
                                the FLASH Blockchain. Build a project, collect
                                your fee for using your app directly into your
                                own wallet. Projects can be developed by anyone.
                                Developers solicit donations from the community.
                            </Text>
                        </View>
                        <View style={styles.aboutInfoAdv}>
                            <Icon style={styles.aboutInfoAdvIcon} name={'circle'}/>
                            <Text style={styles.aboutInfoAdvText}>
                                {"Eco-Friendly. We've benchmarked 25k "+
                                "transactions per second using 80 watts of power."}
                            </Text>
                        </View>
                    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
