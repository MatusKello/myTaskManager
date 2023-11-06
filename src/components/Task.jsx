import React from 'react';
import { Box, Button, Card, Typography } from '@mui/material';
import TaskDescription from './TaskDescription';

const Task = ({
  task,
  deleteTask,
  sortOption,
  sortOrder,
  sortSwitch,
  sortedTasks,
}) => {
  const { id, title, description, dateTime } = task; // Extract dateTime from the task object

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Typography variant='h4'>{title}</Typography>
          <Typography variant='subtitle1'>{description}</Typography>
        </div>
        <Typography>{dateTime}</Typography> {/* Display the date and time */}
      </Box>
      <TaskDescription
        sortOption={sortOption}
        sortOrder={sortOrder}
        sortSwitch={sortSwitch}
        sortedTasks={sortedTasks}
      />
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
