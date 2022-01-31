import React, { useEffect } from 'react';
import { TableRow, Loading } from '@components';
import { useAppDispatch, fetchLeaderboard, useLeaderboardSelector, } from '@store';
import { RequestStatus } from '@types';
import styles from './Leaderboard.module.scss';
export const Leaderboard = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchLeaderboard());
    }, []);
    const { data, requestStatus } = useLeaderboardSelector();
    if (requestStatus === RequestStatus.REQUEST) {
        React.createElement(Loading, null);
    }
    return (React.createElement("div", { className: styles.table },
        React.createElement("div", { className: styles.header },
            React.createElement("div", null, "\u2116"),
            React.createElement("div", null, "\u0418\u0433\u0440\u043E\u043A"),
            React.createElement("div", null, "\u0413\u043E\u0440\u043E\u0434"),
            React.createElement("div", null, "\u0421\u0447\u0435\u0442")), data === null || data === void 0 ? void 0 :
        data.map(({ data }, index) => (React.createElement(TableRow, { key: `${data.score}-${data === null || data === void 0 ? void 0 : data.login}-${data.name}`, ...data, index: index + 1 })))));
};
