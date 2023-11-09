import Close from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import React, {useEffect, useState} from 'react';
import {useModal, useUpdateModal} from './providers/ModalProvider';
import {transitionSelector} from './transitions/Transitions';

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  renderCloseAction?: boolean;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const {children, renderCloseAction, onClose, ...other} = props;

  return (
    <DialogTitle className="BootstrapDialogTitle">
      {children}
      {renderCloseAction ? (
        <IconButton onClick={onClose} aria-label="close">
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const renderContent = (Content: React.FC, data?: any) => <Content {...data} />;

export const ModalContainer = () => {
  const config = useModal();
  const updateModal = useUpdateModal();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (config?.content) setOpen(true);
    else setOpen(false);
  }, [config]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      updateModal(null);
    }, 500);
  };

  return (
    config?.content && (
      // <ThemeProvider theme={mytthheme}>
      <Dialog
        className={config?.className}
        fullScreen={config?.fullScreen}
        TransitionComponent={transitionSelector(config?.slideDirection)}
        onClose={handleClose}
        scroll={config?.scroll || 'paper'}
        open={open}
      >
        {config?.title && (
          <BootstrapDialogTitle
            renderCloseAction={config?.renderCloseAction}
            id="customized-dialog-title"
            onClose={handleClose}
          >
            <span className="ModalHeaderTitle">{config?.title}</span>
          </BootstrapDialogTitle>
        )}
        <DialogContent className="ContentDialog" dividers>
          {config?.content && renderContent(config?.content, config?.data)}
        </DialogContent>
        {config?.actions && renderContent(config?.actions)}
      </Dialog>
      // </ThemeProvider>
    )
  );
};
