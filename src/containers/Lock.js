/**
 * Forgot Password Container
 */

import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    BackHandler,
    TouchableOpacity,
    Image,
    View
} from 'react-native';
import {
    Container,
    Header,
    HeaderLeft,
    HeaderTitle,
    Content,
    Icon,
    Text,
    Loader
} from '@components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';

const { height, width } = Dimensions.get('window');

const url = 'https://wallet.flashcoin.io/index.html';

class Lock extends Component<{}> {

    static navigationOptions = {
        // header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.backHandler.bind(this));
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler.bind(this));
    }

    backHandler(){
        return this.props.navigation.goBack();
        // return false;
    }


    render() {
        return (
            <Container>
                <Content hasHeader={false} style={{backgroundColor:'#191714'}}>
                    <Image style={styles.appLogo}  source={require('@images/app-text-icon-white-vertical.png')}/>
                    <Text style={styles.pinTitle}>Enter PIN</Text>
                    <View style={styles.pinBox}>
                        <Icon style={styles.pinIconFilled} name={'circle'}/>
                        <Icon style={styles.pinIcon} name={'circle-o'}/>
                        <Icon style={styles.pinIcon} name={'circle-o'}/>
                        <Icon style={styles.pinIcon} name={'circle-o'}/>
                        <Icon style={styles.pinIcon} name={'circle-o'}/>
                        <Icon style={styles.pinIcon} name={'circle-o'}/>
                    </View>
                </Content>
                <View style={styles.keypad}>
                    <View style={styles.keypadRow}>
                        <TouchableOpacity style={styles.keypadBtn}>
                            <Text style={styles.keypadBtnText}>1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.keypadBtn}>
                            <Text style={styles.keypadBtnText}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.keypadBtn}>
                            <Text style={styles.keypadBtnText}>3</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.keypadRow}>
                        <TouchableOpacity style={styles.keypadBtn}>
                            <Text style={styles.keypadBtnText}>4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.keypadBtn}>
                            <Text style={styles.keypadBtnText}>5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.keypadBtn}>
                            <Text style={styles.keypadBtnText}>6</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.keypadRow}>
                        <TouchableOpacity style={styles.keypadBtn}>
                            <Text style={styles.keypadBtnText}>7</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.keypadBtn}>
                            <Text style={styles.keypadBtnText}>8</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.keypadBtn}>
                            <Text style={styles.keypadBtnText}>9</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.keypadRow}>
                        <View style={styles.keypadBtnTran} />
                        <TouchableOpacity style={styles.keypadBtn}>
                            <Text style={styles.keypadBtnText}>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.keypadBtnTran}>
                            <Image style={styles.keypadBtnIcon} source={require('@images/delete-gold.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Loader transparent show={this.state.loading} />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    appLogo:{
        width: width/2.5,
        height: width/2.5,
        alignSelf: 'center',
        marginTop: 70
    },
    pinTitle:{
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: 20,
        color: '#fff',
        fontSize: 24,
        fontWeight: '400'
    },
    pinBox:{
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 260
    },
    pinIcon:{
        fontSize: 40,
        color: '#fff',
    },
    pinIconFilled:{
        fontSize: 40,
        color: '#E0AE27',
    },
    keypad:{
        width,
        // height: 190,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        // backgroundColor: '#191714',
        position: 'absolute',
        left: 0,
        bottom: 0,
        paddingTop: 5,
    },
    keypadRow:{
        marginHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    keypadBtn:{
        width: (width-20)/3,
        height: ((width-40)/3)*9/20,
        marginBottom: 5,
        backgroundColor: 'rgba(25, 23, 20, 0.8)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    keypadBtnTran:{
        width: (width-20)/3,
        height: ((width-40)/3)*9/20,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    keypadBtnText:{
        fontSize: ((width-40)/3)*9/25,
        fontWeight: '500',
        color: '#E0AE27'
    },
    keypadBtnIcon:{
        width: ((width-40)/3)*9/25,
        height: ((width-40)/3)*9/25*92/128,
        // fontWeight: '500',
        // color: '#FFDD4D'
    },
});

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Lock);
