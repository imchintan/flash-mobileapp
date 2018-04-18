import Container from './Container';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import Button from './Button';
import Text from './Text';
import FAB from './FAB';
import Loader from './Loader';
import Transaction from './Transaction';
import Toast from './Toast';
import TabBarBottom from './TabBarBottom';
import Icon from 'react-native-fa-icons';
import Calendar from 'react-native-calendar-select';
import QRCode from 'react-native-qrcode';
import { Switch } from 'react-native-switch';

module.exports = {
    Container,
    ...Header,
    Content,
    ...Footer,
    Button,
    Text,
    FAB,
    Loader,
    ...Transaction,
    Toast,
    TabBarBottom,
    Icon,
    Calendar,
    QRCode,
    Switch
}
