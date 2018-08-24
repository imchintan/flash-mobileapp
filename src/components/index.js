import Container from './Container';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import Button from './Button';
import Text from './Text';
import Modal from './Modal';
import FAB from './FAB';
import Loader from './Loader';
import Transaction from './Transaction';
import Toast from './Toast';
import TabBarBottom from './TabBarBottom';
import WalletMenu from './WalletMenu';
import WalletFooter from './WalletFooter';
import Icon from 'react-native-fa-icons';
import Calendar from 'react-native-calendar-select';
import QRCode from 'react-native-qrcode';

const Switch = require('react-native-material-switch');

module.exports = {
    Container,
    ...Header,
    Content,
    ...Footer,
    Button,
    Text,
    Modal,
    FAB,
    Loader,
    ...Transaction,
    Toast,
    WalletMenu,
    WalletFooter,
    TabBarBottom,
    Icon,
    Calendar,
    QRCode,
    Switch,
}
