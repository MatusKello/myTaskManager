import { Box, Button, Card, Collapse, Typography } from '@mui/material';
import TaskDescription from './TaskDescription';
import { useState } from 'react';

const Task = ({
  task,
  deleteTask,
  sortOption,
  sortOrder,
  sortSwitch,
  sortedTasks,
  width,
}) => {
  const { id, title, description, dateTime } = task; // Extract dateTime from the task object
  const [checked, setChecked] = useState(true);

  return (
    <Box sx={{ width: width, pr: 0.5 }}>
      <Card
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          mb: '1rem',
          p: '1rem',
          border: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box
          onClick={() => setChecked(!checked)}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
        >
          <div>
            <Typography variant='h4'>{title}</Typography>
            <Typography variant='subtitle1'>{description}</Typography>
          </div>
          <Typography>{dateTime}</Typography> {/* Display the date and time */}
          <Button onClick={() => setChecked(!checked)}>
            {checked ? 'Collapse' : 'Expand'}
          </Button>
        </Box>
        <Collapse in={checked}>
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
        </Collapse>
      </Card>
    </Box>
  );
};

export default Task;
