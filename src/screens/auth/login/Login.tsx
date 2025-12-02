import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
} from 'react-native';
import CustomButton from '../../../component/customButton/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { color,  fontSize } from '../../../styles/styles';
import RightIconInput from '../../../component/customTextInput/RightIconInput';
import { Utils } from '../../../utils/Utils';
import RightIconDisplayInput from '../../../component/customTextInput/RightIconDisplayInput';
import navigationService from '../../../routes/navigationService';
import { routes } from '../../../routes/stacks';
import { validateMethod } from '../../../component/validationMethod/validationMethods';

const Login = () => {

   
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry); // Toggle password visibility
  };
  const [secureTextEntry, setSecureTextEntry] = useState(true); // State to manage password visibility

  const eyeIcon = secureTextEntry
    ? require('../../../assets/images/icon/eyeOpen.png')
    : require('../../../assets/images/icon/eyeclose.png');
  // password requirement for login: minimum 8 characters, alphanumeric (at least one letter and one digit)
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const onChangeEmail = (val: string) => {
    setEmail(val);
    const err = validateMethod.validateEmail(val);
    setEmailError(err || '');
  };

  const onChangePassword = (val: string) => {
    setPassword(val);
    if (!val || val.length === 0) {
      setPasswordError('Please enter password');
      return;
    }
    if (!passwordPattern.test(val)) {
      setPasswordError('Password must be at least 8 chars and alphanumeric (letters + numbers)');
    } else {
      setPasswordError('');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
       
          <View style={styles.column}>
            <Image
              source={require('../../../assets/images/logo/splash_logo2.png')}
              style={styles.applogo}
            />
          </View>
          <View style={styles.view2}>
            <Text style={styles.logoText1}>{'WELCOME BACK! :)'}</Text>
            <Text style={styles.text21}>{'Access your account:'}</Text>
          </View>
          <View style={{ marginBottom: Utils.calculateHeight(2) }}>
            <RightIconDisplayInput
              value={email}
              onChangeText={onChangeEmail}
              placeholder="@Email"
              rightIcon={require('../../../assets/images/icon/mail.png')}
              keyboardType="default"
            />
            {emailError.length > 0 && (
              <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{emailError}</Text>
            )}

            <RightIconInput
              value={password}
              onChangeText={onChangePassword}
              placeholder="Password"
              rightIcon={eyeIcon}
              onRightIconPress={togglePasswordVisibility}
              secureTextEntry={secureTextEntry}
              // intentionally not passing validationType to use our simpler alphanumeric rule
            />
            {passwordError.length > 0 && (
              <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{passwordError}</Text>
            )}
          </View>
          <CustomButton
            text="Next"
            marginVertical={Utils.calculateHeight(0)}
            width={'100%'}
            
            borderRadius={10}
            onPress={async () => {
              // TODO: replace with real authentication call
              console.log('Login submitted', { email, password });
              const userData = {
                email,
                // In a real app, save the token and user info returned by server
                token: 'demo-token',
                userId: email,
              };
              await Utils._setUserData(userData);
              navigationService.navigate(routes.Product);
            }}
            height={50}
            disable={
              !email || !password || emailError.length > 0 || passwordError.length > 0
            }
          />
          <View  style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>
              Forgot{' '}
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: fontSize.size_18,
                  color: color.primary,
                }}
              >
                Password?
              </Text>
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginTop: Utils.calculateHeight(14),
            }}
          >
            <View >
              
            <Text style={{ fontSize: fontSize.size_18 }}>
              {'Don’t have an account? '}
              <Text style={{ fontWeight: 'bold', color: color.primary }}>
                {'Sign up!'}
              </Text>
            </Text>
            </View>
          </View>
      
      
      
       
    </SafeAreaView>
  );
};

export default Login;
