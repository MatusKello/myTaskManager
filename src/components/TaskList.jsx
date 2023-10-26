import Task from './Task';
import NewTask from './NewTask';
import { useState } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, { id: tasks.length + 1, ...newTask }]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div>
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            deleteTask={deleteTask}
          />
        );
      })}
      <NewTask onAddTask={addTask} />
    </div>
  );
};

export default TaskList;
