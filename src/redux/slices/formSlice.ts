import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../rootReducer';
import { FormState } from '../types/formType';
 

export const initialState: FormState = {
 
  isLoading: false,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setLoading: (state: FormState, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
     
  },
});

export const { setLoading,
  
} = formSlice.actions;

export const formSelector = (state: RootState) => state.form;
export default formSlice.reducer;
