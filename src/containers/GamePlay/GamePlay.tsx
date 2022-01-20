import React, {
  memo,
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
} from 'react';
import { Button } from '@components';
import { ViewButton } from '@components/Button';
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
    if (canvasBgRef.current && canvasMarioRef.current) {
      // @ts-ignore
      const core = new Core(canvasBgRef.current, canvasMarioRef.current);
      core.init();
    }
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
      <div className={styles.button}>
        <Button
          title={isFull ? 'Свернуть' : 'Развернуть'}
          type="button"
          view={ViewButton.transparent}
          onClick={handleScreen}
        />
      </div>
      <canvas
        style={{ display: 'block', position: 'absolute', margin: '0 auto' }}
        ref={canvasBgRef}
        width="1280"
        height="640"
        id="background"
      />
      <canvas
        style={{ display: 'block', position: 'absolute', margin: '0 auto' }}
        ref={canvasMarioRef}
        width="1280"
        height="640"
        id="mario"
      />
    </div>
  );
});
