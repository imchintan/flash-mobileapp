import Container from './Container';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import Button from './Button';
import FAB from './FAB';
import Loader from './Loader';
import Transaction from './Transaction';
import Toast from './Toast';
import Icon from 'react-native-fa-icons';
import Calendar from 'react-native-calendar-select';
import QRCode from 'react-native-qrcode';

module.exports = {
    Container,
    ...Header,
    Content,
    ...Footer,
    Button,
    FAB,
    Loader,
    ...Transaction,
    Toast,
    Icon,
    Calendar,
    QRCode
}
