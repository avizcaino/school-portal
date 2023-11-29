import {Avatar, AvatarGroup, Tooltip, User} from '@nextui-org/react';
import {DeleteIcon, EditIcon, EyeIcon, useUpdateModal} from '@school-shared/components';
import {ITeacherExtended} from '@school-shared/core';
import {Key, useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {deleteTeacher} from '../../application/teachers/delete-teacher/action';
import {fetchTeachers} from '../../application/teachers/get-teachers/action';
import {teachersSelector} from '../../application/teachers/get-teachers/selectors';
import {TeacherForm} from '../forms/TeacherForm';
import {ConfirmDelete} from '../forms/delete/ConfirmDelete';
import {DeleteActions} from '../forms/delete/DeleteActions';
import {Grid} from '../grid/Grid';

export const Teachers = () => {
  const updateModal = useUpdateModal();
  const teachers = useSelector(teachersSelector);

  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    fetchTeachers().then(r => setFetching(false));
  }, []);

  const handleEdit = (teacher: ITeacherExtended | undefined, isNew?: boolean) => {
    updateModal({
      title: isNew ? 'Creating...' : 'Editing...',
      content: () => TeacherForm({data: teacher, isEditing: !isNew}),
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

  const onCloseDelete = (result: boolean, id: string) => result && deleteTeacher(id);

  const renderCell = useCallback((teacher: ITeacherExtended, columnKey: Key) => {
    const fullName = `${teacher.name} ${teacher.firstSurname} ${teacher.secondSurname ?? ''}`;
    switch (columnKey) {
      case 'name':
        return (
          <User
            // avatarProps={{radius: 'lg', src: teacher.profilePic as string}}
            description={teacher.internalId as string}
            name={fullName}
          >
            {teacher.internalId as string}
          </User>
        );
      case 'groups':
        return (
          <AvatarGroup>
            {teacher.groups?.map(i => (
              <Avatar key={i.name} name={i.name} />
            ))}
          </AvatarGroup>
        );
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
                <EditIcon onClick={() => handleEdit(teacher)} />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon onClick={() => handleDelete(teacher.id as string)} />
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
    {name: 'GROUPS', uid: 'groups'},
    {name: 'ACTIONS', uid: 'actions'},
  ];

  return (
    <Grid<ITeacherExtended>
      items={teachers}
      columns={columns}
      isFetching={fetching}
      hideHeader
      withSearcher={true}
      addItem={handleEdit}
      renderCell={renderCell}
    />
  );
};
