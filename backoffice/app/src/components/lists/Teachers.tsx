import {classValidatorResolver} from '@hookform/resolvers/class-validator';
import Button from '@mui/material/Button/Button';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import {ITeacher, ITeacherExtended} from '@school-server/server';
import {GroupValidator} from '@school-shared/core';
import {BaseSyntheticEvent, useEffect, useState} from 'react';
import {FieldErrors, FormProvider, useForm} from 'react-hook-form';
import {CreateGroupCommand} from '../../application/create-group/command';
import {fetchTeachers} from '../../application/get-teachers/action';
import {GroupForm} from '../forms/GroupForm';

const resolver = classValidatorResolver(CreateGroupCommand, {}, {mode: 'sync'});
export const Teachers = () => {
  const [teachers, setTeachers] = useState<ITeacherExtended[]>([]);

  useEffect(() => {
    fetchTeachers().then(t => setTeachers(t));
  }, []);

  const methods = useForm<GroupValidator>({
    resolver,
  });

  const onSuccess = async (data: CreateGroupCommand, event: unknown) => {
    console.log(data);
  };

  const onError = (errors: FieldErrors<ITeacher>, event?: BaseSyntheticEvent) => {
    console.log(errors, event);
  };

  const createGroupCallback = methods?.handleSubmit(onSuccess, onError);

  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'name', headerName: 'Nom', width: 130},
    {field: 'firstSurname', headerName: 'Cognom', width: 130},
    {
      field: 'groups',
      headerName: 'Cursos',
      width: 130,
      valueGetter: (params: GridValueGetterParams<ITeacherExtended>) =>
        params.row.groups?.reduce((groups, g) => groups.concat(`${g.name} | `), ''),
    },
  ];

  const addTeacher = () => {
    console.log('');
  };

  return (
    <div className="w-full px-4 py-4 flex flex-col">
      <Button onClick={addTeacher}>Afegir Professor</Button>
      <DataGrid
        rows={teachers}
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
    </div>
  );
};
