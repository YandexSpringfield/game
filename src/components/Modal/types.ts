import { PropsWithChildren } from 'react';

export type Props = PropsWithChildren<{
  isOpen: boolean;
  className?: string;
  onClose: () => void;
}>;
