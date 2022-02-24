const font = '20px Roboto';
const fillStyle = '#fff';

export const drawCoinsStatus = (context, canvas, coins: number) => {
  context.clearRect(canvas.width - 300, 30, 150, 30);
  // eslint-disable-next-line
  context.font = font;
  // eslint-disable-next-line
  context.fillStyle = fillStyle;
  context.fillText(`Монеты: ${coins}`, canvas.width - 300, 40);
};

export const drawTimerStatus = (context, canvas, time: number) => {
  context.clearRect(canvas.width - 120, 30, 200, 30);
  // eslint-disable-next-line
  context.font = font;
  // eslint-disable-next-line
  context.fillStyle = fillStyle;
  context.fillText(`Время: ${time}`, canvas.width - 120, 40);
};
