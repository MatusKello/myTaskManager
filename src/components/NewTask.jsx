import { useState } from 'react';

const NewTask = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const addTask = () => {
    if (newTask.title && newTask.description) {
      onAddTask(newTask);
      setNewTask({ title: '', description: '' });
    }
  };

  return (
    <div>
      <form>
        <input
          value={newTask.title}
          type='text'
          placeholder='Task Title'
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          value={newTask.description}
          type='text'
          placeholder='Task Description'
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <input onClick={addTask} type='button' value={'Add task'} />
      </form>
    </div>
  );
};

export default NewTask;
