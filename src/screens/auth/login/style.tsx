 
 
import {StyleSheet} from 'react-native';
import { Utils } from '../../../utils/Utils';
import { color, fontSize } from '../../../styles/styles';
export const styles = StyleSheet.create({
  container: {
     flex: 1,
    backgroundColor: color.white,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
     column: {
    backgroundColor: '#FFFFFF',
   
  },
  applogo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
   view2: {
    alignItems: 'center',
    
  },
  logoText1: {
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    color: color.primary,
  },
   text21: {
      color: color.liteGray,
      fontWeight: '500',
      fontSize: fontSize.size_16,
      marginBottom: 20,
      marginTop: 20,
      marginLeft: 10,
      textAlign: 'center',
    },
    forgotPasswordContainer:{
    alignItems: 'flex-end',
    paddingTop: 20, 
    },
    forgotPasswordText:{
      color: color.grayText,
      fontSize: fontSize.size_16,
      fontWeight: '500',
    }
});
