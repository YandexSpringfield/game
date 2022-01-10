import { PropsWithChildren } from 'react';

export type TProps = PropsWithChildren<{
  name: string;
  method: 'post' | 'put';
}>;
