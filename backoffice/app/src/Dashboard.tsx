import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button onClick={() => navigate('/groups')}>GROUPS</Button>
      <Button onClick={() => navigate('/teachers')}>TEACHERS</Button>
      <Button onClick={() => navigate('/students')}>STUDENTS</Button>
    </div>
  );
};
