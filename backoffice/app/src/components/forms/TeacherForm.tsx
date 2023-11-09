import {classValidatorResolver} from '@hookform/resolvers/class-validator';
import Button from '@mui/material/Button/Button';
import {ITeacher} from '@school-server/server';
import {FormInput, useUpdateModal} from '@school-shared/components';
import {TeacherValidator} from '@school-shared/core';
import {BaseSyntheticEvent} from 'react';
import {FieldErrors, FormProvider, useForm} from 'react-hook-form';
import {registerTeacher} from '../../application/register-teacher/action';
import {RegisterTeacherCommand} from '../../application/register-teacher/command';

const resolver = classValidatorResolver(RegisterTeacherCommand, {}, {mode: 'sync'});
export const TeacherForm = () => {
  const updateModal = useUpdateModal();

  const methods = useForm<TeacherValidator>({
    resolver,
  });

  const onSuccess = async (data: RegisterTeacherCommand, event: unknown) => {
    console.log(data);
    registerTeacher(data);
    updateModal(null as never);
  };

  const onError = (errors: FieldErrors<ITeacher>, event?: BaseSyntheticEvent) => {
    console.log(errors, event);
  };

  const createTeacherCallback = methods?.handleSubmit(onSuccess, onError);

  return (
    <FormProvider {...methods}>
      <>
        <FormInput name="name" label="Name" />
        <FormInput name="firstSurname" label="First Surname" />

        <Button onClick={createTeacherCallback}>Submit</Button>
      </>
    </FormProvider>
  );
};
