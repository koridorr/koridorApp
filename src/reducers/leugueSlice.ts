import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../app/store';

export interface arrayState {
  arrayData: any[];
}

const initialState: arrayState = {
  arrayData: [],
};
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setArrayData: (state, action: PayloadAction<any[]>) => {
      state.arrayData = action.payload;
    },
  },
});

export const {setArrayData} = dataSlice.actions;
// export const getLeagueMatches = (state: RootState) => state.leuges.arrayData;
export default dataSlice.reducer;
