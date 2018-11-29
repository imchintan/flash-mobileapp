/**
 * Create Event Container
 */

import React, { Component } from 'react';
import {
    BackHandler,
    View,
    Image,
    TextInput,
    Platform,
    TouchableOpacity,
} from 'react-native';
import {
    Container,
    Content,
    Header,
    HeaderLeft,
    HeaderTitle,
    Icon,
    Text,
    Button,
    Modal,
    Toast,
    Loader
} from '@components';
import ImagePicker from 'react-native-image-crop-picker';
import * as Validation from '@lib/validation';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';

import * as em from './EventModal';

class CreateEvent extends Component<{}> {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }
    constructor(props) {
        super(props);
        this.state = {
            event_name  : '',
            p1          : '',
            p2          : '',
            fee_type    : 1,
            fees        : 10,
        };
    }

    componentDidMount(){
        this.isMount = true;
        BackHandler.addEventListener('hardwareBackPress', this.backHandler.bind(this));
    }

    componentWillUnmount(){
        this.isMount = false;
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler.bind(this));
    }

    backHandler(){
        this.props.navigation.goBack();
        return this.isMount;
    }

    openImagePicker(camera=false){
        this.props.customAction({lockApp:true});
        let picker = camera?ImagePicker.openCamera:ImagePicker.openPicker
        setTimeout(()=>picker({
            width: 300,
            height: 300,
            mediaType: 'photo',
            cropping: true
        }).then(image => {
            this.setState({
                event_pic_url: (Platform.OS === 'ios'?'file://':'')+image.path,
            });
            setTimeout(()=>this.props.customAction({lockApp:false}),100)
        }).catch(e=>{
            console.log(e);
            setTimeout(()=>this.props.customAction({lockApp:false}),100)
        }),Platform.OS === 'ios'?800:10);
    }

    createEvent(){
        let data = {};
        if(!this.state.event_name.trim()){
            return Toast.errorTop("Event name is required!");
        }
        data.event_name = this.state.event_name.trim();

        if(!this.state.p1.trim()){
            return Toast.errorTop("1st player name is required!");
        }
        data.p1 = this.state.p1.trim();

        if(!this.state.p2.trim()){
            return Toast.errorTop("2nd player name is required!");
        }
        data.p2 = this.state.p2.trim();

        if(typeof this.state.fee_type === 'undefined'){
            return Toast.errorTop("Please select event fee type!");
        }
        data.fee_type = this.state.fee_type;

        let res;
        if(!this.state.fees){
            return Toast.errorTop("Event fees value is required!");
        }
        res = Validation.percentage(this.state.fees,data.fee_type == 1?2:10);
        if(!res.success){
            return Toast.errorTop("Please enter valid fees!");
        }
        data.fees = res.percentage;
        if(data.fee_type == 1 && data.fees > 99){
            return Toast.errorTop("Fee Percentage can not be more than 99%.");
        }
        if(data.fee_type == 1 && data.fees < 2){
            return Toast.errorTop("Fee Percentage can not be less than 2%.");
        }
        if(data.fee_type == 0 && data.fees > 1000){
            return Toast.errorTop("Fees can not be more than 1000 FLASH.");
        }

        if(!this.state.expires_on_ts){
            return Toast.errorTop("Expiry time is required!");
        }
        if(this.state.expires_on_ts <= new Date().getTime()){
            return Toast.errorTop("Expire time is invalid!");
        }
        data.expires_on_ts = this.state.expires_on_ts;

        if(!this.state.ends_on_ts){
            return Toast.errorTop("Event end time is required!");
        }
        if(this.state.ends_on_ts <= new Date().getTime() ||
            this.state.ends_on_ts <= this.state.expires_on_ts){
            return Toast.errorTop("Event end time can not be earlier than expiry time.");
        }
        data.ends_on_ts = this.state.ends_on_ts;

        if(this.state.min){
            res = Validation.percentage(this.state.min,10);
            if(!res.success){
                return Toast.errorTop("Invalid Min limit!");
            }
            data.min = res.percentage;
        }else{
            data.min = 10;
        }

        if(data.min < 10){
            return Toast.errorTop("Min value must be 10 FLASH or more.");
        }

        if(this.state.max){
            res = Validation.percentage(this.state.max,10);
            if(!res.success){
                return Toast.errorTop("Invalid Max limit!");
            }
            if(res.percentage <= data.min){
                return Toast.errorTop("Max limit must be greater than min limit.");
            }
            data.max = res.percentage;
        }else{
            data.max = 0;
        }
        data.event_pic_url = (this.state.event_pic_url || null)
        data.description = this.state.description || '';
        this.props.addOracleEvent(data,this.props.navigation.goBack);
    }

    render() {
        const styles = (this.props.nightMode?
            require('@styles/nightMode/wagering'):require('@styles/wagering'));
        return (
            <Container>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={this.backHandler.bind(this)}
                                style={styles.headerBackIcon} name='angle-left' />
                        </TouchableOpacity>
                    </HeaderLeft>
                    <HeaderTitle>Create Event</HeaderTitle>
                </Header>
                <Content>
                    <View style={styles.oracleProfileContent}>
                        <View style={styles.oracleProfile}>
                            <Text style={styles.oracleProfileLabel}>
                                Event Image
                            </Text>
                            <TouchableOpacity
                                onPress={()=>this.setState({selectEventImg:true})}
                                style={styles.oracleProfileImageBtn}>
                                {!this.state.event_pic_url &&<Text style={{
                                    fontSize: 13,color:'#9B9B9B',textAlign:'center'
                                }}>
                                    Select{'\n'}event{'\n'}image
                                </Text>}
                                {this.state.event_pic_url && <Image
                                    style={styles.oracleProfileImageBtn}
                                    source={{uri:this.state.event_pic_url}} />}
                            </TouchableOpacity>
                            {this.state.event_pic_url && <View style={{
                                flexDirection: 'row',
                                alignSelf:'center',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: 65
                            }}>
                                <Icon onPress={()=>this.setState({event_pic_url:null})}
                                    style={[styles.oracleProfileEditIcon,{color: '#D55',fontSize: 25}]}
                                    name={'remove'}/>
                                <Icon onPress={()=>this.setState({selectEventImg:true})}
                                    style={[styles.oracleProfileEditIcon,{color: '#4A4A4A'}]}
                                    name={'edit'}/>
                            </View>}
                        </View>
                        <View style={styles.oracleProfile}>
                            <Text style={styles.oracleProfileLabel}>
                                Event Name
                                <Text style={styles.mandatoryField}>*</Text>
                            </Text>
                            <View style={styles.oracleProfileInputBox}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    style={styles.oracleProfileInput}
                                    placeholder={'i.e FIFA WC 2018 - 5th Match'}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    value={this.state.event_name}
                                    onChangeText={(event_name)=>this.setState({event_name})}
                                />
                            </View>
                        </View>
                        <View style={styles.oracleProfile}>
                            <Text style={styles.oracleProfileLabel}>
                                1st Team / Player
                                <Text style={styles.mandatoryField}>*</Text>
                            </Text>
                            <View style={styles.oracleProfileInputBox}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    style={styles.oracleProfileInput}
                                    placeholder={'i.e Portugal'}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    value={this.state.p1}
                                    onChangeText={(p1)=>this.setState({p1})}
                                />
                            </View>
                        </View>
                        <View style={styles.oracleProfile}>
                            <Text style={styles.oracleProfileLabel}>
                                2nd Team / Player
                                <Text style={styles.mandatoryField}>*</Text>
                            </Text>
                            <View style={styles.oracleProfileInputBox}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    style={styles.oracleProfileInput}
                                    placeholder={'i.e Brazil'}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    value={this.state.p2}
                                    onChangeText={(p2)=>this.setState({p2})}
                                />
                            </View>
                        </View>
                        <View style={styles.oracleProfile}>
                            <Text style={styles.oracleProfileLabel}>
                                Oracle Fee(%)
                                <Text style={styles.mandatoryField}>*</Text>
                            </Text>
                            {/*<View style={styles.eventRadioBtnGrp}>
                                <TouchableOpacity style={styles.eventRadioBtn}
                                    onPress={()=>this.setState({fee_type:0})}>
                                    <Icon style={styles.eventRadioBtnIcon}
                                        name={(this.state.fee_type !== 0)?"circle-o":"dot-circle-o"}/>
                                    <Text style={styles.eventRadioBtnText}>
                                        Flat
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.eventRadioBtn}
                                    onPress={()=>this.setState({fee_type:1})}>
                                    <Icon style={styles.eventRadioBtnIcon}
                                        name={(this.state.fee_type !== 1)?"circle-o":"dot-circle-o"}/>
                                    <Text style={styles.eventRadioBtnText}>
                                        Percentage
                                    </Text>
                                </TouchableOpacity>
                            </View>*/}
                            {typeof this.state.fee_type !== 'undefined' &&
                            <View style={styles.oracleProfileInputBox}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    style={styles.oracleProfileInput}
                                    placeholder={'Enter fee ('+(this.state.fee_type == 1?
                                        '%':'Flat')+')'}
                                    keyboardType={'numeric'}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    value={(this.state.fees || '').toString()}
                                    onChangeText={(fees)=>this.setState({fees})}
                                    onBlur={()=>{
                                        let fees = this.state.fees;
                                        res = Validation.percentage(fees,
                                            this.state.fee_type==1?2:10);
                                        if(!res.success)
                                            fees = '';
                                        else
                                            fees = res.percentage;
                                        this.setState({fees})
                                    }}
                                />
                            </View>}
                            <Text style={styles.oracleProfileNote}>
                                30% of the oracle fees will go to FLASH.
                            </Text>
                        </View>
                        <View style={styles.oracleProfile}>
                            <Text style={styles.oracleProfileLabel}>
                                Wagering End Time
                                <Text style={styles.mandatoryField}>*</Text>
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={()=>em.dateAndTimePicker(this,'expires_on_ts')}
                                style={styles.oracleProfileInputBox}>
                                <TextInput
                                    editable={false}
                                    underlineColorAndroid='transparent'
                                    style={styles.oracleProfileInput}
                                    placeholder={'Select event expiry datetime'}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    value={this.state.display_expires_on_ts || ''}
                                />
                                <Icon style={{
                                    position: 'absolute',
                                    right: 15,
                                    fontSize: 25,
                                    color: '#787878',
                                }} name={'calendar'} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.oracleProfile}>
                            <Text style={styles.oracleProfileLabel}>
                                Result Declaration time
                                <Text style={styles.mandatoryField}>*</Text>
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={()=>em.dateAndTimePicker(this,'ends_on_ts')}
                                style={styles.oracleProfileInputBox}>
                                <TextInput
                                    editable={false}
                                    underlineColorAndroid='transparent'
                                    style={styles.oracleProfileInput}
                                    placeholder={'Select event expiry datetime'}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    value={this.state.display_ends_on_ts || ''}
                                />
                                <Icon style={{
                                    position: 'absolute',
                                    right: 15,
                                    fontSize: 25,
                                    color: '#787878',
                                }} name={'calendar'} />
                            </TouchableOpacity>
                            <Text style={styles.oracleProfileNote}>
                                Event will be cancelled if result is not declared after 24 hours of result declaration time.
                            </Text>
                        </View>
                        <View style={styles.oracleProfile}>
                            <Text style={styles.oracleProfileLabel}>
                                Wager Limit
                            </Text>
                            <View style={styles.eventLimitInputGrp}>
                                <View style={styles.eventLimitInput}>
                                    <TextInput
                                        underlineColorAndroid='transparent'
                                        style={styles.oracleProfileInput}
                                        placeholder={'Min. FLASH'}
                                        keyboardType={'numeric'}
                                        autoCapitalize={'none'}
                                        autoCorrect={false}
                                        value={(this.state.min || '').toString()}
                                        onChangeText={(min)=>this.setState({min})}
                                        onBlur={()=>{
                                            let min = this.state.min;
                                            res = Validation.percentage(min,10);
                                            if(!res.success)
                                                min = '';
                                            else
                                                min = res.percentage;
                                            this.setState({min})
                                        }}
                                    />
                                </View>
                                <Text style={styles.eventLimitIcon}> - </Text>
                                <View style={styles.eventLimitInput}>
                                    <TextInput
                                        underlineColorAndroid='transparent'
                                        style={styles.oracleProfileInput}
                                        placeholder={'Max. FLASH'}
                                        keyboardType={'numeric'}
                                        autoCapitalize={'none'}
                                        autoCorrect={false}
                                        value={(this.state.max || '').toString()}
                                        onChangeText={(max)=>this.setState({max})}
                                        onBlur={()=>{
                                            let max = this.state.max;
                                            res = Validation.percentage(max,10);
                                            if(!res.success)
                                                max = '';
                                            else
                                                max = res.percentage;
                                            this.setState({max})
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.oracleProfile}>
                            <Text style={styles.oracleProfileLabel}>
                                Event Description
                            </Text>
                            <View style={[styles.oracleProfileInputBox,{
                                height: 80
                            }]}>
                                <TextInput
                                    multiline={true}
                                    numberOfLines={3}
                                    underlineColorAndroid='transparent'
                                    style={styles.oracleProfileInput}
                                    placeholder={'Enter extra notes (optional)'}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    value={this.state.description || ''}
                                    onChangeText={(description)=>this.setState({description})}
                                />
                            </View>
                        </View>
                        <Button
                            style={{
                                marginVertical: 20,
                            }}
                            value={'Create Event'}
                            onPress={this.createEvent.bind(this)} />
                    </View>
                </Content>
                {em.dateAndTimePickerIOS(this)}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={!!this.state.selectEventImg}
                    onRequestClose={()=>this.setState({selectEventImg:false})}>
                    <View style={styles.overlayStyle}>
                        <View style={[styles.optionContainer,{height:null}]}>
                            <TouchableOpacity
                                onPress={()=>this.setState({selectEventImg:false},
                                ()=>this.openImagePicker(true))}
                                style={styles.optionStyle}>
                                <Text style={[styles.optionTextStyle,
                                    styles.profileImageOptionTxt]}>Take Photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>this.setState({selectEventImg:false},
                                ()=>this.openImagePicker(false))}
                                style={styles.optionStyle}>
                                <Text style={[styles.optionTextStyle,
                                    styles.profileImageOptionTxt]}>Choose from Library</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.cancelContainer}>
                            <TouchableOpacity onPress={()=>this.setState({selectEventImg:false})}>
                                <View style={styles.cancelStyle}>
                                    <Text style={styles.canceTextStyle}>
                                        Cancel
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Loader show={this.props.loading} />
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {
        loading: params.loading || false,
        nightMode: params.nightMode,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
