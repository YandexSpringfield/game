import React from 'react';
import cn from 'classnames';
import { NavLink, Link } from 'react-router-dom';
import { routes } from '@appConstants';
import { Logo, Avatar } from '@components';
import defaultLogo from '@/assets/images/default-logo.png';

import styles from './styles.module.scss';

const navs = [
  {
    label: 'Game',
    to: routes.game,
  },
  {
    label: 'Leaderboard',
    to: routes.leaderboard,
  },
  {
    label: 'Forum',
    to: routes.forum,
  },
];

export const Header = () => {
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
        <Avatar src={defaultLogo} />
      </Link>
    </header>
  );
};
