import {classValidatorResolver} from '@hookform/resolvers/class-validator';
import Button from '@mui/material/Button/Button';
import {ITeacher, ITeacherExtended} from '@school-server/server';
import {FormInput, useUpdateModal} from '@school-shared/components';
import {TeacherValidator} from '@school-shared/core';
import {BaseSyntheticEvent} from 'react';
import {FieldErrors, FormProvider, useForm} from 'react-hook-form';
import {registerTeacher} from '../../application/register-teacher/action';
import {RegisterTeacherCommand} from '../../application/register-teacher/command';
import {updateTeacher} from '../../application/update-teacher/action';
import {GroupSelector} from './GroupSelector';

const resolver = classValidatorResolver(RegisterTeacherCommand, {}, {mode: 'sync'});
export const TeacherForm = (props: {
  onClose: (data: ITeacherExtended) => void;
  data?: ITeacherExtended;
  groupAssignation?: boolean;
}) => {
  const updateModal = useUpdateModal();

  const methods = useForm<TeacherValidator>({
    resolver,
    defaultValues: props.data
      ? {...props.data, groups: props.data?.groups?.map(g => g.id)}
      : undefined,
  });

  const onSuccess = async (data: RegisterTeacherCommand, event: unknown) => {
    const fn = (
      isEditing: boolean | undefined,
      data: RegisterTeacherCommand
    ): Promise<ITeacherExtended> =>
      isEditing ? updateTeacher(data.id as string, data) : registerTeacher(data);
    fn(props.groupAssignation, data).then((teacher: ITeacherExtended) => {
      updateModal(null as never);
      props.onClose(teacher);
    });
  };

  const onError = (errors: FieldErrors<ITeacher>, event?: BaseSyntheticEvent) => {
    console.log(errors, event);
  };

  const createTeacherCallback = methods?.handleSubmit(onSuccess, onError);

  return (
    <FormProvider {...methods}>
      <>
        <FormInput
          className={`pt-4 pb-4 ${props.groupAssignation && 'hidden'}`}
          name="name"
          label="Name"
          defaultValue={props.data?.name}
        />
        <FormInput
          className={`pt-4 pb-4 ${props.groupAssignation && 'hidden'}`}
          name="firstSurname"
          label="First Surname"
          defaultValue={props.data?.firstSurname}
        />
        <FormInput
          className={`pt-4 pb-4 ${props.groupAssignation && 'hidden'}`}
          name="internalId"
          label="DNI"
          defaultValue={props.data?.internalId}
        />

        <GroupSelector defaultValues={props.data?.groups?.map(g => g.id) as string[]} />

        <Button onClick={createTeacherCallback}>Submit</Button>
      </>
    </FormProvider>
  );
};
