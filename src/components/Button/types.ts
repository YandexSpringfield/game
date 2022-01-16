import { DOMAttributes, ButtonHTMLAttributes } from 'react';

export enum ViewButton {
  main = 'main',
  secondary = 'secondary',
  transparent = 'transparent',
}

export type TBaseProps = {
  title: string;
  view: ViewButton;
};

export type TProps = ButtonHTMLAttributes<HTMLButtonElement> &
  DOMAttributes<HTMLButtonElement> &
  TBaseProps;
