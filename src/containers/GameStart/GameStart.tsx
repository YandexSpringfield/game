import React from 'react';
// import { Link } from 'react-router-dom';
import { Content } from '@components';
import { Button, ViewButton } from '@components/Button';
import { useNavigate } from 'react-router-dom';
import { routes } from '@appConstants';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './styles.module.scss';

export const GameStart = () => {
  const navigate = useNavigate();
  return (
    <Content
      title="Привет 👋"
      /* eslint-disable-next-line max-len */
      description="Представляем игру “Super mario”. Игра является абсолютным аналогом легендарной одноименной игры времен консолей Денди. именно сейчас вы сможете погрузиться в атмосферу полной ностальгии."
    >
      <Button
        view={ViewButton.main}
        title="Начать игру"
        onClick={() => navigate(routes.game.play)}
      />
      {/* <Link to={routes.game.play}>Начать игру</Link> */}
    </Content>
  );
};
