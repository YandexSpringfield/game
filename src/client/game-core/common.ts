export const loadImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve) => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = url;
  });

export const GAME_STATUS = {
  win: {
    text: 'Вы прошли уровень!',
    button: 'Следующий уровень',
  },
  lost: {
    text: 'Вы проиграли!',
    button: 'Начать заново',
  },
};

export const MODAL = 'MODAL';
export const GAME_END = 'GAME_END';
export const GAME_RESTART = 'GAME_RESTART';
export const GAME_NEXT = 'GAME_NEXT';
