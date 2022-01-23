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
import { Core } from '.';

import styles from './styles.module.scss';

export const GamePlay = memo(() => {
  const [isFull, setIsFull] = useState(false);
  const [loading, setLoading] = useState(true);
  const canvasBgRef = useRef<HTMLCanvasElement | null>(null);
  const canvasMarioRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

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
        const core = new Core(canvasBgRef.current, canvasMarioRef.current);
        core.init();
      }
    }, 1000);
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
        </>
      )}
    </div>
  );
});
