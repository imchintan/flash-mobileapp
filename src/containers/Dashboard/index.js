/**
 * Dashboard Navigation Routes defind
 */
import React from 'react';
import {
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
import About from './About';

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
    Lock: {
        screen: Lock,
    },
    SetOrUpdatePIN: {
        screen: SetOrUpdatePIN,
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
        this.state = {};
    }
    componentDidMount(){

        if(!this.coinmarketcapValue)
            this.coinmarketcapValue = setInterval(this.props.getCoinMarketCapDetail, 60000);

        if(!this.getMessages)
            this.getMessages = setInterval(this.props.getMessages, 10000);
    }

    componentWillUnmount(){
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

    render() {
        return(
            <Dashboard />
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
