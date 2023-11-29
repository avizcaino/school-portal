import {classValidatorResolver} from '@hookform/resolvers/class-validator';
import {Button} from '@nextui-org/react';
import {FormInput, useUpdateModal} from '@school-shared/components';
import {IStudent, IStudentExtended, StudentValidator} from '@school-shared/core';
import {BaseSyntheticEvent} from 'react';
import {FieldErrors, FormProvider, useForm} from 'react-hook-form';
import {registerStudent} from '../../application/students/register-student/action';
import {RegisterStudentCommand} from '../../application/students/register-student/command';

const resolver = classValidatorResolver(RegisterStudentCommand, {}, {mode: 'sync'});
export const StudentForm = (props: {data?: IStudentExtended; isEditing?: boolean}) => {
  const updateModal = useUpdateModal();

  const methods = useForm<StudentValidator>({
    resolver,
    defaultValues: props.data ?? undefined,
  });

  const onSuccess = async (data: RegisterStudentCommand, event: unknown) => {
    const fn = (
      isEditing: boolean | undefined,
      data: RegisterStudentCommand
    ): Promise<IStudentExtended | IStudentExtended[]> =>
      isEditing ? updateStudent(data.id as string, data) : registerStudent(data);
    fn(props.isEditing, data).then((student: IStudentExtended | IStudentExtended[]) => {
      updateModal(null as never);
    });
  };

  const onError = (errors: FieldErrors<IStudent>, event?: BaseSyntheticEvent) => {
    console.log(errors, event);
  };

  const createStudentCallback = methods?.handleSubmit(onSuccess, onError);

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

        {/* <GroupSelector defaultValues={props.data?.groups?.map(g => g.id) as string[]} /> */}

        <Button onClick={createStudentCallback}>Submit</Button>
      </>
    </FormProvider>
  );
};
