import React, { useState } from 'react';
import NewTask from './NewTask';
import Task from './Task';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import moment from 'moment';

const TaskList = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Nakup',
      description: 'Lidl',
      dateTime: '01. 0. 2023 - 05:17:22',
    },
    {
      id: 2,
      title: 'Upratat',
      description: 'Auto',
      dateTime: '05. 06. 2023 - 19:10:30',
    },
  ]);

  const [sortOption, setSortOption] = useState('date'); // Initialize with 'date'

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

  const sortedTasks = tasks.slice().sort((a, b) => {
    if (sortOption === 'date') {
      return (
        moment(a.dateTime, 'DD. MM. YYYY - HH:mm:ss').valueOf() -
        moment(b.dateTime, 'DD. MM. YYYY - HH:mm:ss').valueOf()
      );
    } else if (sortOption === 'abcd') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <div>
      <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Sort by</InputLabel>
        <Select value={sortOption} onChange={handleSortChange}>
          <MenuItem value='date'>Date</MenuItem>
          <MenuItem value='abcd'>Alphabetical</MenuItem>
        </Select>
      </FormControl>

      {sortedTasks.map((task) => {
        return <Task key={task.id} task={task} deleteTask={deleteTask} />;
      })}
      <NewTask onAddTask={addTask} />
    </div>
  );
};

export default TaskList;
