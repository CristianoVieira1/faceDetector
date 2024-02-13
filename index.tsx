// @ts-nocheck
import {registerRootComponent} from 'expo';
import {Text, TextInput} from 'react-native';
import './ReactotronConfig';
import App from './src/App';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
registerRootComponent(App);
