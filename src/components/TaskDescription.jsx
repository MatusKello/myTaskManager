import { Box, Button, Card, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const TaskDescription = () => {
  const [description, setDescription] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addDesc = () => {
    if (inputValue) {
      const newDescription = {
        id: description.length + 1,
        description: inputValue,
        isCompleted: false, // Add isCompleted property to each description
      };
      setDescription([...description, newDescription]);
      setInputValue('');
    }
  };

  const deleteItem = (itemId) => {
    setDescription(description.filter((item) => item.id !== itemId));
  };

  const handleComplete = (itemId) => {
    setDescription((prevDescription) =>
      prevDescription.map((item) =>
        item.id === itemId ? { ...item, isCompleted: true } : item
      )
    );
  };

  return (
    <>
      {description.map((addOne) => {
        return (
          <Card
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 3,
            }}
            key={addOne.id}
          >
            <Typography
              sx={{
                flex: 1,
                fontFamily: 'cursive',
                ml: 1,
                color: addOne.isCompleted ? 'green' : 'red',
                textDecoration: addOne.isCompleted ? 'line-through' : 'none',
              }}
              variant='h5'
            >
              {addOne.description}
            </Typography>
            <Button
              sx={{
                color: addOne.isCompleted ? 'green' : 'red',
              }}
              onClick={() => handleComplete(addOne.id)}
              variant='outlined'
            >
              {addOne.isCompleted ? 'Completed' : 'Mark as Completed'}
            </Button>
            <Button variant='contained' onClick={() => deleteItem(addOne.id)}>
              Delete
            </Button>
          </Card>
        );
      })}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid transparent',
          transition: 'border 0.3s',
          '&:hover': { border: '1px solid gray' },
          mb: 5,
        }}
      >
        <TextField
          type='text'
          placeholder='Add item'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button variant='contained' onClick={addDesc}>
          Add
        </Button>
      </Box>
    </>
  );
};

export default TaskDescription;