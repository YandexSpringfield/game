import React, { useState } from 'react';
import { Content, Card, Modal } from '@components';
import { Button, ViewButton } from '@components/Button';
import { useNavigate } from 'react-router-dom';
import { routes, PUBLIC_REPO_URL } from '@appConstants';
import { articles } from '.';
import GithubIcon from '@/assets/images/github.svg';
import styles from './styles.module.scss';
export const GameStart = () => {
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    return (React.createElement(Content, { title: "\u041F\u0440\u0438\u0432\u0435\u0442 \uD83D\uDC4B", 
        /* eslint-disable-next-line max-len */
        description: "\u041F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u043C \u0438\u0433\u0440\u0443 \u00ABSuper Mario\u00BB. \u0418\u0433\u0440\u0430 \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0430\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u044B\u043C \u0430\u043D\u0430\u043B\u043E\u0433\u043E\u043C \u043B\u0435\u0433\u0435\u043D\u0434\u0430\u0440\u043D\u043E\u0439 \u043E\u0434\u043D\u043E\u0438\u043C\u0435\u043D\u043D\u043E\u0439 \u0438\u0433\u0440\u044B \u0432\u0440\u0435\u043C\u0435\u043D \u043A\u043E\u043D\u0441\u043E\u043B\u0435\u0439 \u0414\u0435\u043D\u0434\u0438 \u0438 \u0441\u0435\u0439\u0447\u0430\u0441 \u0432\u044B \u0441\u043C\u043E\u0436\u0435\u0442\u0435 \u043F\u043E\u0433\u0440\u0443\u0437\u0438\u0442\u044C\u0441\u044F \u0432 \u0430\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0443 \u043F\u043E\u043B\u043D\u043E\u0439 \u043D\u043E\u0441\u0442\u0430\u043B\u044C\u0433\u0438\u0438." },
        React.createElement(Button, { view: ViewButton.main, title: "\u041D\u0430\u0447\u0430\u0442\u044C \u0438\u0433\u0440\u0443", onClick: () => navigate(routes.game.play) }),
        React.createElement("div", { className: styles.content },
            React.createElement("div", { className: styles.items }, articles.map((article) => (React.createElement(Card, { key: article.id, className: styles.article, onClick: () => setArticle(article) },
                article.icon,
                React.createElement("div", null,
                    React.createElement("h4", { className: styles.articleTitle }, article.title),
                    React.createElement("p", { className: styles.articleDescription }, article.description)))))),
            React.createElement(Card, { className: styles.community },
                React.createElement("h3", { className: styles.communityTitle }, "\u041F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u044F\u0439\u0442\u0435\u0441\u044C \u043A \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0443"),
                React.createElement("p", { className: styles.communityDescription }, "\u041E\u0431\u0441\u0443\u0436\u0434\u0430\u0439\u0442\u0435 \u0438\u0433\u0440\u0443 \u0432\u043C\u0435\u0441\u0442\u0435 \u0438 \u0434\u0435\u043B\u0438\u0442\u0435\u0441\u044C \u0441\u0432\u043E\u0438\u043C\u0438 \u0440\u0435\u043A\u043E\u0440\u0434\u0430\u043C\u0438 \u0438 \u0432\u043F\u0435\u0447\u0430\u0442\u043B\u0435\u043D\u0438\u044F\u043C\u0438."),
                React.createElement("a", { href: PUBLIC_REPO_URL, target: "_blank", className: styles.communityLink, rel: "noreferrer" },
                    React.createElement(GithubIcon, { className: styles.communityLinkIcon }),
                    "Github")),
            React.createElement(Modal, { isOpen: Boolean(article === null || article === void 0 ? void 0 : article.id), className: styles.modal, onClose: () => setArticle(null) }, article === null || article === void 0 ? void 0 : article.content))));
};
