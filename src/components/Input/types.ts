import { FocusEventHandler, InputHTMLAttributes, DOMAttributes } from 'react';

export type TBaseProps = {
  name: string;
  label: string;
  type: string;
  value: string;
  error: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: FocusEventHandler<HTMLInputElement>;
};

export type TProps = InputHTMLAttributes<HTMLInputElement> & TBaseProps;
