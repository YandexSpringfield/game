import React from 'react';
import { Avatar } from '@components';
import { resourcesUrl } from '@appConstants';
import defaultAvatar from '../../assets/images/default-avatar.png';
import styles from './TableRow.module.scss';
export const TableRow = ({ index, avatar, login, name, city, score, }) => {
    const itemAvatar = resourcesUrl + avatar;
    return (React.createElement("div", { className: styles.row },
        React.createElement("div", null, index),
        React.createElement("div", { className: styles.player },
            React.createElement(Avatar, { src: avatar ? itemAvatar : defaultAvatar }),
            login || name || 'unknown'),
        React.createElement("div", null, city || 'unknown'),
        React.createElement("div", null, score)));
};
