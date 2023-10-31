import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import moment from 'moment';

const NewTask = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const addTask = () => {
    if (newTask.title && newTask.description) {
      const currentDateAndTime = moment().format('DD. MM. YYYY - HH:mm:ss');
      onAddTask({ ...newTask, dateTime: currentDateAndTime });
      setNewTask({ title: '', description: '' });
    }
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr',
      }}
    >
      <Box sx={{ mb: '1rem' }}>
        <TextField
          value={newTask.title}
          type='text'
          placeholder='Task Title'
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <TextField
          value={newTask.description}
          type='text'
          placeholder='Task Description'
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
      </Box>
      <Button
        sx={{ justifySelf: 'center' }}
        onClick={addTask}
        variant='contained'
      >
        Add task
      </Button>
    </Box>
  );
};

export default NewTask;
