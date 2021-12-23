import { DOMAttributes, ButtonHTMLAttributes } from 'react';

export type TBaseProps = {
  title: string;
  view: string;
};

export type TProps = ButtonHTMLAttributes<HTMLButtonElement> &
  DOMAttributes<HTMLButtonElement> &
  TBaseProps;
