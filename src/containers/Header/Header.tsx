import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { NavLink, Link } from 'react-router-dom';
import { resourcesUrl, routes } from '@appConstants';
import { Logo, Avatar } from '@components';
import { fetchUserProfile, useAppDispatch, useUserSelector } from '@store';
import { IoMoonSharp, IoSunnyOutline } from 'react-icons/io5';
import defaultAvatar from '@/assets/images/default-avatar.png';

import styles from './styles.module.scss';

const navs = [
  {
    label: 'Игра',
    to: routes.game.root,
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
  const [theme, setTheme] = useState('light');
  const dispatch = useAppDispatch();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);

  const user = useUserSelector();

  useEffect(() => {
    setAvatar(user.avatar);
  }, [user.avatar]);

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
      <span className={styles.toggle} onClick={toggleTheme}>
        {theme === 'light' ? <IoSunnyOutline /> : <IoMoonSharp />}
      </span>
      <Link to={routes.profile} className={styles.avatar}>
        <Avatar src={avatar ? resourcesUrl + avatar : defaultAvatar} />
      </Link>
    </header>
  );
};
