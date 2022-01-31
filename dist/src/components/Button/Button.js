var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { ViewButton } from '@components/Button/types';
import cn from 'classnames';
import styles from './Button.module.scss';
export const Button = (_a) => {
    var { title, view, type } = _a, rest = __rest(_a, ["title", "view", "type"]);
    return (React.createElement("button", Object.assign({ className: cn(styles.button, { [styles.button__main]: view === ViewButton.main }, { [styles.button__secondary]: view === ViewButton.secondary }, { [styles.button__exit]: view === ViewButton.exit }, { [styles.button__transparent]: view === ViewButton.transparent }), type: type }, rest), title));
};
