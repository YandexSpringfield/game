import { InputHTMLAttributes, DOMAttributes } from 'react';

export type TBaseProps = {
  label: string;
  error: string;
};

export type TProps = InputHTMLAttributes<HTMLInputElement> &
  DOMAttributes<HTMLInputElement> &
  TBaseProps;
