import { Button, Card, Typography } from '@mui/material';
import TaskDescription from './TaskDescription';

const Task = ({ task, deleteTask }) => {
  const { id, title, description } = task;
  return (
    <Card
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        mb: '1rem',
        p: '1rem',
        border: '1px solid red',
      }}
    >
      <Typography variant='h4'>{title}</Typography>
      <Typography variant='subtitle1'>{description}</Typography>
      <TaskDescription />
      <Button
        sx={{ justifySelf: 'end' }}
        variant='contained'
        onClick={() => deleteTask(id)}
      >
        Delete
      </Button>
    </Card>
  );
};

export default Task;
