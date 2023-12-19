import { Button, Card, Typography } from '@mui/material';
import moment from 'moment';
import 'firebase/firestore';
import { projectFirestore } from '../firebase/config';
import { fetchListsFromFirestore } from '../utils/helpers/fetchData';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../config/theme';

const Task = ({ task, lists, setLists, listId }) => {
  const handleCompleteTask = async () => {
    try {
      // Find the index of the list in the 'lists' array based on 'listId'
      const listIndex = lists.findIndex((list) => list.listId === listId);

      if (listIndex === -1) {
        // Handle the case where the list with the given 'listId' is not found
        return;
      }

      // Make a copy of the 'lists' array to avoid mutating the original state
      const updatedLists = [...lists];

      // Find the task within the list based on 'taskId'
      const taskIndex = updatedLists[listIndex].tasks.findIndex(
        (filteredTask) => filteredTask.taskId === task.taskId
      );

      if (taskIndex === -1) {
        // Handle the case where the task with the given 'taskId' is not found in the list
        return;
      }

      // Toggle the 'isCompleted' property of the task
      updatedLists[listIndex].tasks[taskIndex].isCompleted =
        !updatedLists[listIndex].tasks[taskIndex].isCompleted;

      // Update the 'dateTime' property of the task
      const currentDateTime = moment().format('DD. MM. YYYY - HH:mm:ss');
      updatedLists[listIndex].tasks[taskIndex].dateTime = updatedLists[
        listIndex
      ].tasks[taskIndex].isCompleted
        ? currentDateTime
        : null;

      // Update the task in Firestore
      await projectFirestore.collection('taskList').doc(listId).update({
        tasks: updatedLists[listIndex].tasks,
      });

      // Update the state with the modified 'updatedLists' array
      setLists(updatedLists);
    } catch (error) {
      console.error('Error updating task in Firestore:', error);
    }
  };

  const formattedCompletedDateTime = task.dateTime
    ? moment(task.dateTime, 'DD. MM. YYYY - HH:mm:ss').format(
        'DD. MM. YYYY - HH:mm:ss'
      )
    : null;

  const deleteTask = async (taskId) => {
    try {
      // Fetch the list document from Firestore
      const listDoc = await projectFirestore
        .collection('taskList')
        .doc(listId)
        .get();

      // Check if the list document exists
      if (!listDoc.exists) {
        console.error('List document not found.');
        return;
      }

      // Get the tasks array from the list document
      const tasksArray = listDoc.data().tasks;

      // Remove the task with the specified taskId
      const updatedTasks = tasksArray.filter((task) => task.taskId !== taskId);

      // Update the list document with the modified tasks array
      await projectFirestore.collection('taskList').doc(listId).update({
        tasks: updatedTasks,
      });

      // Fetch the updated data from Firestore
      fetchListsFromFirestore(setLists);
    } catch (error) {
      console.error('Error deleting task from Firestore:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <Card
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
            background: theme.palette.tertiary.main,
          }}
          key={task.taskId}
        >
          <Typography
            sx={{
              flex: 1,
              fontFamily: 'cursive',
              ml: 1,
              color: task.isCompleted ? 'green' : 'red',
              textDecoration: task.isCompleted ? 'line-through' : 'none',
            }}
            variant='h5'
          >
            {task.taskDescription}
          </Typography>
          <Button
            sx={{
              color: task.isCompleted ? 'green' : 'red',
            }}
            onClick={handleCompleteTask}
            variant='outlined'
          >
            {task.isCompleted ? 'Completed' : 'Mark as Completed'}
          </Button>
          {task.dateTime && (
            <Typography variant='subtitle1'>
              {formattedCompletedDateTime}
            </Typography>
          )}
          <Button variant='contained' onClick={() => deleteTask(task.taskId)}>
            Delete
          </Button>
        </Card>
      </>
    </ThemeProvider>
  );
};

export default Task;
