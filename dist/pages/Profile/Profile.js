import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, ChangeAvatar, ViewButton } from '@components';
import { useAppDispatch, fetchUserProfile, useUserSelector } from '@store';
import { authAPI, editProfileAPI } from '@api';
import { checkInput, checkPassword } from '@utils/utils';
import { resourcesUrl, routes } from '@appConstants';
import defaultAvatar from '@/assets/images/default-avatar.png';
import styles from './Profile.module.scss';
const initialFields = {
    avatar: '',
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    phone: '',
    display_name: '',
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
};
export const Profile = () => {
    const [fields, setFields] = useState(initialFields);
    const [fieldsError, setFieldsError] = useState(initialFields);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchUserProfile());
    }, []);
    const user = useUserSelector();
    useEffect(() => {
        setFields({ ...initialFields, ...user });
    }, [user]);
    const onChange = (e) => {
        const { name, value } = e.target;
        setFields({ ...fields, [name]: value });
    };
    const onBlur = (e) => {
        const { name, value } = e.target;
        let newState;
        if (name === 'newPasswordConfirm') {
            newState = checkPassword(name, value, fields.newPassword);
        }
        else {
            newState = checkInput(name, value);
        }
        setFieldsError({ ...fieldsError, [name]: newState });
    };
    const onEditProfile = (e) => {
        e.preventDefault();
        const { avatar, oldPassword, newPassword, newPasswordConfirm, ...data } = fields;
        editProfileAPI.editProfile(data);
    };
    const onEditPassword = (e) => {
        e.preventDefault();
        const { oldPassword, newPassword } = fields;
        const data = { oldPassword, newPassword };
        editProfileAPI.editPassword(data).then(() => setFields({
            ...fields,
            oldPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
        }));
    };
    const onLogout = (e) => {
        e.preventDefault();
        authAPI.logout().then(() => {
            navigate(routes.login);
        });
    };
    return (React.createElement("div", { className: styles.container },
        React.createElement(ChangeAvatar, { src: fields.avatar ? resourcesUrl + fields.avatar : defaultAvatar }),
        React.createElement(Form, { name: "profile", onSubmit: onEditProfile },
            React.createElement("h3", { className: styles.title }, "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F"),
            React.createElement("div", { className: styles.row },
                React.createElement("div", { className: styles.column },
                    React.createElement(Input, { type: "text", name: "first_name", label: "\u0418\u043C\u044F", value: fields.first_name, error: fieldsError.first_name, onBlur: onBlur, onChange: onChange }),
                    React.createElement(Input, { type: "email", name: "email", label: "\u041F\u043E\u0447\u0442\u0430", value: fields.email, error: fieldsError.email, onBlur: onBlur, onChange: onChange })),
                React.createElement("div", { className: styles.column },
                    React.createElement(Input, { type: "text", name: "second_name", label: "\u0424\u0430\u043C\u0438\u043B\u0438\u044F", value: fields.second_name, error: fieldsError.second_name, onBlur: onBlur, onChange: onChange }),
                    React.createElement(Input, { type: "text", name: "login", label: "\u041B\u043E\u0433\u0438\u043D", value: fields.login, error: fieldsError.login, disabled: true, onBlur: onBlur, onChange: onChange }))),
            React.createElement("div", { className: styles.row },
                React.createElement(Button, { title: "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C", type: "submit", view: ViewButton.main, onClick: onEditProfile }))),
        React.createElement(Form, { name: "password", onSubmit: onEditPassword },
            React.createElement("h3", { className: styles.title }, "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u043F\u0430\u0440\u043E\u043B\u044F"),
            React.createElement("div", { className: styles.row },
                React.createElement("div", { className: styles.column },
                    React.createElement(Input, { type: "password", name: "oldPassword", label: "\u0421\u0442\u0430\u0440\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C", value: fields.oldPassword, error: fieldsError.oldPassword, onBlur: onBlur, onChange: onChange }),
                    React.createElement(Input, { type: "password", name: "newPasswordConfirm", label: "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C", value: fields.newPasswordConfirm, error: fieldsError.newPasswordConfirm, onBlur: onBlur, onChange: onChange })),
                React.createElement("div", { className: styles.column },
                    React.createElement(Input, { type: "password", name: "newPassword", label: "\u041D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C", value: fields.newPassword, error: fieldsError.newPassword, onBlur: onBlur, onChange: onChange }))),
            React.createElement("div", { className: styles.row },
                React.createElement(Button, { title: "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C", type: "submit", view: ViewButton.main, onClick: onEditPassword }),
                React.createElement(Button, { title: "\u0412\u044B\u0445\u043E\u0434", type: "submit", view: ViewButton.exit, onClick: onLogout })))));
};
