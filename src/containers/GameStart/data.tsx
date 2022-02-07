/* eslint-disable react/no-unescaped-entities */
import React, { ReactNode } from 'react';
import InfoIcon from '@/assets/images/info.svg';
import CodeIcon from '@/assets/images/code.svg';

import styles from './styles.module.scss';

export type Article = {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
  content: ReactNode;
};

const GameDescription = (
  <div className={styles.modalContent}>
    <p>
      Добро пожаловать во вселенную Марио. Игра «Super Mario» является
      абсолютным аналогом легендарной одноименной игры времен консолей Денди.
      Именно сейчас вы сможете погрузиться в атмосферу полной ностальгии.
    </p>
    <br />
    <p>Для управления персонажем используйте клавиатуру, а именно:</p>
    <ul>
      <li>«ArrowLeft» - движение назад;</li>
      <li>«ArrowRight» - движение вперед;</li>
      <li>«Space» - прыжок вверх.</li>
    </ul>
    <br />
    <p>Варианты проигрыша:</p>
    <ul>
      <li>Падение;</li>
      <li>Столкновение с противником.</li>
    </ul>
  </div>
);
const ScoreDescription = (
  <div className={styles.modalContent}>
    В «формуле успеха» участвуют:
    <ul>
      <li>Количество собранных монет;</li>
      <li>Количество пройденных уровней;</li>
      <li>Время.</li>
    </ul>
    <br />
    <code>score = (10 * x * y)/t</code>, где:
    <br />
    10 - очки за каждый пройденный уровень;
    <br />
    x - количество пройденных уровней;
    <br />
    y - количество собранных монет;
    <br />t - время.
  </div>
);

export const articles: Article[] = [
  {
    id: 1,
    title: 'Об игре',
    description: 'Краткое описание игры',
    icon: <InfoIcon className={styles.articleIcon} />,
    content: GameDescription,
  },
  {
    id: 2,
    title: 'Правила начисления очков',
    description: 'Познакомьтесь с тем, как формируется таблица лидеров',
    icon: <CodeIcon className={styles.articleIcon} />,
    content: ScoreDescription,
  },
];
