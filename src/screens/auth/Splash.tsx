import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text, Image } from 'react-native';
import { StatusBar } from 'react-native';
import navigationService from '../../routes/navigationService';
import { routes } from '../../routes/stacks';
import { Utils } from '../../utils/Utils';

const Splash = () => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Color animation loop (crossfade two colorful layers)
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 4500, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 4500, useNativeDriver: true }),
      ])
    );
    loop.start();

    // After a short delay, check persisted user data and navigate accordingly
    const timer = setTimeout(async () => {
      try {
        const user = await Utils._getUserData();
        if (user) {
          navigationService.reset(routes.Product);
        } else {
          navigationService.reset(routes.Login);
        }
      } catch (e) {
        navigationService.reset(routes.Login);
      }
    }, 2000);

    return () => {
      loop.stop();
      clearTimeout(timer);
    };
  }, [anim]);

  const opacity1 = anim;
  const opacity2 = anim.interpolate({ inputRange: [0, 1], outputRange: [0.15, 0.9] });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Animated.View style={[styles.bgLayer, styles.bg1, { opacity: opacity1 }]} />
      <Animated.View style={[styles.bgLayer, styles.bg2, { opacity: opacity2 }]} />

      <View style={styles.content} pointerEvents="none">
        <Image source={require('../../assets/images/logo/splash_logo2.png')} style={{height:300,width:300,resizeMode:'center'}}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  bgLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  // Two colorful layers that crossfade to create a lively background
  bg1: {
    backgroundColor: '#FF6B6B',
    transform: [{ rotate: '14deg' }],
  },
  bg2: {
    backgroundColor: '#6B8CFF',
    transform: [{ rotate: '-12deg' }],
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 56,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 4,
    textShadowColor: 'rgba(0,0,0,0.45)',
    textShadowOffset: { width: 0, height: 6 },
    textShadowRadius: 12,
  },
});

export default Splash;
