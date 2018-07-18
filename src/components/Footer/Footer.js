import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Keyboard
} from 'react-native';
export default class Footer extends Component {
    constructor(props) {
        super(props);
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

    keyboardWillShow = event => this.setState({isVisible: false})
    
    keyboardWillHide = event => this.setState({isVisible: true})

    render() {
        return this.state.isVisible ?
                <View style={[styles.footer,this.props.style]}>
                    {this.props.children}
                </View>:null;
    }
}

const styles = StyleSheet.create({
    footer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        height: 60,
        width: '100%',
        elevation: 10,
        position:'absolute',
        bottom :0,
        zIndex: 99999
    }
});
