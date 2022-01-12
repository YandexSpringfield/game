import { PropsWithChildren } from 'react';

export type TProps = PropsWithChildren<{
  name: string;
  onSubmit?: (data: unknown) => void;
}>;
