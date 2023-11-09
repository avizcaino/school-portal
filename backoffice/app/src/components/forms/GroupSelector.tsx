import ToggleButton from '@mui/material/ToggleButton/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup/ToggleButtonGroup';
import {IGroup} from '@school-server/server';
import {useEffect, useState} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {fetchGroups} from '../../application/get-groups/action';

export const GroupSelector = () => {
  const [groups, setGroups] = useState<IGroup[]>([]);

  const {control} = useFormContext();

  useEffect(() => {
    fetchGroups().then(g => setGroups(g));
  }, []);

  return (
    <div className="grid grid-cols-4">
      <Controller
        name="groups"
        control={control}
        render={({field: {onChange, value}}) => (
          <ToggleButtonGroup
            value={value}
            onChange={(event, value: any) => {
              onChange(value);
            }}
            aria-label="text formatting"
          >
            {groups.map(g => (
              <ToggleButton value={g.id as string} aria-label={g.name}>
                {g.name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        )}
      />
    </div>
  );
};
