import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import GroupsIcon from '@mui/icons-material/Groups';
import Logout from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton/IconButton';
import {useNavigate} from 'react-router-dom';

export const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-100 shadow-lg shadow-blue-300/40 flex flex-col place-content-between">
      <div className="flex flex-col">
        <IconButton onClick={() => navigate('/groups')}>
          <GroupsIcon />
        </IconButton>
        <IconButton onClick={() => navigate('/teachers')}>
          <PersonIcon />
        </IconButton>
        <IconButton onClick={() => navigate('/students')}>
          <AirlineSeatReclineNormalIcon />
        </IconButton>
      </div>
      <div className="">
        <IconButton onClick={() => navigate('/students')}>
          <Logout />
        </IconButton>
      </div>
    </div>
  );
};
