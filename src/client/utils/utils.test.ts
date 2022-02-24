import { checkInput, checkPassword, omit } from '@utils/utils';
import { VALIDATION_DATA } from '@appConstants';

describe('Utils', () => {
  test('Check input should return error message', () => {
    const name = 'login';
    const value = 'login23!';

    expect(checkInput(name, value)).toBe(VALIDATION_DATA[name].message);
  });

  test('Check password should return error message', () => {
    const name = 'password';
    const value = '12345';
    const password = '12345!';

    expect(checkPassword(name, value, password)).toBe(
      VALIDATION_DATA[name].message,
    );
  });

  test('Omit should delete given key', () => {
    const object = {
      key1: 'test',
      key2: 'test',
    };

    expect(omit(object, 'key2')).toStrictEqual({ key1: 'test' });
  });
});
