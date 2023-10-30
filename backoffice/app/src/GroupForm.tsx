import {FormInput} from '@school-shared/components';
import {BaseSyntheticEvent} from 'react';
import {useFormContext} from 'react-hook-form';

export const GroupForm = (props: {
  callback: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
}) => {
  const methods = useFormContext();
  return (
    <>
      <FormInput name="name" label="Nom" />
      <button onClick={props.callback}>form</button>;
    </>
  );
};
