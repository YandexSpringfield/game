import { InputHTMLAttributes, DOMAttributes } from 'react';

export type TBaseProps = {
  name: string;
  label: string;
  type: string;
  value: string;
  error: string;
  onBlur?: DOMAttributes<HTMLInputElement>;
  onChange?: DOMAttributes<HTMLInputElement>;
};

export type TProps = InputHTMLAttributes<HTMLInputElement> & TBaseProps;
