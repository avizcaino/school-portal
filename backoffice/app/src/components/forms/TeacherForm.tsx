import Button from '@mui/material/Button/Button';
import {BaseSyntheticEvent} from 'react';

export const TeacherForm = (props: {
  callback: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
}) => {
  return (
    <>
      <Button onClick={props.callback}>Submit</Button>
    </>
  );
};
