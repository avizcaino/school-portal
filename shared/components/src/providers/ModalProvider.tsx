import {contextNameBuilder} from '@school-shared/core';
import {createContext, useContext, useState} from 'react';

export type SlideDirection = 'left' | 'right' | 'up' | 'down';
export type ModalProviderState = {
  fullScreen?: boolean;
  slideDirection?: SlideDirection;
  content: React.FC;
  data?: any;
  className?: string;
  title?: string;
  renderCloseAction?: boolean;
  actions?: React.FC;
  scroll?: 'body' | 'paper';
  contentAction?: () => void;
};

type SetModal = (config: ModalProviderState) => void;
const ModalStateContext = createContext<ModalProviderState | undefined>(undefined);
ModalStateContext.displayName = contextNameBuilder('modal-state');
const ModalDispatchContext = createContext<SetModal | undefined>(undefined);
ModalDispatchContext.displayName = contextNameBuilder('modal-dispatch');

export const ModalProvider = ({children}) => {
  const [modal, setModal] = useState<ModalProviderState>({
    fullScreen: true,
    content: null,
    data: null,
    className: '',
    title: '',
    renderCloseAction: false,
    actions: null,
    scroll: 'paper',
    contentAction: null,
  });
  return (
    <ModalStateContext.Provider value={modal}>
      <ModalDispatchContext.Provider value={setModal}>{children}</ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalStateContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const useUpdateModal = () => {
  const context = useContext(ModalDispatchContext);
  if (context === undefined) {
    throw new Error('useUpdateModal must be used within a ModalProvider');
  }
  return context;
};
