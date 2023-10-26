import { Button, Card, Typography } from '@mui/material';

const Task = ({ id, title, description, deleteTask }) => {
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
      <Typography variant='h3'>{title}</Typography>
      <Typography variant='subtitle1'>{description}</Typography>
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
