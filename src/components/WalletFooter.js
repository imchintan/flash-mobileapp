import React from 'react'
import {
    View,
    Keyboard,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import { StackActions } from 'react-navigation';
import Text from './Text';
import { Footer } from './Footer';

const { width } = Dimensions.get('window');

export default class WalletFooter extends React.PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      isVisible: true
    }
  }

  componentDidMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove()
    this.keyboardWillHideSub.remove()
  }

  keyboardWillShow = event => {
    this.setState({
      isVisible: false
    })
  }

  keyboardWillHide = event => {
    this.setState({
      isVisible: true
    })
  }

  switchTab(routeName){
      if(this.props.selected){
          const replaceAction = StackActions.replace({
            key: this.props.navigation.state.key,
            routeName,
          });
          this.props.navigation.dispatch(replaceAction);
      } else {
          this.props.navigation.navigate(routeName);
      }
  }


  render() {
    return this.state.isVisible ?<Footer>
        <View style={styles.footerBtnGrp}>
            <TouchableOpacity
                activeOpacity={this.props.selected == 'Send'?1:0.5}
                onPress={()=>this.props.selected !== 'Send' && this.switchTab('Send')}
                style={this.props.selected == 'Send'?
                    styles.footerBtnSelected:styles.footerBtn}>
                <Text style={this.props.selected == 'Send'?
                    styles.footerBtnSelectedLabel:styles.footerBtnLabel}>
                    Send
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={this.props.selected == 'Receive'?1:0.5}
                onPress={()=>this.props.selected !== 'Receive' && this.switchTab('Receive')}
                style={this.props.selected == 'Receive'?
                    styles.footerBtnSelected:styles.footerBtn}>
                <Text style={this.props.selected == 'Receive'?
                    styles.footerBtnSelectedLabel:styles.footerBtnLabel}>
                    Receive
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={this.props.selected == 'Request'?1:0.5}
                onPress={()=>this.props.selected !== 'Request' && this.switchTab('Request')}
                style={this.props.selected == 'Request'?
                    styles.footerBtnSelected:styles.footerBtn}>
                <Text style={this.props.selected == 'Request'?
                    styles.footerBtnSelectedLabel:styles.footerBtnLabel}>
                    Request
                </Text>
            </TouchableOpacity>
        </View>
    </Footer>:null
  }
}

const styles = StyleSheet.create({
    footerBtnGrp:{
        width: width-20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    footerBtn:{
        backgroundColor: '#191714',
        width: (width - 60)/3,
        padding: 8,
        alignItems: 'center',
        borderRadius: 5,
    },
    footerBtnLabel:{
        color:'#FFFFFF',
        fontSize: 17,
    },
    footerBtnSelected:{
        borderWidth: 1,
        borderColor: '#191714',
        width: (width - 60)/3,
        padding: 8,
        alignItems: 'center',
        borderRadius: 5,
    },
    footerBtnSelectedLabel:{
        color:'#191714',
        fontSize: 17,
    },
});
