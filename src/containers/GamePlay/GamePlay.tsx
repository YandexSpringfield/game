import React, { memo, useLayoutEffect, useRef } from 'react';
import { Core } from '.';

export const GamePlay = memo(() => {
  const canvasBgRef = useRef<HTMLCanvasElement | null>(null);
  const canvasMarioRef = useRef<HTMLCanvasElement | null>(null);

  useLayoutEffect(() => {
    if (canvasBgRef.current && canvasMarioRef.current) {
      const core = new Core(canvasBgRef.current, canvasMarioRef.current);
      core.init();
    }
  }, []);

  return (
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
  );
});
