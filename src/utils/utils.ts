import { VALIDATION_DATA as data } from '@appConstants';

export const checkInput = (name: string, value: string) => {
  if (data[name]) {
    const { re } = data[name];
    return !re.test(value) ? data[name].message : '';
  }
  return '';
};

export const checkPassword = (
  name: string,
  value: string,
  password: string,
) => {
  if (value !== password && data[name]) {
    return data[name].message;
  }
  return '';
};

export const omit = (obj: {}, omitKey: string): {} => {
  const result = {};
  Object.keys(obj).forEach((key) => {
    if (key !== omitKey) {
      result[key] = obj[key];
    }
  });
  return result;
};
