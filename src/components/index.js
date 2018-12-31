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
import FToast from './FToast';
import TabBarBottom from './TabBarBottom';
import WalletMenu from './WalletMenu';
import Rating from './Rating';
import WalletFooter from './WalletFooter';
import Icon from 'react-native-fa-icons';
import Calendar from 'react-native-calendar-select';
import QRCode from 'react-native-qrcode';

import Slider from '@ptomasroos/react-native-multi-slider';
import Switch from 'react-native-material-switch';

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
    FToast,
    WalletMenu,
    WalletFooter,
    Rating,
    TabBarBottom,
    Icon,
    Calendar,
    QRCode,
    Switch,
    Slider
}
