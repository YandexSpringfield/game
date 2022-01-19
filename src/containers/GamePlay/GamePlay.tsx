import React, { memo, useLayoutEffect, useRef, useState } from 'react';
import { Loading } from '@components';
import { Core } from '.';

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
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 'calc(100% - 70px)',
      }}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
});
