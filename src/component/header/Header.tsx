import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import navigationService from '../../routes/navigationService';
import { routes } from '../../routes/stacks';
import { Utils } from '../../utils/Utils';
import { color, fontSize } from '../../styles/styles';

type HeaderProps = {
  title?: string;
  backgroundColor?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightElement?: boolean;
};

const Header: React.FC<HeaderProps> = ({
  title = '',
  backgroundColor = color.primary,
  showBack = true,
  onBack,
  rightElement = false,
}) => {
  const handleBack = () => {
    if (onBack) onBack();
    else navigationService.goBack();
  };

  const leftPlaceholderStyle = showBack ? {} : { width: 0 };
  const titleDynamicStyle = showBack ? {} : { marginLeft: 0, textAlign: 'left' };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {showBack ? (
        <Pressable onPress={handleBack} style={styles.backWrap}>
          <Image
            source={require('../../assets/images/fiximage/back.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </Pressable>
      ) : (
        <View style={[styles.backPlaceholder, leftPlaceholderStyle]} />
      )}

      <Text style={[styles.title, titleDynamicStyle]}>{title}</Text>

      <View style={styles.right}>{rightElement ?? <View style={styles.backPlaceholder} />}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  backWrap: {
    padding: 6,
  },
  backPlaceholder: {
    width: Utils.calculateWidth(7),
  },
  backIcon: {
    height: (30),
    width: (30),
    tintColor: color.white,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 16,
    flex: 1,
   
    color: color.white,
  },
  right: {
    minWidth: Utils.calculateWidth(7),
    alignItems: 'flex-end',
  },
  rightPress: {
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIcon: {
    width: 26,
    height: 26,
    tintColor: color.white,
  },
});

export default Header;
