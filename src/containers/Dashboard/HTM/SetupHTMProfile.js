/**
 * Setup HTM Profile Container
 */

import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    ScrollView,
    TextInput
} from 'react-native';
import {
    Container,
    Content,
    Header,
    HeaderLeft,
    HeaderTitle,
    Icon,
    Modal,
    Text,
    Toast,
    Loader,
    Button
} from '@components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '@actions';

import * as constants from '@src/constants'
import * as Validation from '@lib/validation';

class SetupHTMProfile extends Component < {} > {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state = {
            display_name: this.props.profile.display_name,
            email: this.props.profile.email,
        };
    }

    setupProfile(){
        if(!this.state.display_name.trim()){
            return Toast.errorTop("Display name is required!");
        }
        let display_name = this.state.display_name.trim();

        let res = Validation.email(this.state.email);
        if(!res.success){
            return Toast.errorTop(res.message);
        }
        let email = this.state.email.trim();

        if(!this.state.country){
            return Toast.errorTop("Please select country!");
        }
        let country = this.state.country;

        res = Validation.percentage(this.state.want_to_buy);
        if(!res.success){
            return Toast.errorTop("Please enter valid percentage for buy!");
        }
        let want_to_buy = res.percentage;

        res = Validation.percentage(this.state.want_to_sell);
        if(!res.success){
            return Toast.errorTop("Please enter valid percentage for sell!");
        }
        let want_to_sell = res.percentage;

        this.props.setupHTMProfile(display_name, email, country,
            want_to_buy, want_to_sell);
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
                    <HeaderTitle>Setup HTM Profile</HeaderTitle>
                </Header>
                <Content bounces={false} style={styles.content}>
                    <View style={styles.htmProfileContent}>
                        <Text style={[styles.label,{marginTop:0}]}>Basic Info</Text>
                        <View style={[styles.hr,{marginBottom:15}]}/>
                        <View style={styles.htmProfile}>
                            <Text style={styles.htmProfileLabel}>Diplay Name</Text>
                            <View style={styles.htmProfileInputBox}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    style={styles.htmProfileInput}
                                    placeholder={'Enter display name'}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    value={this.state.display_name}
                                    onChangeText={(display_name)=>this.setState({display_name})}
                                />
                            </View>
                        </View>
                        <View style={styles.htmProfile}>
                            <Text style={styles.htmProfileLabel}>Email</Text>
                            <View style={styles.htmProfileInputBox}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    style={styles.htmProfileInput}
                                    placeholder={'Enter email address'}
                                    keyboardType={'email-address'}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    value={this.state.email}
                                    onChangeText={(email)=>this.setState({email})}
                                />
                            </View>
                        </View>
                        <View style={styles.htmProfile}>
                            <Text style={styles.htmProfileLabel}>Country</Text>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={()=>this.setState({selectCountry:true})}
                                style={styles.htmProfileInputBox}>
                                <TextInput
                                    editable={false}
                                    underlineColorAndroid='transparent'
                                    style={styles.htmProfileInput}
                                    placeholder={'Select Country'}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    value={this.state.country || ''}
                                />
                                <Icon style={{
                                    position: 'absolute',
                                    right: 15,
                                    fontSize: 30,
                                    color: '#787878',
                                }} name={'angle-down'} />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.label,{marginTop:10}]}>Setting</Text>
                        <View style={[styles.hr,{marginBottom:15}]}/>
                        <View style={styles.htmProfile}>
                            <Text style={styles.htmProfileLabel}>Want to Buy (%)</Text>
                            <View style={styles.htmProfileInputBox}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    style={styles.htmProfileInput}
                                    placeholder={'Enter percentage'}
                                    keyboardType={'numeric'}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    value={this.state.want_to_buy}
                                    onChangeText={(want_to_buy)=>this.setState({want_to_buy})}
                                />
                            </View>
                            <Text style={styles.htmProfileNote}>Want to buy at % less than current spot price</Text>
                        </View>
                        <View style={styles.htmProfile}>
                            <Text style={styles.htmProfileLabel}>Want to Sell (%)</Text>
                            <View style={styles.htmProfileInputBox}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    style={styles.htmProfileInput}
                                    placeholder={'Enter percentage'}
                                    keyboardType={'numeric'}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    value={this.state.want_to_sell}
                                    onChangeText={(want_to_sell)=>this.setState({want_to_sell})}
                                />
                            </View>
                            <Text style={styles.htmProfileNote}>Want to sell at % more than current spot price</Text>
                        </View>
                        <Button
                            style={{
                                marginVertical: 20,
                            }}
                            value={'Setup Profile'}
                            onPress={this.setupProfile.bind(this)} />
                    </View>
                    <Loader show={this.props.loading} />
                </Content>
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={!!this.state.selectCountry}
                    onRequestClose={()=>this.setState({selectCountry:false})}>
                    <View style={styles.overlayStyle}>
                        <View style={[styles.optionContainer,{height:'80%'}]}>
                            <ScrollView keyboardShouldPersistTaps="always">
                                <View style={{ paddingHorizontal: 10 }}>
                                    {constants.COUNTRY.map((country,index) =>
                                        <TouchableOpacity key={'_que_'+country+'_'+index}
                                            style={styles.optionStyle}
                                            onPress={()=>{
                                                this.setState({selectCountry:false, country});
                                            }}>
                                            <Text style={{fontSize: 16}}>
                                                {country}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </ScrollView>
                        </View>
                        <View style={styles.cancelContainer}>
                            <TouchableOpacity onPress={()=>this.setState({selectCountry:false})}>
                                <View style={styles.cancelStyle}>
                                    <Text style={styles.canceTextStyle}>
                                        Cancel
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {
        nightMode: params.nightMode,
        profile: params.profile,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SetupHTMProfile);
