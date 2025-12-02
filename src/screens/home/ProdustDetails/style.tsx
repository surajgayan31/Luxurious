import {StyleSheet} from 'react-native';
import { Utils } from "../../../utils/Utils";
import { color, fontSize } from '../../../styles/styles';

export const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },
  image: {
    width: '100%',
    height: Utils.calculateHeight(40),
    backgroundColor: '#f3f3f3',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: fontSize.size_22,
    fontWeight: '800',
    marginBottom: 8,
  },
  price: {
    fontSize: fontSize.size_18,
    color: color.buttonColor,
    fontWeight: '700',
    marginBottom: 12,
  },
  desc: {
    fontSize: fontSize.size_15,
    color: color.textGray,
  },
});