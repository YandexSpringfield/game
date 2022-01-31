import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ViewButton, Form, Input, Logo, Error } from '@components';
import { checkInput } from '@utils/utils';
import { authAPI } from '@api';
import { useAppDispatch, fetchUserProfile } from '@store';
import { authError, routes } from '@appConstants';
import styles from './Login.module.scss';
const initialFields = {
    login: '',
    password: '',
};
export const Login = () => {
    const [fields, setFields] = useState(initialFields);
    const [fieldsError, setFieldsError] = useState(initialFields);
    const [errorAuth, setErrorAuth] = useState('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const onChange = (e) => {
        const { name, value } = e.target;
        setFields(Object.assign(Object.assign({}, fields), { [name]: value }));
    };
    const onBlur = (e) => {
        const { name, value } = e.target;
        const newState = checkInput(name, value);
        setFieldsError(Object.assign(Object.assign({}, fieldsError), { [name]: newState }));
    };
    const onClick = (e) => {
        e.preventDefault();
        authAPI
            .signIn(fields)
            .then(() => {
            setErrorAuth('');
            dispatch(fetchUserProfile());
        })
            .then(() => {
            navigate(routes.game.root);
        })
            .catch(() => setErrorAuth(authError));
    };
    const toRegistration = (e) => {
        e.preventDefault();
        navigate(routes.registration);
    };
    return (React.createElement("div", { className: styles.container },
        React.createElement("div", { className: styles.container__login },
            React.createElement("div", { className: styles.login__header },
                React.createElement(Logo, { width: "50", height: "100%" }),
                React.createElement("h1", { className: styles.login__title }, "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F")),
            React.createElement(Form, { name: "login" },
                React.createElement(Input, { type: "text", name: "login", label: "\u041B\u043E\u0433\u0438\u043D", value: fields.login, error: fieldsError.login, onBlur: onBlur, onChange: onChange }),
                React.createElement(Input, { type: "password", name: "password", label: "\u041F\u0430\u0440\u043E\u043B\u044C", value: fields.password, error: fieldsError.password, onBlur: onBlur, onChange: onChange }),
                errorAuth && React.createElement(Error, { title: errorAuth }),
                React.createElement(Button, { title: "\u0412\u043E\u0439\u0442\u0438", type: "submit", view: ViewButton.main, onClick: onClick }),
                React.createElement(Button, { title: "\u041D\u0435\u0442 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430?", type: "button", view: ViewButton.secondary, onClick: toRegistration })))));
};
