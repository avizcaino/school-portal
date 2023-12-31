import {classValidatorResolver} from '@hookform/resolvers/class-validator';
import {Button} from '@nextui-org/react';
import {FormInput, useUpdateModal} from '@school-shared/components';
import {ITeacher, ITeacherExtended, TeacherValidator} from '@school-shared/core';
import {BaseSyntheticEvent} from 'react';
import {FieldErrors, FormProvider, useForm} from 'react-hook-form';
import {registerTeacher} from '../../application/teachers/register-teacher/action';
import {RegisterTeacherCommand} from '../../application/teachers/register-teacher/command';
import {updateTeacher} from '../../application/teachers/update-teacher/action';
import {GroupSelector} from './GroupSelector';

const resolver = classValidatorResolver(RegisterTeacherCommand, {}, {mode: 'sync'});
export const TeacherForm = (props: {data?: ITeacherExtended; isEditing?: boolean}) => {
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
    ): Promise<ITeacherExtended | ITeacherExtended[]> =>
      isEditing ? updateTeacher(data.id as string, data) : registerTeacher(data);
    fn(props.isEditing, data).then((teacher: ITeacherExtended | ITeacherExtended[]) => {
      updateModal(null as never);
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
          className={`pt-2 pb-2`}
          name="name"
          label="Name"
          defaultValue={props.data?.name}
        />
        <FormInput
          className={`pt-2 pb-2`}
          name="firstSurname"
          label="First Surname"
          defaultValue={props.data?.firstSurname}
        />
        <FormInput
          className={`pt-2 pb-2`}
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
