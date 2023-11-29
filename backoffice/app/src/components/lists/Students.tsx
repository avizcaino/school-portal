import {Avatar, Tooltip, User} from '@nextui-org/react';
import {DeleteIcon, EditIcon, EyeIcon, useUpdateModal} from '@school-shared/components';
import {IStudentExtended} from '@school-shared/core';
import {Key, useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {deleteStudent} from '../../application/students/delete-student/action';
import {fetchStudents} from '../../application/students/get-students/action';
import {studentsSelector} from '../../application/students/get-students/selectors';
import {ConfirmDelete} from '../forms/delete/ConfirmDelete';
import {DeleteActions} from '../forms/delete/DeleteActions';
import {Grid} from '../grid/Grid';

export const Students = () => {
  const updateModal = useUpdateModal();
  const students = useSelector(studentsSelector);

  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    fetchStudents().then(r => setFetching(false));
  }, []);

  const handleEdit = (student: IStudentExtended | undefined, isNew?: boolean) => {
    updateModal({
      title: isNew ? 'Creating...' : 'Editing...',
      content: () => StudentForm({data: student, isEditing: !isNew}),
    });
  };

  const handleDelete = (id: string) => {
    updateModal({
      title: '',
      data: id,
      content: ConfirmDelete,
      actions: DeleteActions,
      onClose: onCloseDelete,
    });
  };

  const onCloseDelete = (result: boolean, id: string) => result && deleteStudent(id);

  const renderCell = useCallback((student: IStudentExtended, columnKey: Key) => {
    const fullName = `${student.name} ${student.firstSurname} ${student.secondSurname ?? ''}`;
    switch (columnKey) {
      case 'name':
        return (
          <User
            // avatarProps={{radius: 'lg', src: teacher.profilePic as string}}
            description={student.internalId as string}
            name={fullName}
          >
            {student.internalId as string}
          </User>
        );
      case 'group':
        return <Avatar key={student.group.id} name={student.group.name} />;
      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-slate-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-slate-400 cursor-pointer active:opacity-50">
                <EditIcon onClick={() => handleEdit(student)} />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon onClick={() => handleDelete(student.id as string)} />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return 'cellValue';
    }
  }, []);

  const columns = [
    {name: 'NAME', uid: 'name'},
    {name: 'GROUP', uid: 'group'},
    {name: 'ACTIONS', uid: 'actions'},
  ];

  return (
    <Grid<IStudentExtended>
      items={students}
      columns={columns}
      isFetching={fetching}
      hideHeader
      withSearcher={true}
      addItem={handleEdit}
      renderCell={renderCell}
    />
  );
};
