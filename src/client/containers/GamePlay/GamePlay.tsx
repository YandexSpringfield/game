import React, {
  memo,
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
} from 'react';
import { Loading } from '@components';
import { ElementWithFullscreen } from '@types';
import {
  activateFullscreen,
  deactivateFullscreen,
  getFullscreenElement,
} from '@utils/utils';
import { Core, MODAL } from '@game-core';
import { eventBus } from '@game-core/EventBus';
import { IoContract, IoExpand } from 'react-icons/io5';
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

  const checkWindowSize = () => {
    if (canvasBgRef.current && canvasMarioRef.current) {
      if (window.innerWidth < 911) {
        canvasBgRef.current.style.width = '100%';
        canvasMarioRef.current.style.width = '100%';
        canvasBgRef.current.style.height = 'fit-content';
        canvasMarioRef.current.style.height = 'fit-content';
      } else {
        canvasBgRef.current.style.width = 'fit-content';
        canvasMarioRef.current.style.width = 'fit-content';
        canvasBgRef.current.style.height = '100%';
        canvasMarioRef.current.style.height = '100%';
      }
    }
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      checkWindowSize();
    });

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
          if (getFullscreenElement(document)) {
            deactivateFullscreen();
          }
          setGameStatus({ status, score });
          setIsEndGameModalOpen(true);
        });

        checkWindowSize();
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
          {/* eslint-disable-next-line */}
          <div className={styles.button} onClick={handleScreen}>
            {isFull ? <IoContract /> : <IoExpand />}
          </div>
          <div className={styles.canvasContainer}>
            <canvas
              className={styles.canvas}
              ref={canvasBgRef}
              width="864"
              height="480"
              id="background"
            />
            <canvas
              className={styles.canvas}
              ref={canvasMarioRef}
              width="864"
              height="480"
              id="mario"
            />
          </div>
        </>
      )}
      <EndGameModal
        gameStatus={gameStatus}
        isOpen={isEndGameModalOpen}
        onClose={() => setIsEndGameModalOpen(false)}
      />
    </div>
  );
});
