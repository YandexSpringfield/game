/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import InfoIcon from '@/assets/images/info.svg';
import CodeIcon from '@/assets/images/code.svg';
import styles from './styles.module.scss';
const GameDescription = (React.createElement("div", { className: styles.modalContent },
    React.createElement("p", null, "\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C \u0432\u043E \u0432\u0441\u0435\u043B\u0435\u043D\u043D\u0443\u044E \u041C\u0430\u0440\u0438\u043E. \u0418\u0433\u0440\u0430 \u00ABSuper Mario\u00BB \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0430\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u044B\u043C \u0430\u043D\u0430\u043B\u043E\u0433\u043E\u043C \u043B\u0435\u0433\u0435\u043D\u0434\u0430\u0440\u043D\u043E\u0439 \u043E\u0434\u043D\u043E\u0438\u043C\u0435\u043D\u043D\u043E\u0439 \u0438\u0433\u0440\u044B \u0432\u0440\u0435\u043C\u0435\u043D \u043A\u043E\u043D\u0441\u043E\u043B\u0435\u0439 \u0414\u0435\u043D\u0434\u0438. \u0418\u043C\u0435\u043D\u043D\u043E \u0441\u0435\u0439\u0447\u0430\u0441 \u0432\u044B \u0441\u043C\u043E\u0436\u0435\u0442\u0435 \u043F\u043E\u0433\u0440\u0443\u0437\u0438\u0442\u044C\u0441\u044F \u0432 \u0430\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0443 \u043F\u043E\u043B\u043D\u043E\u0439 \u043D\u043E\u0441\u0442\u0430\u043B\u044C\u0433\u0438\u0438."),
    React.createElement("br", null),
    React.createElement("p", null, "\u0414\u043B\u044F \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0435\u043C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043A\u043B\u0430\u0432\u0438\u0430\u0442\u0443\u0440\u0443, \u0430 \u0438\u043C\u0435\u043D\u043D\u043E:"),
    React.createElement("ul", null,
        React.createElement("li", null, "\u00ABArrowLeft\u00BB - \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0435 \u043D\u0430\u0437\u0430\u0434;"),
        React.createElement("li", null, "\u00ABArrowRight\u00BB - \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0435 \u0432\u043F\u0435\u0440\u0435\u0434;"),
        React.createElement("li", null, "\u00ABSpace\u00BB - \u043F\u0440\u044B\u0436\u043E\u043A \u0432\u0432\u0435\u0440\u0445.")),
    React.createElement("br", null),
    React.createElement("p", null, "\u0412\u0430\u0440\u0438\u0430\u043D\u0442\u044B \u043F\u0440\u043E\u0438\u0433\u0440\u044B\u0448\u0430:"),
    React.createElement("ul", null,
        React.createElement("li", null, "\u041F\u0430\u0434\u0435\u043D\u0438\u0435;"),
        React.createElement("li", null, "\u0421\u0442\u043E\u043B\u043A\u043D\u043E\u0432\u0435\u043D\u0438\u0435 \u0441 \u043F\u0440\u043E\u0442\u0438\u0432\u043D\u0438\u043A\u043E\u043C."))));
const ScoreDescription = (React.createElement("div", { className: styles.modalContent },
    "\u0412 \u00AB\u0444\u043E\u0440\u043C\u0443\u043B\u0435 \u0443\u0441\u043F\u0435\u0445\u0430\u00BB \u0443\u0447\u0430\u0441\u0442\u0432\u0443\u044E\u0442:",
    React.createElement("ul", null,
        React.createElement("li", null, "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0441\u043E\u0431\u0440\u0430\u043D\u043D\u044B\u0445 \u043C\u043E\u043D\u0435\u0442;"),
        React.createElement("li", null, "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043F\u0440\u043E\u0439\u0434\u0435\u043D\u043D\u044B\u0445 \u0443\u0440\u043E\u0432\u043D\u0435\u0439;"),
        React.createElement("li", null, "\u0412\u0440\u0435\u043C\u044F.")),
    React.createElement("br", null),
    React.createElement("code", null, "score = (10 * x * y)/t"),
    ", \u0433\u0434\u0435:",
    React.createElement("br", null),
    "10 - \u043E\u0447\u043A\u0438 \u0437\u0430 \u043A\u0430\u0436\u0434\u044B\u0439 \u043F\u0440\u043E\u0439\u0434\u0435\u043D\u043D\u044B\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C;",
    React.createElement("br", null),
    "x - \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043F\u0440\u043E\u0439\u0434\u0435\u043D\u043D\u044B\u0445 \u0443\u0440\u043E\u0432\u043D\u0435\u0439;",
    React.createElement("br", null),
    "y - \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0441\u043E\u0431\u0440\u0430\u043D\u043D\u044B\u0445 \u043C\u043E\u043D\u0435\u0442;",
    React.createElement("br", null),
    "t - \u0432\u0440\u0435\u043C\u044F."));
export const articles = [
    {
        id: 1,
        title: 'Об игре',
        description: 'Краткое описание игры',
        icon: React.createElement(InfoIcon, { className: styles.articleIcon }),
        content: GameDescription,
    },
    {
        id: 2,
        title: 'Правила начисления очков',
        description: 'Познакомьтесь с тем, как формируется таблица лидеров',
        icon: React.createElement(CodeIcon, { className: styles.articleIcon }),
        content: ScoreDescription,
    },
];
