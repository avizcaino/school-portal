import {capitalize} from '@mui/material';
import {
  Avatar,
  AvatarGroup,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Selection,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from '@nextui-org/react';
import {
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
  EyeIcon,
  PlusIcon,
  SearchIcon,
  useUpdateModal,
} from '@school-shared/components';
import {ITeacherExtended} from '@school-shared/core';
import {Key, useCallback, useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {deleteTeacher} from '../../application/delete-teacher/action';
import {fetchTeachers} from '../../application/get-teachers/action';
import {teachersSelector} from '../../application/get-teachers/selectors';
import {TeacherForm} from '../forms/TeacherForm';
import {ConfirmDelete} from '../forms/delete/ConfirmDelete';
import {DeleteActions} from '../forms/delete/DeleteActions';

export const Teachers = () => {
  const updateModal = useUpdateModal();
  const teachers = useSelector(teachersSelector);

  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    fetchTeachers().then(r => setFetching(false));
  }, []);

  const handleEdit = (teacher: ITeacherExtended | undefined, isNew: boolean) => {
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
                <EditIcon onClick={() => handleEdit(teacher, false)} />
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

  // HEADER
  const INITIAL_VISIBLE_COLUMNS = ['name', 'groups', 'actions'];
  const [filterValue, setFilterValue] = useState('');
  const [statusFilter, setStatusFilter] = useState<Selection>('all');
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue('');
  }, []);

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter(column => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredTeachers = [...(teachers ?? [])];

    if (hasSearchFilter) {
      filteredTeachers = filteredTeachers.filter((teacher: ITeacherExtended) =>
        teacher.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredTeachers;
  }, [teachers, filterValue, statusFilter]);

  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
          {/* <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                Status
              </Button>
            </DropdownTrigger>
            {<DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={statusFilter}
              selectionMode="multiple"
              onSelectionChange={setStatusFilter}
            >
              {statusOptions.map(status => (
                <DropdownItem key={status.uid} className="capitalize">
                  {capitalize(status.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>}
          </Dropdown> */}
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {columns.map(column => (
                <DropdownItem key={column.uid} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button
            color="primary"
            endContent={<PlusIcon />}
            onClick={() => handleEdit(undefined, true)}
          >
            Add New
          </Button>
        </div>
      </div>
      <Table
        hideHeader
        aria-label="Example table with custom cells"
        classNames={{
          base: 'max-h-[520px] overflow-scroll',
          table: 'min-h-[60px]',
        }}
      >
        <TableHeader columns={headerColumns}>
          {column => (
            <TableColumn key={column.uid} align={column.uid === 'name' ? 'start' : 'center'}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={fetching}
          loadingContent={<Spinner label="Loading..." />}
          items={filteredItems}
        >
          {item => (
            <TableRow key={item.id as string}>
              {columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
