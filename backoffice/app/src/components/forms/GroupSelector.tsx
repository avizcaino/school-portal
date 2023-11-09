import ToggleButton from '@mui/material/ToggleButton/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup/ToggleButtonGroup';
import {IGroup} from '@school-server/server';
import {useEffect, useState} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {fetchGroups} from '../../application/get-groups/action';

export const GroupSelector = () => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<IGroup[]>([]);

  const {control} = useFormContext();

  useEffect(() => {
    fetchGroups().then(g => setGroups(g));
  }, []);

  return (
    <Controller
      name="groups"
      control={control}
      render={({field: {onChange, value}}) => (
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
      )}
    />
  );
};
