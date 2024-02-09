import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../types/User';
import {removeKeyFromStorage} from '../helpers/AsyncStorage';
import {STORAGE_KEYS} from '../helpers/constants';
import {RootState} from '../app/store';

export interface AuthState {
  user: User | null;
  token: string | null;
  socket: WebSocket | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  socket: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth: state => {
      removeKeyFromStorage(STORAGE_KEYS.token);
      state.user = null;
      state.token = null;
    },
    setCredentials: (
      state,
      action: PayloadAction<Pick<AuthState, 'user' | 'token'>>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setSocket: (state, action: PayloadAction<WebSocket>) => {
      state.socket = action.payload;
    },
  },
});

export const {resetAuth, setCredentials, setSocket} = authSlice.actions;

export const getCurrentUser = (state: RootState) => state.auth.user;
export const getToken = (state: RootState) => state.auth.token;
// export const getSocket = (state: RootState) => state.auth.socket;

export default authSlice.reducer;
