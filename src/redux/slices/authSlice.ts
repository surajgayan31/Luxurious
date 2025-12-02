import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { AuthState} from '../types/types';

export const initialState: AuthState = {
  isAuth: false,
  isLoading: false,

};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state: AuthState, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },      
  

  }
});

export const {
  setLoading,


} = authSlice.actions;

export const authSelector = (state: RootState) => state.auth;
export default authSlice.reducer;
