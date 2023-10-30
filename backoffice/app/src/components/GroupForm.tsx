import {FormInput} from '@school-shared/components';
import {BaseSyntheticEvent} from 'react';

export const GroupForm = (props: {
  callback: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
}) => {
  return (
    <>
      <FormInput name="grade" label="Curs" />
      <FormInput name="subGroup" label="Grup" />
      <FormInput name="name" label="Nom" />
      <button onClick={props.callback}>form</button>
    </>
  );
};
