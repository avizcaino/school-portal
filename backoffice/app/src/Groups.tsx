import {classValidatorResolver} from '@hookform/resolvers/class-validator';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {IGroup} from '@school-server/server';
import {BaseSyntheticEvent, useEffect, useState} from 'react';
import {FieldErrors, FormProvider, useForm} from 'react-hook-form';
import {GroupValidator} from '../../../shared/core/src/application/groups/validator';
import {GroupForm} from './GroupForm';
import {CreateGroupCommand} from './application/create-group/command';
import {fetchGroups} from './application/get-groups/action';

const resolver = classValidatorResolver(CreateGroupCommand, {}, {mode: 'sync'});
export const Groups = () => {
  const [groups, setGroups] = useState<IGroup[]>([]);

  useEffect(() => {
    fetchGroups().then(g => setGroups(g));
  }, []);

  const methods = useForm<GroupValidator>({
    resolver: (data, context, options) => {
      console.log(data, context, options);
      return resolver(data, context, options);
    },
  });

  const onSuccess = async (data: CreateGroupCommand, event: unknown) => {
    console.log('success');
    console.log(data);
  };

  const onError = (errors: FieldErrors<IGroup>, event?: BaseSyntheticEvent) => {
    console.log(errors, event);
  };

  const createGroupCallback = methods?.handleSubmit(onSuccess, onError);

  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'grade', headerName: 'Curs', type: 'number', width: 130},
    {field: 'subGroup', headerName: 'Grup', width: 130},
    {field: 'name', headerName: 'Nom', width: 130},
  ];

  return (
    <>
      <DataGrid
        rows={groups}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {page: 0, pageSize: 5},
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
      <FormProvider {...methods}>
        <GroupForm callback={createGroupCallback} />
      </FormProvider>
    </>
  );
};
