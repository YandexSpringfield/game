import React, {
  memo,
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
} from 'react';
import { Button, Loading, ViewButton } from '@components';
import { ElementWithFullscreen } from '@types';
import {
  activateFullscreen,
  deactivateFullscreen,
  getFullscreenElement,
} from '@utils/utils';
import { Core, MODAL } from '@core';
import { eventBus } from '@core/EventBus';
import { EndGameModal } from './EndGameModal';

import styles from './styles.module.scss';

export const GamePlay = memo(() => {
  const [isFull, setIsFull] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEndGameModalOpen, setIsEndGameModalOpen] = useState(false);
  const [gameStatus, setGameStatus] = useState({});

  const canvasBgRef = useRef<HTMLCanvasElement | null>(null);
  const canvasMarioRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  let core;

  useEffect(() => {
    document.addEventListener('fullscreenchange', () => {
      const fullScreenElement = getFullscreenElement(document);

      if (fullScreenElement) {
        setIsFull(true);
      } else {
        setIsFull(false);
      }
    });
  }, [document]);

  useLayoutEffect(() => {
    setTimeout(() => {
      setLoading(false);
      if (canvasBgRef.current && canvasMarioRef.current) {
        core = new Core(canvasBgRef.current, canvasMarioRef.current);
        eventBus.on(MODAL, (status, score) => {
          setGameStatus({ status, score });
          setIsEndGameModalOpen(true);
        });
      }
    }, 500);
    return () => {
      if (core instanceof Core) {
        core.level.destroy();
      }
    };
  }, []);

  const handleScreen = () => {
    if (isFull) {
      setIsFull(false);
      deactivateFullscreen();
    } else {
      setIsFull(true);
      activateFullscreen(containerRef.current as ElementWithFullscreen);
    }
  };

  return (
    <div className={styles.container} ref={containerRef}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.button}>
            <Button
              title={isFull ? 'Свернуть' : 'Развернуть'}
              type="button"
              view={ViewButton.transparent}
              onClick={handleScreen}
            />
          </div>
          <canvas
            className={styles.canvas}
            ref={canvasBgRef}
            width="1280"
            height="480"
            id="background"
          />
          <canvas
            className={styles.canvas}
            ref={canvasMarioRef}
            width="1280"
            height="480"
            id="mario"
          />
          <EndGameModal
            gameStatus={gameStatus}
            isOpen={isEndGameModalOpen}
            onClose={() => setIsEndGameModalOpen(false)}
          />
        </>
      )}
    </div>
  );
});
