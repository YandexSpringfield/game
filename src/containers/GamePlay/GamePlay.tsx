import React, { memo, useLayoutEffect, useRef, useState } from 'react';
import { Button } from '@components';
import { ViewButton } from '@components/Button';
import { DocumentElementWithFullscreen } from '@types';
import { activateFullscreen, deactivateFullscreen } from '@utils/utils';
import { Core } from '.';
import styles from './styles.module.scss';

export const GamePlay = memo(() => {
  const [isFull, setIsFull] = useState(false);
  const canvasBgRef = useRef<HTMLCanvasElement | null>(null);
  const canvasMarioRef = useRef<HTMLCanvasElement | null>(null);

  useLayoutEffect(() => {
    if (canvasBgRef.current && canvasMarioRef.current) {
      // @ts-ignore
      const core = new Core(canvasBgRef.current, canvasMarioRef.current);
      core.init();
    }
  }, []);

  const onFullScreen = () => {
    const container = document.getElementById(
      'container',
    ) as DocumentElementWithFullscreen;
    setIsFull(true);
    activateFullscreen(container);
  };

  const onHalfScreen = () => {
    setIsFull(false);
    deactivateFullscreen();
  };

  return (
    <div className={styles.container} id="container">
      <div className={styles.button}>
        <Button
          title={isFull ? 'Свернуть' : 'Развернуть'}
          type="button"
          view={ViewButton.transparent}
          onClick={isFull ? onHalfScreen : onFullScreen}
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
