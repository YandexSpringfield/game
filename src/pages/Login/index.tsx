import React, { useEffect } from 'react';
import { Title } from '@components';
import { useAppDispatch } from '@store';
import { fetchUserProfile, useUserSelector } from '@store/user';

/**
 * Test dispatch and useUserSelector, after integration with api should be removed
 */
export const Login = () => {
  const dispatch = useAppDispatch();
  const { email } = useUserSelector();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);

  return <Title>Hello world from Login page {email}</Title>;
};
