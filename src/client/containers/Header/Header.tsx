import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { NavLink, Link } from 'react-router-dom';
import { resourcesUrl, routes } from '@appConstants';
import { Logo, Avatar } from '@components';
import {
  fetchUserProfile,
  updateUserThemeThunk,
  useAppDispatch,
  userSlice,
  useUserSelector,
} from '@store';
import { initialState } from '@store/user/userSlice';
import { RequestStatus, Theme } from '@types';
import defaultAvatar from '@assets/images/default-avatar.png';
import { IoMoonSharp, IoSunnyOutline } from 'react-icons/io5';

import styles from './styles.module.scss';

const navs = [
  {
    label: 'Игра',
    to: routes.preview,
  },
  {
    label: 'Таблица лидеров',
    to: routes.leaderboard,
  },
  {
    label: 'Форум',
    to: routes.forum,
  },
];

export const Header = () => {
  const [avatar, setAvatar] = useState('');
  const dispatch = useAppDispatch();
  const user = useUserSelector();

  useEffect(() => {
    if (user.requestStatus !== RequestStatus.SUCCESS) {
      dispatch(fetchUserProfile());
    }

    return () => {
      userSlice.actions.setState(initialState);
    };
  }, []);

  useEffect(() => {
    setAvatar(user.avatar);
  }, [user.avatar]);

  useEffect(() => {
    document.body.setAttribute('data-theme', user.theme);
  }, [user.theme]);

  const handleUpdateTheme = useCallback(async () => {
    await dispatch(
      updateUserThemeThunk(
        user.theme === Theme.Light ? Theme.Dark : Theme.Light,
      ),
    );
  }, [user.theme]);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo width="40" height="46" />
      </div>
      <nav className={styles.navs}>
        {navs.map((link) => (
          <NavLink
            className={({ isActive }) =>
              cn(styles.link, isActive && styles.active)
            }
            key={link.label}
            to={link.to}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      {/* eslint-disable-next-line */}
      <span className={styles.toggle} onClick={handleUpdateTheme}>
        {user.theme === Theme.Light ? <IoSunnyOutline /> : <IoMoonSharp />}
      </span>
      <Link to={routes.profile} className={styles.avatar}>
        <Avatar src={avatar ? resourcesUrl + avatar : defaultAvatar} />
      </Link>
    </header>
  );
};
