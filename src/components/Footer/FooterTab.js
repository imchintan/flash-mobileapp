import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
} from 'react-native';
export default class FooterTab extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <TouchableOpacity activeOpacity={!this.props.active?0.5:1} onPress={!this.props.active?this.props.onPress:null}
                style={[styles.footerTab, this.props.style, this.props.active && styles.footerTabActive]}>
                <Image style={[styles.footerIcon,this.props.iconStyle]} source={this.props.active && this.props.activeIcon?this.props.activeIcon:this.props.icon} />
                <Text style={[styles.footerText, this.props.textStyle, this.props.active && styles.footerTextActive]}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    footerTab:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        height: '100%',
    },
    footerTabActive:{
        borderBottomWidth: 4,
        borderBottomColor: '#F8BD5B',
    },
    footerText:{
        paddingLeft: 8,
        fontSize: 20,
        color: '#000000',
    },
    footerTextActive:{
        color: '#F8BD5B',
        fontWeight: '400',
    },
    footerIcon:{
        width: 15,
        height: 15,
    },
});

/*<Footer>
    <FooterTab iconStyle={styles.footerScanIcon}
        onPress={()=>this.props.navigation.navigate('Scan')}
        activeIcon={require('@images/scan-golden.png')}
        title={'Scan'}
        icon={require('@images/scan-black.png')} />
    <FooterTab iconStyle={styles.footerScanIcon} active
        activeIcon={require('@images/list-golden.png')}
        title={'List'}
        iconStyle={styles.footerListIcon}
        icon={require('@images/list-black.png')} />
</Footer>
<FAB />*/
