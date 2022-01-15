import React, { memo, useLayoutEffect, useRef } from 'react';
import { Core } from '.';

export const GamePlay = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useLayoutEffect(() => {
    const canvasBg = document.querySelector('#background') as HTMLCanvasElement;
    const canvasMario = document.querySelector('#mario') as HTMLCanvasElement;

    if (canvasRef.current) {
      const core = new Core(canvasBg, canvasMario);
      core.init();
    }
  }, []);

  return (
    <>
      <canvas
        style={{ display: 'block', position: 'absolute', margin: '0 auto' }}
        ref={canvasRef}
        width="1280"
        height="640"
        id="background"
      />
      <canvas
        style={{ display: 'block', position: 'absolute', margin: '0 auto' }}
        ref={canvasRef}
        width="1280"
        height="640"
        id="mario"
      />
    </>
  );
});
