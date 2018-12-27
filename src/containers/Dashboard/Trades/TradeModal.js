import React from 'react';
import {
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import {
    Icon,
    Text,
    Modal,
} from '@components';
import * as constants from '@src/constants';

/**
 * Select Country
 */
export const selectCountry = (self,styles) => <Modal transparent={true}
    animationType="slide"
    visible={!!self.state.selectCountry}
    onRequestClose={()=>self.setState({selectCountry:false})}>
    <View style={styles.overlayStyle}>
        <View style={[styles.optionContainer,{height:'80%'}]}>
            <ScrollView keyboardShouldPersistTaps="always">
                <View style={{ paddingHorizontal: 10 }}>
                    {constants.COUNTRY.map((country,index) =>
                        <TouchableOpacity key={'_que_'+country+'_'+index}
                            style={styles.optionStyle}
                            onPress={()=>{
                                self.setState({selectCountry:false, country});
                            }}>
                            <Text style={styles.optionTextStyle}>
                                {country}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </View>
        <View style={styles.cancelContainer}>
            <TouchableOpacity onPress={()=>self.setState({selectCountry:false})}>
                <View style={styles.cancelStyle}>
                    <Text style={styles.canceTextStyle}>
                        Cancel
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
</Modal>

/**
 * Select Fiat Currency
 */
export const selectFiatCurrency = (self,styles,isFilter=false) => <Modal transparent={false}
    animationType="slide"
    visible={!!self.state.selectFiatCurrency}
    onRequestClose={()=>self.setState({selectFiatCurrency:false})}>
    <TouchableOpacity style={styles.htmAdFilterBtn}
         onPress={()=>self.setState({selectFiatCurrency:false})}>
        <Text style={[styles.selectFiatCurrencyText,
            {fontSize:18 ,paddingVertical:20, fontWeight:'bold'}]}>Done</Text>
    </TouchableOpacity>
    <Text style={styles.htmAdFilterTitle}>Select Fiat Currency</Text>
    <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{ marginHorizontal: 20 }}>
        {Object.values(constants.FIAT_CURRENCY_NAME).map((cur,index) =>
            <TouchableOpacity key={'_fiat_currency_'+cur+'_'+index}
                onPress={()=>{
                    let fiat_currency_codes = ((isFilter?self.state.filter.fiat_currency_codes:
                        self.state.fiat_currency_codes) || []);
                    if(fiat_currency_codes.includes(constants.FIAT_CURRENCY_UNIT[index])){
                        fiat_currency_codes.remove(constants.FIAT_CURRENCY_UNIT[index]);
                    }else{
                        fiat_currency_codes.push(constants.FIAT_CURRENCY_UNIT[index]);
                    }
                    let filter = isFilter?self.state.filter:{};
                    filter.fiat_currency_codes = fiat_currency_codes;
                    self.setState(isFilter?{filter}:filter);
                }}
                style={styles.fiatCurrencyRow}>
                <View style={{
                    flexDirection:'row',
                    alignItems:'center'
                }}>
                    <Icon style={styles.htmCurrencyCheckIcon}
                        name={((isFilter?self.state.filter.fiat_currency_codes:
                            self.state.fiat_currency_codes) || []).includes(constants.FIAT_CURRENCY_UNIT[index])?'check-square-o':'square-o'}/>
                    <Text style={styles.optionTextStyle}>{cur}</Text>
                </View>
                <Text style={styles.optionTextStyle}>{constants.FIAT_CURRENCY_UNIT[index]}</Text>
            </TouchableOpacity>
        )}
    </ScrollView>
</Modal>
