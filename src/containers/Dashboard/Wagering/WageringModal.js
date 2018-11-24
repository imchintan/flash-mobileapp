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
                "Wagers are subject to a fee of up to 10%."}
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
