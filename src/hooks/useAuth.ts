import { useState } from 'react';
import { fetchUserProfile, useAppDispatch } from '@store';
import { authAPI } from '@api';
import { authError, registrationError, routes } from '@appConstants';
import { useNavigate } from 'react-router-dom';

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
  }

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
  }

  const logout = (link) => {
    authAPI.logout().then(() => {
      navigate(link);
    });
  }

  return {
    error,
    signIn,
    signUp,
    logout
  }
}
