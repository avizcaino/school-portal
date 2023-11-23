import {Button} from '@nextui-org/react';
import {
  ModalActions,
  ModalProviderState,
  useModal,
  useUpdateModal,
} from '@school-shared/components';
import {deleteTeacher} from '../../application/delete-teacher/action';

export const DeleteActions = (props: ModalActions) => {
  const modalConfig = useModal() satisfies ModalProviderState;
  const updateModal = useUpdateModal();

  const handleAccept = () => {
    closeModal();
    deleteTeacher(modalConfig.data);
  };

  const handleCancel = () => {
    closeModal();
  };

  const closeModal = () => {
    props.onClose && props.onClose();
    updateModal(null as never);
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
