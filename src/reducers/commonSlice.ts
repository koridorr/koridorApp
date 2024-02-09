import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../types/User';
import {removeKeyFromStorage} from '../helpers/AsyncStorage';
import {STORAGE_KEYS} from '../helpers/constants';
import {RootState} from '../app/store';

export interface CommonState {
  cms: any;
}

const initialState: CommonState = {
  cms: null,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setCmsData: (state, action: PayloadAction<Pick<CommonState, 'cms'>>) => {
      state.cms = action.payload.cms;
    },
  },
});

export const {setCmsData} = commonSlice.actions;

export const getCms = (state: RootState) => state.common.cms;

export default commonSlice.reducer;
