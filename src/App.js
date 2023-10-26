import { Box, Typography } from '@mui/material';
import TaskList from './components/TaskList';

const App = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '0.5rem',
      }}
    >
      <Typography sx={{ paddingBottom: '1rem' }} variant='h2'>
        Task Manager
      </Typography>
      <TaskList />
    </Box>
  );
};

export default App;
