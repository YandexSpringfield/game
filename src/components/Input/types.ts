import { FocusEventHandler } from 'react';

export type TProps = {
  name: string;
  label: string;
  type: string;
  value: string;
  error: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: FocusEventHandler<HTMLInputElement>;
};
