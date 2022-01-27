import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { NavLink, Link } from 'react-router-dom';
import { resourcesUrl, routes } from '@appConstants';
import { Logo, Avatar } from '@components';
import { fetchUserProfile, useAppDispatch, useUserSelector } from '@store';
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
  const dispatch = useAppDispatch();

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
      <Link to={routes.profile} className={styles.avatar}>
        <Avatar src={avatar ? resourcesUrl + avatar : defaultAvatar} />
      </Link>
    </header>
  );
};
