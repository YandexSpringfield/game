import { FocusEvent, useState } from 'react';
import { checkInput, checkPassword } from '@utils/utils';

export const useInput = (initialFields) => {
  const [fields, setFields] = useState(initialFields);
  const [fieldsError, setFieldsError] = useState(initialFields);

  return {
    fields,
    fieldsError,
    setFields,
    onChange: (e: FocusEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFields({ ...fields, [name]: value });
    },
    onBlur: (e: FocusEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      let newState;
      if (name === 'password_confirm' || name === 'newPasswordConfirm') {
        newState = checkPassword(
          name,
          value,
          fields.password || fields.newPassword,
        );
      } else {
        newState = checkInput(name, value);
      }
      setFieldsError({ ...fieldsError, [name]: newState });
    },
  };
};
