import {
  Box,
  Button,
  Card,
  Collapse,
  Typography,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import Task from './Task';
import { v4 as uuidv4 } from 'uuid';
import { projectFirestore } from '../firebase/config';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../config/theme';

const List = ({
  list,
  deleteList,
  sortOption,
  sortOrder,
  sortSwitch,
  lists,
  setLists,
}) => {
  const { listId, listTitle, listDescription, dateTime, tasks } = list; // Extract dateTime from the task object
  const [checked, setChecked] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const addTask = async () => {
    if (!inputValue) {
      // Do nothing if inputValue is empty
      return;
    }
    const newTask = {
      taskId: uuidv4(),
      taskDescription: inputValue,
      dateTime: null,
      isCompleted: false,
    };
    try {
      const taskListRef = projectFirestore.collection('taskList').doc(listId);

      // Use FieldValue.serverTimestamp() to set the current server time
      await taskListRef.update({
        tasks: [
          ...(tasks || []), // Preserve existing tasks if any
          newTask,
        ],
      });

      // Update the local state with the new task
      setLists((prevLists) => {
        const updatedLists = [...prevLists];
        const listIndex = updatedLists.findIndex(
          (list) => list.listId === listId
        );

        if (listIndex !== -1) {
          updatedLists[listIndex].tasks = [
            ...(updatedLists[listIndex].tasks || []),
            newTask,
          ];
        }
        return updatedLists;
      });
      setInputValue('');
    } catch (error) {
      console.error('Error adding task to Firestore:', error);
    }
  };

  const calculateWidth = () => {
    return lists.length === 1 ? '100%' : '49%';
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: calculateWidth(),
          pr: 1,
        }}
      >
        <Card
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            mb: '0.5rem',
            p: '1rem',
            border: (theme) => `1px solid ${theme.palette.divider}`,
            background: theme.palette.secondary.main,
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
              <Typography variant='h4'>{listTitle}</Typography>
              <Typography variant='subtitle1'>{listDescription}</Typography>
            </div>
            <Typography>{dateTime}</Typography>{' '}
            {/* Display the date and time */}
            <Button onClick={() => setChecked(!checked)}>
              {checked ? 'Collapse' : 'Expand'}
            </Button>
          </Box>
          <Collapse in={checked}>
            {tasks?.map((task) => (
              <Task
                key={task.taskId}
                task={task}
                lists={lists}
                setLists={setLists}
                listId={listId}
                tasks={tasks}
                sortOption={sortOption}
                sortOrder={sortOrder}
                sortSwitch={sortSwitch}
              />
            ))}
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
                placeholder='Add task'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button variant='contained' onClick={addTask}>
                Add
              </Button>
            </Box>
            <Button
              sx={{ justifySelf: 'end' }}
              variant='contained'
              onClick={() => deleteList(list.listId)}
            >
              Delete
            </Button>
          </Collapse>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default List;
