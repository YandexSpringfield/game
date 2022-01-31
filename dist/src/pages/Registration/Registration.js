import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ViewButton, Form, Input, Logo, Error } from '@components';
import { checkInput, checkPassword, omit } from '@utils/utils';
import { authAPI } from '@api';
import { useAppDispatch, fetchUserProfile } from '@store';
import { registrationError, routes } from '@appConstants';
import styles from './Registration.module.scss';
const initialFields = {
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    phone: '',
    password: '',
    password_confirm: '',
};
export const Registration = () => {
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
        let newState;
        if (name === 'password_confirm') {
            newState = checkPassword(name, value, fields.password);
        }
        else {
            newState = checkInput(name, value);
        }
        setFieldsError(Object.assign(Object.assign({}, fieldsError), { [name]: newState }));
    };
    const onClick = (e) => {
        e.preventDefault();
        const data = omit(fields, 'password_confirm');
        authAPI
            .signUp(data)
            .then(() => {
            setErrorAuth('');
            dispatch(fetchUserProfile());
        })
            .then(() => {
            navigate(routes.game.root);
        })
            .catch(() => setErrorAuth(registrationError));
    };
    const toLogin = (e) => {
        e.preventDefault();
        navigate(routes.login);
    };
    return (React.createElement("div", { className: styles.container },
        React.createElement("div", { className: styles.container__registration },
            React.createElement("div", { className: styles.registration__header },
                React.createElement(Logo, { width: "50", height: "100%" }),
                React.createElement("h1", { className: styles.registration__title }, "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F")),
            React.createElement(Form, { name: "registration" },
                React.createElement("div", { className: styles.form__username },
                    React.createElement(Input, { type: "text", name: "first_name", label: "\u0418\u043C\u044F", value: fields.first_name, error: fieldsError.first_name, onBlur: onBlur, onChange: onChange }),
                    React.createElement(Input, { type: "text", name: "second_name", label: "\u0424\u0430\u043C\u0438\u043B\u0438\u044F", value: fields.second_name, error: fieldsError.second_name, onBlur: onBlur, onChange: onChange })),
                React.createElement(Input, { type: "text", name: "login", label: "\u041B\u043E\u0433\u0438\u043D", value: fields.login, error: fieldsError.login, onBlur: onBlur, onChange: onChange }),
                React.createElement(Input, { type: "email", name: "email", label: "\u041F\u043E\u0447\u0442\u0430", value: fields.email, error: fieldsError.email, onBlur: onBlur, onChange: onChange }),
                React.createElement(Input, { type: "phone", name: "phone", label: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D", value: fields.phone, error: fieldsError.phone, onBlur: onBlur, onChange: onChange }),
                React.createElement(Input, { type: "password", name: "password", label: "\u041F\u0430\u0440\u043E\u043B\u044C", value: fields.password, error: fieldsError.password, onBlur: onBlur, onChange: onChange }),
                React.createElement(Input, { type: "password", name: "password_confirm", label: "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C", value: fields.password_confirm, error: fieldsError.password_confirm, onBlur: onBlur, onChange: onChange }),
                errorAuth && React.createElement(Error, { title: errorAuth }),
                React.createElement(Button, { title: "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F", type: "submit", view: ViewButton.main, onClick: onClick }),
                React.createElement(Button, { title: "\u0412\u043E\u0439\u0442\u0438", type: "button", view: ViewButton.secondary, onClick: toLogin })))));
};
