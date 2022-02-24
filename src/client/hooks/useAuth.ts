import { useState } from 'react';
import { fetchUserProfile, useAppDispatch } from '@store';
import { authError, registrationError } from '@appConstants';
import { useNavigate } from 'react-router-dom';
import { authAPI, BASE_YA_URL } from '../../api';

export const useAuth = () => {
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signIn = (data, link) => {
    authAPI
      .signIn(data)
      .then(() => {
        setError('');
        dispatch(fetchUserProfile());
      })
      .then(() => {
        navigate(link);
      })
      .catch(() => setError(authError));
  };

  const signUp = (data, link) => {
    authAPI
      .signUp(data)
      .then(() => {
        setError('');
        dispatch(fetchUserProfile());
      })
      .then(() => {
        navigate(link);
      })
      .catch(() => setError(registrationError));
  };

  const logout = (link) => {
    authAPI.logout().then(() => {
      navigate(link);
    });
  };

  const yaGetId = () => {
    const URI = window.location.origin;

    authAPI.yaGetId({ params: { redirect_uri: URI } }).then(({ data }) => {
      const service_id = `client_id=${data.service_id}`;
      const redirect_uri = `redirect_uri=${URI}`;
      window.location.href = `${BASE_YA_URL}/authorize?response_type=code&${service_id}&${redirect_uri}`;
    });
  };

  const yaSingIn = (code, link) => {
    const data = { code, redirect_uri: window.location.origin };
    authAPI.yaSingIn(data).then(() => {
      navigate(link);
    });
  };

  return {
    error,
    signIn,
    signUp,
    logout,
    yaGetId,
    yaSingIn,
  };
};
