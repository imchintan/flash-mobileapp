import React from 'react';
import {
    View,
    TouchableOpacity,
} from 'react-native';
import {
    Icon,
    Text,
    Modal
} from '@components';

import * as utils from '@lib/utils';
import * as constants from '@src/constants';

/**
 * Legal Disclaimer for oracle event
 */
export const legalDisclaimer = (self,styles) => <Modal transparent={true}
    visible={!self.props.wagerLegalDisclaimer} onRequestClose={() => true}>
    <View style={styles.legalDisclaimer}>
        <View style={styles.legalDisclaimerBox}>
            <Text style={styles.label}>
                Legal Disclaimer
            </Text>
            <View style={styles.legalDisclaimerHr}/>
            <Text style={styles.legalDisclaimerText}>
                {"Personal wagering is legal in many areas, "+
                "please check local regulations before proceeding. "+
                "Never wager more than you can afford to lose. "+
                "Wagers are subject to oracle fee."}
            </Text>
            <TouchableOpacity style={styles.legalDisclaimerDNS}
                onPress={()=>self.setState({do_not_show:!self.state.do_not_show})}>
                <Icon style={styles.legalDisclaimerDNSIcon}
                    name={self.state.do_not_show === true?
                        'check-square-o':'square-o'}/>
                <Text style={styles.legalDisclaimerDNSText}>
                    {"  Do not show again."}
                </Text>
            </TouchableOpacity>
            <View style={styles.legalDisclaimerHr}/>
            <TouchableOpacity style={styles.legalDisclaimerBtn}
                onPress={self.legalDisclaimer.bind(self)}>
                <Text style={styles.legalDisclaimerBtnText}>
                    I UNDERSTAND
                </Text>
            </TouchableOpacity>
        </View>
    </View>
</Modal>

/**
 * balance header component
 */
export const balanceHeader = (self,styles) => <View style={[styles.walletBalanceTab,{
    backgroundColor: '#191714',
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginHorizontal: 0,
    borderRadius: 0,
}]}>
    <View style={styles.walletBalanceRowBox}>
        <Text style={[styles.walletBalanceLabel,{
            color:'rgba(255,255,255,0.6)'
        }]}>Balance</Text>
        <Text style={[styles.walletBalance,{
            color:'rgba(255,255,255,0.9)'
        }]}>{utils.flashNFormatter((self.props.currency_type == constants.CURRENCY_TYPE.FLASH?
                utils.satoshiToFlash(self.props.balance).toFixed(10):self.props.balance),2)+
            ' '+utils.getCurrencyUnitUpcase(self.props.currency_type)}
        </Text>
    </View>
    <View style={styles.walletBalanceRowBox}>
        <Text style={[styles.walletBalanceLabel,{
            color:'rgba(255,255,255,0.6)'
        }]}>Staked Balance</Text>
        <Text style={[styles.walletBalance,{
            color:'rgba(255,255,255,0.9)'
        }]}>{utils.flashNFormatter((self.props.currency_type == constants.CURRENCY_TYPE.FLASH?
                utils.satoshiToFlash(self.props.sbalance).toFixed(10):self.props.sbalance),2)+
            ' '+utils.getCurrencyUnitUpcase(self.props.currency_type)}
        </Text>
    </View>
</View>
