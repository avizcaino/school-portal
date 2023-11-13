import {
  Avatar,
  AvatarGroup,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from '@nextui-org/react';
import {DeleteIcon, EditIcon, EyeIcon, useUpdateModal} from '@school-shared/components';
import {ITeacherExtended} from '@school-shared/core';
import {Key, useCallback, useEffect, useState} from 'react';
import {fetchTeachers} from '../../application/get-teachers/action';
import {TeacherForm} from '../forms/TeacherForm';

export const TeachersUI = () => {
  const updateModal = useUpdateModal();
  const [teachers, setTeachers] = useState<ITeacherExtended[]>([]);

  useEffect(() => {
    fetchTeachers().then(t => setTeachers(t));
  }, []);

  const handleEdit = (teacher: ITeacherExtended) => {
    updateModal({content: () => TeacherForm({onClose, data: teacher})});
  };

  const onClose = (teacher: ITeacherExtended) => {
    setTeachers(teachers.map(row => (row.id === teacher.id ? teacher : row)));
  };

  const renderCell = useCallback((teacher: ITeacherExtended, columnKey: Key) => {
    const fullName = `${teacher.name} ${teacher.firstSurname} ${teacher.secondSurname ?? ''}`;
    switch (columnKey) {
      case 'name':
        return (
          <User
            avatarProps={{radius: 'lg', src: teacher.profilePic as string}}
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
                <DeleteIcon />
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
    <Table hideHeader aria-label="Example table with custom cells" className="px-4 py-4">
      <TableHeader columns={columns}>
        {column => (
          <TableColumn key={column.uid} align={column.uid === 'name' ? 'start' : 'center'}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={teachers}>
        {item => (
          <TableRow key={item.id as string}>
            {columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
