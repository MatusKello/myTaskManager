import React, { useState, useEffect } from 'react';
import NewList from './NewList';
import List from './List';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../config/theme';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Switch,
  Box,
} from '@mui/material';
import { projectFirestore } from '../firebase/config';
import { fetchListsFromFirestore } from '../utils/helpers/fetchData';

const TaskList = () => {
  const [sortOption, setSortOption] = useState('date'); // Initialize with 'date'
  const [sortOrder, setSortOrder] = useState('asc'); // Initialize with 'ascending'
  const [sortSwitch, setSortSwitch] = useState(false);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetchListsFromFirestore(setLists, sortSwitch, sortOption, sortOrder);
  }, [sortSwitch, sortOption, sortOrder]);

  const addList = async (newList) => {
    try {
      await projectFirestore.collection('taskList').add(newList);
      fetchListsFromFirestore(setLists);
    } catch (error) {
      console.error('Error adding list to Firestore:', error);
    }
  };

  const deleteList = async (listId) => {
    try {
      // Delete the document from Firestore
      await projectFirestore.collection('taskList').doc(listId).delete();
      fetchListsFromFirestore(setLists);
      // Update the local state to remove the deleted list
    } catch (error) {
      console.error('Error deleting list from Firestore:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
          {lists.map((list, index) => {
            return (
              <List
                key={index}
                list={list}
                deleteList={() => deleteList(list.listId)}
                sortOption={sortOption}
                sortOrder={sortOrder}
                sortSwitch={sortSwitch}
                lists={lists}
                setLists={setLists}
              />
            );
          })}
        </Box>
        {<NewList onAddList={addList} />}
      </div>
    </ThemeProvider>
  );
};

export default TaskList;
