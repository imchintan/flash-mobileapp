/**
 * My Profile Container
 */

import React, { Component } from 'react';
import {
  View,
  TextInput
} from 'react-native';
import {
    Text,
    Content
} from '@components';
import moment from 'moment-timezone';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
const styles = require("@styles/myAccount");

class MyProfile extends Component<{}> {

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
                <View style={styles.profile}>
                    <View style={styles.profileRow}>
                        <Text style={styles.profileRowLabel}>Full Name</Text>
                        <View style={styles.profileRowInputBox}>
                        <TextInput
                            editable={false}
                            underlineColorAndroid='transparent'
                            style={styles.profileRowInput}
                            placeholder={'Enter full name'}
                            value={this.props.profile.display_name}
                        />
                        </View>
                    </View>
                    <View style={styles.profileRow}>
                        <Text style={styles.profileRowLabel}>Email</Text>
                        <View style={styles.profileRowInputBox}>
                            <TextInput
                                editable={false}
                                underlineColorAndroid='transparent'
                                style={styles.profileRowInput}
                                placeholder={'Enter email address'}
                                keyboardType={'email-address'}
                                value={this.props.profile.email}
                            />
                        </View>
                    </View>
                    <View style={styles.profileRow}>
                        <Text style={styles.profileRowLabel}>Timezone</Text>
                        <View style={styles.profileRowInputBox}>
                            <TextInput
                                editable={false}
                                underlineColorAndroid='transparent'
                                style={styles.profileRowInput}
                                placeholder={'Select your timezone'}
                                value={this.props.profile.timezone || moment.tz.guess()}
                            />
                        </View>
                    </View>
                    <View style={styles.profileRow}>
                        <Text style={styles.profileRowLabel}>Phone number</Text>
                        <View style={styles.profileRowInputBox}>
                            <TextInput
                                editable={false}
                                underlineColorAndroid='transparent'
                                style={styles.profileRowInput}
                                placeholder={'Enter phone number'}
                                value={this.props.profile.phone}
                            />
                        </View>
                    </View>
                </View>
            </Content>
        );
    }
}

function mapStateToProps({params}) {
    return {
        profile: params.profile,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
