import {classValidatorResolver} from '@hookform/resolvers/class-validator';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {IGroup} from '@school-server/server';
import {GroupValidator} from '@school-shared/core';
import {Guid} from 'guid-typescript';
import {BaseSyntheticEvent, useEffect, useState} from 'react';
import {FieldErrors, FormProvider, useForm} from 'react-hook-form';
import {createGroup} from '../application/create-group/action';
import {CreateGroupCommand} from '../application/create-group/command';
import {fetchGroups} from '../application/get-groups/action';
import {GroupForm} from './GroupForm';

const resolver = classValidatorResolver(CreateGroupCommand, {}, {mode: 'sync'});
export const Groups = () => {
  const [groups, setGroups] = useState<IGroup[]>([]);

  useEffect(() => {
    fetchGroups().then(g => setGroups(g));
  }, []);

  const methods = useForm<GroupValidator>({
    resolver,
  });

  const onSuccess = async (data: CreateGroupCommand, event: unknown) => {
    createGroup({...data, internalId: Guid.create().toString()}).then(r =>
      fetchGroups().then(g => setGroups(g))
    );
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
            paginationModel: {page: 0, pageSize: 20},
          },
        }}
        pageSizeOptions={[20, 30]}
        checkboxSelection
      />
      <FormProvider {...methods}>
        <GroupForm callback={createGroupCallback} />
      </FormProvider>
    </>
  );
};
