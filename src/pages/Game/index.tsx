import React, { useRef, memo, useLayoutEffect } from 'react';
import { Core } from '@pages/Game/utils';

export const Game = memo(
  () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useLayoutEffect(() => {
      if (canvasRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const core = new Core(canvasRef.current);
        core.init();
      }
    }, []);

    return <canvas ref={canvasRef} width="640" height="640" />;
  },
  () => true,
);
