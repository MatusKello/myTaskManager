import React, { useState, useEffect } from 'react';
import NewTask from './NewTask';
import Task from './Task';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Switch,
  Box,
} from '@mui/material';
import { sortArrayByDateOrAbcd } from '../utils/helpers';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [sortOption, setSortOption] = useState('date'); // Initialize with 'date'
  const [sortOrder, setSortOrder] = useState('asc'); // Initialize with 'ascending'
  const [sortSwitch, setSortSwitch] = useState(false);

  const addTask = (newTask) => {
    if (tasks.length === 0) {
      setTasks([{ id: tasks.length + 1, ...newTask }]);
    } else {
      setTasks([...tasks, { id: tasks.length + 1, ...newTask }]);
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  //sorting task list by date or abcd
  //dat do useeffect  - funkcia na zaklade statute true/false = sortswtich

  useEffect(() => {
    if (!sortSwitch) {
      const sortedTasks = sortArrayByDateOrAbcd(
        tasks,
        'title',
        sortOption,
        sortOrder
      );
      setTasks(sortedTasks);
    }
  }, [sortSwitch, sortOption, sortOrder, tasks]);

  const calculateWidth = () => {
    if (tasks.length === 1) {
      return '100%';
    } else if (tasks.length >= 2) {
      return '49%';
    }
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <MenuItem value='date'>Date</MenuItem>
            <MenuItem value='abcd'>Alphabetical</MenuItem>
          </Select>
        </FormControl>

        <FormControl component='fieldset' sx={{ m: 1, minWidth: 120 }}>
          <FormControlLabel
            control={
              <Switch
                checked={sortSwitch}
                onChange={() => setSortSwitch(!sortSwitch)}
              />
            }
            label={sortSwitch ? 'Sort Task Description' : 'Sort Task List'}
          />
        </FormControl>
        <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Sort order</InputLabel>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <MenuItem value='asc'>Ascending</MenuItem>
            <MenuItem value='desc'>Descending</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          margin: 5,
          width: '100%',
        }}
      >
        {tasks.map((task) => {
          return (
            <Task
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              sortOption={sortOption}
              sortOrder={sortOrder}
              sortSwitch={sortSwitch}
              width={calculateWidth}
            />
          );
        })}
      </Box>

      <NewTask onAddTask={addTask} />
    </div>
  );
};

export default TaskList;
