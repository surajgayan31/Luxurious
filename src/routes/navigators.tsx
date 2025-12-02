import React, {  } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import NavigationService from './navigationService';
import { RootStack } from './stacks';
 


const Navigator = () => {

  return (
    <NavigationContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}>
     <RootStack/>
    </NavigationContainer>
  );
};

export default Navigator;
