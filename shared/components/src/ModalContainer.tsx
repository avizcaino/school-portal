import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from '@nextui-org/react';
import {isNotNullNeitherEmpty} from '@uxland/ramda-extensions';
import React, {useEffect, useState} from 'react';
import {useModal, useUpdateModal} from './providers/ModalProvider';
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  renderCloseAction?: boolean;
  onClose?: () => void;
}

const renderContent = (Content: React.FC, data?: any) => <Content {...data} />;

export const ModalContainer = () => {
  const config = useModal();
  const updateModal = useUpdateModal();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isNotNullNeitherEmpty(config?.content)) setOpen(true);
    else setOpen(false);
  }, [config]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      updateModal(null as never);
    }, 500);
  };

  return (
    config?.content && (
      <Modal isOpen={open} onClose={handleClose} size={config.size}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader>{config.title}</ModalHeader>
              <ModalBody>{config?.content && renderContent(config.content)}</ModalBody>
              <ModalFooter>
                {config?.actions && renderContent(config?.actions, {onClose})}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      // <ThemeProvider theme={mytthheme}>
      // <Dialog
      //   className={config?.className}
      //   fullScreen={config?.fullScreen}
      //   TransitionComponent={transitionSelector(config?.slideDirection)}
      //   onClose={handleClose}
      //   scroll={config?.scroll || 'paper'}
      //   open={open}
      // >
      //   {config?.title && (
      //     <BootstrapDialogTitle
      //       renderCloseAction={config?.renderCloseAction}
      //       id="customized-dialog-title"
      //       onClose={handleClose}
      //     >
      //       <span className="ModalHeaderTitle">{config?.title}</span>
      //     </BootstrapDialogTitle>
      //   )}
      //   <DialogContent className="ContentDialog" dividers>
      //     {config?.content && renderContent(config?.content, config?.data)}
      //   </DialogContent>
      //   {config?.actions && renderContent(config?.actions)}
      // </Dialog>
      // </ThemeProvider>
    )
  );
};
