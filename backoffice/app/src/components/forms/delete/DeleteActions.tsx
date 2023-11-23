import {Button} from '@nextui-org/react';
import {
  ModalActions,
  ModalProviderState,
  useModal,
  useUpdateModal,
} from '@school-shared/components';

export const DeleteActions = (props: ModalActions) => {
  const modalConfig = useModal() satisfies ModalProviderState;
  const updateModal = useUpdateModal();

  const handleAccept = () => {
    props.onClose && props.onClose(true);
  };

  const handleCancel = () => {
    props.onClose && props.onClose(false);
  };

  return (
    <div className="flex flex-row justify-end">
      <Button color="secondary" onClick={handleCancel}>
        Cancel
      </Button>
      <Button color="primary" onClick={handleAccept}>
        Accept
      </Button>
    </div>
  );
};
