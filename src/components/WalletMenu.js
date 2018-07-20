import React from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Platform,
    TouchableOpacity
} from 'react-native'
import { StackActions } from 'react-navigation';
import * as constants from '@src/constants';
import Icon from 'react-native-fa-icons';
import Text from './Text';

const { height, width } = Dimensions.get('window');

export default class WalletMenu extends React.PureComponent {

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  switchTab(routeName){
      if(this.props.selected){
          if(this.props.selected == routeName){
              this.props.onPress();
          }else{
              const replaceAction = StackActions.replace({
                key: this.props.navigation.state.key,
                routeName,
              });
              this.props.navigation.dispatch(replaceAction);
          }
      } else {
          this.props.onPress();
          this.props.navigation.navigate(routeName);
      }
  }


  render() {
    return this.props.visible?<View style={styles.menuPopup}>
        <TouchableOpacity
            activeOpacity={1}
            style={styles.menuPopupContainer}
            onPress={this.props.onPress}>
            <Icon style={styles.menuPopupUpArrow} name='caret-up' />
            <View style={styles.menuPopupBox}>
                <TouchableOpacity style={styles.menuPopupTab}
                    onPress={()=>this.switchTab('Activity')}>
                    <Text style={styles.menuPopupTabLabel}>Activity</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuPopupTab}
                    onPress={()=>this.switchTab('Pending')}>
                    <Text style={styles.menuPopupTabLabel}>Pending</Text>
                    {this.props.badgePending>0?<View style={styles.badge}>
                        <Text style={styles.badgeText}>{this.props.badgePending}</Text>
                    </View>:null}
                </TouchableOpacity>
                {this.props.currency_type === constants.CURRENCY_TYPE.FLASH?
                    <TouchableOpacity style={styles.menuPopupTab}
                        onPress={()=>this.switchTab('Sharing')}>
                        <Text style={styles.menuPopupTabLabel}>Sharing</Text>
                    </TouchableOpacity>:null}
                <TouchableOpacity style={styles.menuPopupTab}
                    onPress={()=>this.switchTab('Send')}>
                    <Text style={styles.menuPopupTabLabel}>Send</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuPopupTab}
                    onPress={()=>this.switchTab('Receive')}>
                    <Text style={styles.menuPopupTabLabel}>Receive</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.menuPopupTab,{
                        borderBottomWidth: 0,
                        borderBottomColor: 'transparent',
                    }]}
                    onPress={()=>this.switchTab('Request')}>
                    <Text style={styles.menuPopupTabLabel}>Request</Text>
                </TouchableOpacity>


            </View>
        </TouchableOpacity>
    </View>:null
  }
}

const styles = StyleSheet.create({
    menuPopup:{
        position: 'absolute',
        right: 3,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, 0.5)',
                shadowOffset: { height: 1, width: 0 },
                shadowOpacity: 0.7,
                top: 64,
            },
            android: {
                elevation: 12,
                top: 42,
            },
        }),
        zIndex: 100000
    },
    menuPopupContainer:{
        width,
        height
    },
    menuPopupBox:{
        position: 'absolute',
        right: 0,
        top: 10,
        backgroundColor: '#333333',
        width: 130,
        borderRadius: 5,
    },
    menuPopupUpArrow:{
        position: 'absolute',
        right: 8,
        top: -12,
        color: '#333333',
        fontSize: 32
    },
    menuPopupTab:{
        paddingHorizontal: 5,
        paddingVertical: 8,
        marginHorizontal: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(255, 255, 255, 0.5)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    menuPopupTabLabel:{
        fontSize: 16,
        color: '#FFFFFF'
    },
    badge:{
        minWidth:24,
        height:24,
        borderRadius:12,
        backgroundColor:'#E0AE27',
        position: 'absolute',
        right: 3,
        paddingHorizontal: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    badgeText:{
        textAlign: 'center',
        color:'#000',
        fontSize: 13,
        fontWeight: '500',
    },
});
