import {classValidatorResolver} from '@hookform/resolvers/class-validator';
import Button from '@mui/material/Button/Button';
import {ITeacher, ITeacherExtended} from '@school-server/server';
import {FormInput, useUpdateModal} from '@school-shared/components';
import {TeacherValidator} from '@school-shared/core';
import {BaseSyntheticEvent} from 'react';
import {FieldErrors, FormProvider, useForm} from 'react-hook-form';
import {registerTeacher} from '../../application/register-teacher/action';
import {RegisterTeacherCommand} from '../../application/register-teacher/command';
import {GroupSelector} from './GroupSelector';

const resolver = classValidatorResolver(RegisterTeacherCommand, {}, {mode: 'sync'});
export const TeacherForm = (props: {onClose: (data: ITeacherExtended) => void}) => {
  const updateModal = useUpdateModal();

  const methods = useForm<TeacherValidator>({
    resolver,
  });

  const onSuccess = async (data: RegisterTeacherCommand, event: unknown) => {
    registerTeacher(data).then((teacher: ITeacherExtended) => {
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
        <FormInput className="pt-4 pb-8" name="name" label="Name" defaultValue="" />
        <FormInput className="pb-8" name="firstSurname" label="First Surname" defaultValue="" />
        <FormInput className="pb-8" name="internalId" label="DNI" defaultValue="" />

        <GroupSelector />

        <Button onClick={createTeacherCallback}>Submit</Button>
      </>
    </FormProvider>
  );
};
