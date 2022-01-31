import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Logo, ViewButton } from '@components';
import { useAppDispatch, addToLeaderboard, useLeaderboardSelector, } from '@store';
import { routes } from '@appConstants';
import { RequestStatus } from '@types';
import styles from './styles.module.scss';
export const EndGameModal = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();
    const { requestStatus } = useLeaderboardSelector();
    useEffect(() => {
        dispatch(addToLeaderboard({
            location: 'Москва',
            score: 10999, // TODO нужно пробрасывать количество очков
        }));
    }, []);
    const navigate = useNavigate();
    const goToNewGame = () => navigate(routes.game.play);
    const goToLeaderboard = () => navigate(routes.leaderboard);
    const onModalClose = () => {
        onClose();
        goToNewGame();
    };
    const isDisabled = requestStatus === RequestStatus.REQUEST;
    return (React.createElement(Modal, { isOpen: isOpen, className: styles.modal, onClose: onModalClose },
        React.createElement("h2", { className: styles.title }, "\u0412\u044B \u043F\u0440\u043E\u0438\u0433\u0440\u0430\u043B\u0438!"),
        React.createElement("div", { className: styles.logo },
            React.createElement(Logo, { width: "50", height: "50" })),
        React.createElement("div", { className: styles.buttons },
            React.createElement(Button, { title: "\u041D\u0430\u0447\u0430\u0442\u044C \u0437\u0430\u043D\u043E\u0432\u043E", type: "button", view: ViewButton.main, disabled: isDisabled, onClick: goToNewGame }),
            React.createElement(Button, { title: "Leaderboard", type: "button", view: ViewButton.secondary, disabled: isDisabled, onClick: goToLeaderboard }))));
};
