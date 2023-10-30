import TextField from '@mui/material/TextField';
import {useController, useFormContext} from 'react-hook-form';

export interface IFormInput {
  name: string;
  label: string;
  type?: string;
  defaultValue?: any;
  required?: boolean;
  disabled?: boolean;
  onChange?: (event: any) => void;
}

export const FormInput = (props: IFormInput) => {
  const {control} = useFormContext();

  const {field, fieldState, formState} = useController({
    name: props.name,
    control,
    defaultValue: props.defaultValue ?? undefined,
  });

  console.log(field, fieldState, formState);

  return (
    <TextField
      {...field}
      inputRef={field.ref}
      label={props.label}
      type={props.type}
      required={props.required}
      disabled={props.disabled}
      variant="outlined"
      size="small"
      fullWidth
      onChange={event => {
        props.onChange && props.onChange(event);
        field.onChange(event);
      }}
      error={fieldState?.error != null}
      helperText={fieldState?.error != null && fieldState?.error?.message}
      InputLabelProps={{
        shrink: true,
      }}
    ></TextField>
  );
};
