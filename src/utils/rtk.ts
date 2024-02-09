import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {stringify} from 'query-string';
import type {RootState} from '../app/store';
import {API_URL} from '../helpers/constants/urls';
import {generateEncryptedKey} from '../widgets/CryptoPrivacy';
import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: async (headers, {getState}) => {
    const deviceId = await DeviceInfo.getUniqueId();
    const {token} = (getState() as RootState).auth;

    const deviceType = Platform.OS === 'ios' ? 'ios' : 'android';
    headers.set('deviceType', deviceType);
    headers.set('deviceId', deviceId);
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
  paramsSerializer: rec => {
    return stringify(rec, {arrayFormat: 'bracket', encode: true});
  },
});

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  return result;
};

const emptySplitApi = createApi({
  baseQuery: baseQueryWithAuth,
  tagTypes: ['UNAUTHORIZED', 'UNKNOWN_ERROR'],
  endpoints: () => ({}),
});

export default emptySplitApi;
