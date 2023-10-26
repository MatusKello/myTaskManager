const Task = ({ id, title, description, deleteTask }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={() => deleteTask(id)}>Delete</button>
    </div>
  );
};

export default Task;
