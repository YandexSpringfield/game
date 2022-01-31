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
import cn from 'classnames';
import styles from './Input.module.scss';
export const Input = (_a) => {
    var { name, label, error } = _a, rest = __rest(_a, ["name", "label", "error"]);
    return (React.createElement("div", { className: styles.input__wrapper },
        React.createElement("label", { className: styles.input__label, htmlFor: name }, label),
        React.createElement("input", Object.assign({ className: cn(styles.input__field, { [styles.error]: Boolean(error) }), name: name, id: name }, rest)),
        error ? React.createElement("span", { className: styles.error__field }, error) : null));
};
