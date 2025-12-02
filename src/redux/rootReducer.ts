import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import formReducer from './slices/formSlice';
import cartReducer from './slices/cartSlice';



const combinedReducer = combineReducers({
  authReducer: authReducer,
  formReducer: formReducer,
  cart: cartReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'auth/reset') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export type RootState = ReturnType<typeof combinedReducer>;

export default rootReducer;
