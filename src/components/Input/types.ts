import { FocusEventHandler } from 'react';

export type TProps = {
  name: string;
  label: string;
  type: string;
  value: string;
  errorMessage: string;
  inputValid: boolean;
  handleInput: FocusEventHandler<HTMLInputElement>;
  changeInput: FocusEventHandler<HTMLInputElement>;
};
