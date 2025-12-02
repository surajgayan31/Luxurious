 
 
import {StyleSheet} from 'react-native';
import { color, fontFamily, fontSize } from '../../styles/styles';
import { Utils } from '../../utils/Utils';
export const styles = StyleSheet.create({
  main: {
    borderRadius: 8,
    justifyContent: 'center',
    borderColor: color.gray,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius:25,
    height:Utils.calculateHeight(50),
    marginTop:-10,
    justifyContent:'center',
    backgroundColor:color.black,
  },

  inputContainer: {
    height: Utils.calculateHeight(48),
    color: color.black,
    fontSize: fontSize.size_16,
    letterSpacing:2,
    fontFamily: fontFamily.SemiBold,
    borderColor: color.gray,
    marginTop:0,
    marginHorizontal:-10,
  },
  tvLabel: {},
  ivLeftIcon: {
    marginStart: Utils.calculateWidth(10),
  },
  closeImage: {
    height: Utils.calculateHeight(14),
    width: Utils.calculateWidth(14),
    right: Utils.calculateWidth(10),
    paddingRight:10
  },
});
