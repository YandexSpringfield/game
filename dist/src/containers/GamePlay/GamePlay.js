import React, { memo, useLayoutEffect, useRef, useState, useEffect, } from 'react';
import { Button, Loading, ViewButton } from '@components';
import { activateFullscreen, deactivateFullscreen, getFullscreenElement, } from '@utils/utils';
import { EndGameModal } from './EndGameModal';
import { Core } from '.';
import styles from './styles.module.scss';
// TODO где то здесь нужно ловить событие окончании игры и показывать модалку об окончании игры
export const GamePlay = memo(() => {
    const [isFull, setIsFull] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isEndGameModalOpen, setIsEndGameModalOpen] = useState(false);
    const canvasBgRef = useRef(null);
    const canvasMarioRef = useRef(null);
    const containerRef = useRef(null);
    let core;
    useEffect(() => {
        document.addEventListener('fullscreenchange', () => {
            const fullScreenElement = getFullscreenElement(document);
            if (fullScreenElement) {
                setIsFull(true);
            }
            else {
                setIsFull(false);
            }
        });
    }, [document]);
    useLayoutEffect(() => {
        setTimeout(() => {
            setLoading(false);
            if (canvasBgRef.current && canvasMarioRef.current) {
                core = new Core(canvasBgRef.current, canvasMarioRef.current);
            }
        }, 500);
        return () => {
            if (core instanceof Core) {
                core.mario.keyboardRemove();
                core.timer.stop();
            }
        };
    }, []);
    const handleScreen = () => {
        if (isFull) {
            setIsFull(false);
            deactivateFullscreen();
        }
        else {
            setIsFull(true);
            activateFullscreen(containerRef.current);
        }
    };
    return (React.createElement("div", { className: styles.container, ref: containerRef }, loading ? (React.createElement(Loading, null)) : (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.button },
            React.createElement(Button, { title: isFull ? 'Свернуть' : 'Развернуть', type: "button", view: ViewButton.transparent, onClick: handleScreen })),
        React.createElement("canvas", { className: styles.canvas, ref: canvasBgRef, width: "1280", height: "480", id: "background" }),
        React.createElement("canvas", { className: styles.canvas, ref: canvasMarioRef, width: "1280", height: "480", id: "mario" }),
        React.createElement(EndGameModal, { isOpen: isEndGameModalOpen, onClose: () => setIsEndGameModalOpen(false) })))));
});
