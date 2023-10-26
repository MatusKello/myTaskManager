import Task from './Task';
import NewTask from './NewTask';
import { useState } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

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

  return (
    <div>
      {tasks.map((task) => {
        return <Task key={task.id} task={task} deleteTask={deleteTask} />;
      })}
      <NewTask onAddTask={addTask} />
    </div>
  );
};

export default TaskList;
