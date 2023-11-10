import ToggleButton from '@mui/material/ToggleButton/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup/ToggleButtonGroup';
import {IGroup} from '@school-shared/core';
import {useEffect, useState} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {fetchGroups} from '../../application/get-groups/action';

export const GroupSelector = (props: {defaultValues?: string[]}) => {
  const [groups, setGroups] = useState<IGroup[]>([]);

  const {control} = useFormContext();

  useEffect(() => {
    fetchGroups().then(g => setGroups(g));
  }, []);

  return (
    <Controller
      name="groups"
      control={control}
      defaultValue={props.defaultValues}
      render={({field: {onChange, value}}) => {
        console.log(value);
        return (
          <ToggleButtonGroup
            className="!grid grid-cols-4 gap-4"
            value={value}
            onChange={(event, value: any) => onChange(value)}
            aria-label="text formatting"
          >
            {groups.map(g => (
              <ToggleButton key={g.id} value={g.id as string} aria-label={g.name}>
                {g.name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        );
      }}
    />
  );
};
