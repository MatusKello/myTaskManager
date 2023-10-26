import { Box, Typography } from '@mui/material';
import TaskList from './components/TaskList';

const App = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        p: 2,
      }}
    >
      <Typography sx={{ pb: 4 }} variant='h3'>
        Task Manager
      </Typography>
      <TaskList />
    </Box>
  );
};

export default App;
