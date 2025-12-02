import { StyleSheet } from "react-native";
import { color, fontSize } from "../../../styles/styles";

export const styles = StyleSheet.create({
  emptyWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: color.grayText || '#666', fontSize: fontSize.size_16 },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  image: { width: 80, height: 80, borderRadius: 6, marginRight: 12 },
  info: { flex: 1, justifyContent: 'center' },
  title: { fontSize: fontSize.size_16, fontWeight: '700', color: '#222' },
  price: { color: color.grayText || '#666', marginTop: 6 },
  qty: { marginTop: 6, color: '#444' },
  rowBottom: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  itemTotal: { marginLeft: 12, fontWeight: '700' },
  removePress: {
    padding: 8,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: -60,
    bottom: 0,
  },
  removeText: { color: '#d9534f' },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: color.white,
  },
  totalWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalText: { color: color.black, fontSize: fontSize.size_18,fontWeight: '700' },
  totalAmount: { fontWeight: '700' },
});