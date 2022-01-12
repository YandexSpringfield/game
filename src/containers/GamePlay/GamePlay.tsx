import React, { memo, useLayoutEffect, useRef } from 'react';
import { Core } from '.';

export const GamePlay = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useLayoutEffect(() => {
    if (canvasRef.current) {
      const core = new Core(canvasRef.current);
      core.init();
    }
  }, []);

  return (
    <canvas
      style={{ display: 'block', margin: '0 auto' }}
      ref={canvasRef}
      width="1280"
      height="640"
    />
  );
});
