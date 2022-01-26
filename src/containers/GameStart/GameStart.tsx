import React, { useState } from 'react';
import { Content, Card, Modal } from '@components';
import { Button, ViewButton } from '@components/Button';
import { useNavigate } from 'react-router-dom';
import { routes, PUBLIC_REPO_URL } from '@appConstants';
import { articles, Article } from '.';
import GithubIcon from '@/assets/images/github.svg';

import styles from './styles.module.scss';

export const GameStart = () => {
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);

  return (
    <Content
      title="Привет 👋"
      /* eslint-disable-next-line max-len */
      description="Представляем игру “Super mario”. Игра является абсолютным аналогом легендарной одноименной игры времен консолей Денди и сейчас вы сможете погрузиться в атмосферу полной ностальгии."
    >
      <Button
        view={ViewButton.main}
        title="Начать игру"
        onClick={() => navigate(routes.game.play)}
      />
      <div className={styles.content}>
        <div className={styles.items}>
          {articles.map((article) => (
            <Card
              key={article.id}
              className={styles.article}
              onClick={() => setArticle(article)}
            >
              {article.icon}
              <div>
                <h4 className={styles.articleTitle}>{article.title}</h4>
                <p className={styles.articleDescription}>
                  {article.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
        <Card className={styles.community}>
          <h3 className={styles.communityTitle}>
            Присоединяйтесь к сообществу
          </h3>
          <p className={styles.communityDescription}>
            Обсуждайте игру вместе и делитесь своими рекордами и впечатлениями.
          </p>
          <a
            href={PUBLIC_REPO_URL}
            target="_blank"
            className={styles.communityLink}
            rel="noreferrer"
          >
            <GithubIcon className={styles.communityLinkIcon} />
            Github
          </a>
        </Card>

        <Modal
          isOpen={Boolean(article?.id)}
          className={styles.modal}
          onClose={() => setArticle(null)}
        >
          {article?.content}
        </Modal>
      </div>
    </Content>
  );
};
