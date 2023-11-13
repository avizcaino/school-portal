import {classValidatorResolver} from '@hookform/resolvers/class-validator';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import {GroupValidator, IStudent, IStudentExtended} from '@school-shared/core';
import {BaseSyntheticEvent, useEffect, useState} from 'react';
import {FieldErrors, FormProvider, useForm} from 'react-hook-form';
import {CreateGroupCommand} from '../../application/create-group/command';
import {fetchStudents} from '../../application/get-students/action';
import {GroupForm} from '../forms/GroupForm';

const resolver = classValidatorResolver(CreateGroupCommand, {}, {mode: 'sync'});
export const Students = () => {
  const [students, setStudents] = useState<IStudentExtended[]>([]);

  useEffect(() => {
    fetchStudents().then(g => setStudents(g));
  }, []);

  const methods = useForm<GroupValidator>({
    resolver,
  });

  const onSuccess = async (data: CreateGroupCommand, event: unknown) => {
    console.log(data);
  };

  const onError = (errors: FieldErrors<IStudent>, event?: BaseSyntheticEvent) => {
    console.log(errors, event);
  };

  const createGroupCallback = methods?.handleSubmit(onSuccess, onError);

  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'name', headerName: 'Nom', width: 130},
    {field: 'firstSurname', headerName: 'Cognom', width: 130},
    {
      field: 'groupName',
      headerName: 'Curs',
      width: 130,
      valueGetter: (params: GridValueGetterParams) => params.row.group.name,
    },
  ];

  return (
    <div className="w-full px-4 py-4 flex flex-col">
      <DataGrid
        rows={students}
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
