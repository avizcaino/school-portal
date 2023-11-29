import {Input} from '@nextui-org/react';
import {useController, useFormContext} from 'react-hook-form';

export interface IFormInput {
  name: string;
  label: string;
  type?: string;
  defaultValue?: any;
  required?: boolean;
  disabled?: boolean;
  onChange?: (event: any) => void;
  className?: string;
}

export const FormInput = (props: IFormInput) => {
  const {control} = useFormContext();

  const {field, fieldState, formState} = useController({
    name: props.name,
    control,
    defaultValue: props.defaultValue ?? undefined,
  });

  return (
    <div className={props.className}>
      <Input
        isRequired={props.required}
        type={props.type}
        label={props.label}
        defaultValue={props.defaultValue}
        onChange={event => {
          props.onChange && props.onChange(event);
          field.onChange(event);
        }}
        isInvalid={fieldState?.error != null}
        errorMessage={fieldState?.error?.message}
      />
      {/* <TextField
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
      ></TextField> */}
    </div>
  );
};
