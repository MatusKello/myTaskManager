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
} from '@mui/material';
import { sortArrayByDateOrAbcd } from '../utils/helpers';

const TaskList = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Nakup',
      description: 'Lidl',
      dateTime: '01. 10. 2023 - 05:17:22',
    },
    {
      id: 2,
      title: 'Upratat',
      description: 'Auto',
      dateTime: '05. 06. 2023 - 19:10:30',
    },
  ]);
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

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };
  console.log(sortOrder);

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
  }, [sortSwitch, sortOption, sortOrder]);

  const handleSortToggle = () => {
    setSortSwitch((prevSort) => !prevSort);
  };

  return (
    <div>
      <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Sort by</InputLabel>
        <Select value={sortOption} onChange={handleSortChange}>
          <MenuItem value='date'>Date</MenuItem>
          <MenuItem value='abcd'>Alphabetical</MenuItem>
        </Select>
      </FormControl>

      <FormControl component='fieldset' sx={{ m: 1, minWidth: 120 }}>
        <FormControlLabel
          control={<Switch checked={sortSwitch} onChange={handleSortToggle} />}
          label={sortSwitch ? 'Sort Task List' : 'Sort Task Description'}
        />
      </FormControl>

      <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Sort order</InputLabel>
        <Select value={sortOrder} onChange={handleSortOrderChange}>
          <MenuItem value='asc'>Ascending</MenuItem>
          <MenuItem value='desc'>Descending</MenuItem>
        </Select>
      </FormControl>

      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            sortOption={sortOption}
            sortOrder={sortOrder}
            sortSwitch={sortSwitch}
          />
        );
      })}
      <NewTask onAddTask={addTask} />
    </div>
  );
};

export default TaskList;
