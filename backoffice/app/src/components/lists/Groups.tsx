import {classValidatorResolver} from '@hookform/resolvers/class-validator';
import {Tooltip} from '@nextui-org/react';
import {DeleteIcon, EditIcon, EyeIcon, useUpdateModal} from '@school-shared/components';
import {GroupValidator, IGroup} from '@school-shared/core';
import {prop, sortWith} from 'ramda';
import {Key, useCallback, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';
import {CreateGroupCommand} from '../../application/groups/create-group/command';
import {fetchGroups} from '../../application/groups/get-groups/action';
import {groupsSelector} from '../../application/groups/get-groups/selectors';
import {GroupForm} from '../forms/GroupForm';
import {ConfirmDelete} from '../forms/delete/ConfirmDelete';
import {DeleteActions} from '../forms/delete/DeleteActions';
import {Grid} from '../grid/Grid';

const lensGrade = prop('grade');
const lensSubGroup = prop('subGroup');
const sortGroups = (groups: IGroup[]) => sortWith<IGroup>([lensGrade, lensSubGroup])(groups);

const resolver = classValidatorResolver(CreateGroupCommand, {}, {mode: 'sync'});
export const Groups = () => {
  const updateModal = useUpdateModal();
  const groups = useSelector(groupsSelector);

  console.log(groups);

  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    fetchGroups().then(r => setFetching(false));
  }, []);

  const methods = useForm<GroupValidator>({
    resolver,
  });

  const handleEdit = (group: IGroup | undefined, isNew?: boolean) => {
    updateModal({
      title: isNew ? 'Creating...' : 'Editing...',
      content: () => GroupForm({data: group, isEditing: !isNew}),
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

  const onCloseDelete = (result: boolean, id: string) => result && deleteGroup(id);

  const renderCell = useCallback((group: IGroup, columnKey: Key) => {
    switch (columnKey) {
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
        return group[columnKey];
    }
  });

  const columns = [
    {uid: 'grade', name: 'Curs'},
    {uid: 'subGroup', name: 'Grup'},
    {uid: 'name', name: 'Nom'},
    {name: 'Actions', uid: 'actions'},
  ];

  return (
    <Grid<IGroup>
      items={groups}
      columns={columns}
      isFetching={fetching}
      hideHeader
      withSearcher={true}
      addItem={handleEdit}
      renderCell={renderCell}
    />
  );
};
