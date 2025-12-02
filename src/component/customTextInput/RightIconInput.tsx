import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { color, fontSize } from '../../styles/styles';
import { validateMethod } from '../validationMethod/validationMethods';

interface RightIconInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  rightIcon?: any;
  onRightIconPress?: () => void;
  secureTextEntry?: boolean;
  validationType?: 'email' | 'mendatory' | 'password' | 'phone' | 'other' | 'userName' | 'fullName' | 'card_expiry_date' | 'description';
  rightIconHeight?: number;
  rightIconWidth?: number;
  keyboardType?: any;
}

const RightIconInput: React.FC<RightIconInputProps> = ({
  value,
  onChangeText,
  placeholder,
  rightIcon,
  onRightIconPress,
  secureTextEntry,
  validationType,
  rightIconHeight,
  rightIconWidth,
  keyboardType,
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(secureTextEntry || false);

  const validate = (val: string) => {
    let error: string | undefined = undefined;
    switch (validationType) {
      case 'email':
        error = validateMethod.validateEmail(val);
        break;
      case 'mendatory':
        error = validateMethod.validateMendatory(val);
        break;
      case 'phone':
        error = validateMethod.validatePhone(val);
        break;
      case 'fullName':
        error = validateMethod.validateFullName(val);
        break;
      case 'description':
        error = validateMethod.validateDescription(val);
        break;
      case 'password':
        // Password validation: min 8 chars, at least one uppercase, one lowercase, one digit, one special char
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!val || val.length === 0) {
          error = 'Password is required.';
        } else if (!passwordPattern.test(val)) {
          error = 'Password must be 8+ chars, uppercase, lowercase, digit, & special char.';
        }
        break;
    }
    return error;
  };

  const handleChangeText = (text: string) => {
    onChangeText(text);
    setErrorMessage('');
  };

  const handleEndEditing = () => {
    setIsFocus(false);
    const error = validate(value);
    setErrorMessage(error || '');
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
    if (onRightIconPress) onRightIconPress();
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={handleChangeText}
        placeholder={isFocus ? '' : placeholder}
        secureTextEntry={showPassword}
        onFocus={() => setIsFocus(true)}
        onEndEditing={handleEndEditing}
        placeholderTextColor={color.gray}
        keyboardType={keyboardType}
      />
      {rightIcon && (
        <TouchableOpacity onPress={handleTogglePassword} style={styles.iconWrapper}>
          <Image source={rightIcon} style={{ width: rightIconWidth || 20, height: rightIconHeight || 20, tintColor:color.primary }} resizeMode="contain" />
        </TouchableOpacity>
      )}
      {errorMessage.length > 0 && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color.gray,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: color.white,
    marginVertical: 10,
    position: 'relative',
  },
  textInput: {
    flex: 1,
    fontSize: fontSize.size_16,
    color: color.black,
  },
  iconWrapper: {
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    position: 'absolute',
    left: 10,
    bottom: -18,
    color: 'red',
    fontSize: fontSize.size_10,
  },
});

export default RightIconInput;
