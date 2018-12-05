/**
 * Dashboard Navigation Routes defind
 */
import React from 'react';
import { NetInfo, View } from 'react-native';
import {
    Text,
    Toast
} from '@components'
import {
    createStackNavigator
} from 'react-navigation';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';

import Home from './Home';
import Wallet from './Wallet';
import Profile from './Profile';
import Settings from './Settings';
import SecurityQuestion from './SecurityQuestion';
import SecurityCenter from './SecurityCenter';
import FingerPrint from './FingerPrint';
import TwoPhaseAuth from './TwoPhaseAuth';
import SetOrUpdatePIN from './SetOrUpdatePIN';
import Lock from './Lock';
import Send from './Send';
import Receive from './Receive';
import Request from './Request';
import Activity from './Activity';
import Pending from './Pending';
import Sharing from './Sharing';
import About from './About';
import Trades from './Trades';
import Wagering from './Wagering';

const routes = {
    Home: {
        screen: Home,
    },
    About: {
        screen: About,
    },
    Wallet: {
        screen: Wallet,
    },
    Profile: {
        screen: Profile,
    },
    Settings: {
        screen: Settings,
    },
    SecurityQuestion: {
        screen: SecurityQuestion,
    },
    SecurityCenter: {
        screen: SecurityCenter,
    },
    FingerPrint: {
        screen: FingerPrint,
    },
    TwoPhaseAuth: {
        screen: TwoPhaseAuth,
    },
    Send: {
        screen: Send,
    },
    Receive: {
        screen: Receive,
    },
    Request: {
        screen: Request,
    },
    Activity: {
        screen: Activity,
    },
    Pending: {
        screen: Pending,
    },
    Sharing: {
        screen: Sharing,
    },
    Lock: {
        screen: Lock,
    },
    SetOrUpdatePIN: {
        screen: SetOrUpdatePIN,
    },
    Trades: {
        screen: Trades,
    },
    Wagering: {
        screen: Wagering,
    },

};

const routeConfig = {
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
        gesturesEnabled: false,
   }
};

const Dashboard = createStackNavigator(routes,routeConfig);

const EnhancedComponent = class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            online:true,
            show: false,
        };
    }
    componentDidMount(){
        this.mount = true;
        this.props.customAction({
            DashboardNavigation:this.refs.dashboard._navigation
        });
        if(!this.coinmarketcapValue)
            this.coinmarketcapValue = setInterval(this.props.getFiatCurrencyRate, 60000);

        if(!this.getMessages)
            this.getMessages = setInterval(this.props.getMessages, 10000);

        NetInfo.getConnectionInfo().then(this.handleConnectivityChange.bind(this));
        NetInfo.addEventListener('connectionChange',this.handleConnectivityChange.bind(this));
    }

    componentWillUnmount(){
        this.mount = false;
        NetInfo.removeEventListener('connectionChange',this.handleConnectivityChange.bind(this));
        clearInterval(this.coinmarketcapValue);
        clearInterval(this.getMessages);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps){
            if(nextProps.errorMsg){
                Toast.errorTop(nextProps.errorMsg);
                this.props.resetMessages();
            }
            if(nextProps.infoMsg){
                Toast.showTop(nextProps.infoMsg);
                this.props.resetMessages();
            }
            if(nextProps.successMsg){
                Toast.successTop(nextProps.successMsg);
                this.props.resetMessages();
            }
        }
    }

    handleConnectivityChange(connectionInfo){
        let status = this.state.online ;
        let online = connectionInfo.type !== 'none'
            && connectionInfo.type !== 'unknown';
        this.setState({
            online,
            show: status !== online
        },()=>{
            if(status !== this.state.online && this.state.online) setTimeout(()=>this.mount &&
                this.setState({show:false}),1500)
        });
    }

    render() {
        return(
            <View style={{flex:1}}>
                <Dashboard ref={'dashboard'}/>
                {this.state.show && <Text style={{
                    backgroundColor: this.state.online?'#228B22':'#d33',
                    color: '#fff',
                    textAlign: 'center',
                    paddingVertical: 3,
                    fontSize: 13
                }}>
                    {this.state.online?'Internet Connection Available!':'No Internet Connection!'}
                </Text>}
            </View>
        )
    }
}

function mapStateToProps({params}) {
    return {
        isLoggedIn: params.isLoggedIn,
        errorMsg: params.errorMsg || null,
        successMsg: params.successMsg || null,
        infoMsg: params.infoMsg || null,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedComponent);
