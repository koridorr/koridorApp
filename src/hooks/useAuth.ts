import {useMemo} from 'react';
import {useAppSelector} from './store';
import {getCurrentUser} from '../reducers/authSlice';

function useAuth() {
  const user = useAppSelector(getCurrentUser);

  return useMemo(() => user, [user]);
}

export default useAuth;
