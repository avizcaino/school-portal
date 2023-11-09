import {IGroup} from '@school-server/server';

export const GroupCard = (props: {group: IGroup}) => {
  return <div>{props.group?.name}</div>;
};
