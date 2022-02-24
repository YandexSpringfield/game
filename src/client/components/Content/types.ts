import { PropsWithChildren } from 'react';

export type TProps = PropsWithChildren<{
  className?: string;
  title: string;
  description?: string;
}>;
