/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {PaperProvider} from 'react-native-paper';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Navigators from './src/routes/navigators';
import { color } from './src/styles/styles';

const App = () => {


  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Provider store={store}>
          {/* Default status bar for the app (screens can override) */}
          <StatusBar barStyle="default" backgroundColor={color.primary}  />
          <Navigators />
        </Provider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
