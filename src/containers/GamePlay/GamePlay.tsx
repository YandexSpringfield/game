import React, { memo, useLayoutEffect, useRef, useState } from 'react';
import { Loading } from '@components';
import { Core } from '.';

import styles from './styles.module.scss';

export const GamePlay = memo(() => {
  const [loading, setLoading] = useState(true);
  const canvasBgRef = useRef<HTMLCanvasElement | null>(null);
  const canvasMarioRef = useRef<HTMLCanvasElement | null>(null);

  useLayoutEffect(() => {
    setTimeout(() => {
      setLoading(false);
      if (canvasBgRef.current && canvasMarioRef.current) {
        const core = new Core(canvasBgRef.current, canvasMarioRef.current);
        core.init();
      }
    }, 1000);
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <canvas
            className={styles.canvas}
            ref={canvasBgRef}
            width="1280"
            height="640"
            id="background"
          />
          <canvas
            className={styles.canvas}
            ref={canvasMarioRef}
            width="1280"
            height="640"
            id="mario"
          />
        </>
      )}
    </div>
  );
});
