import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import moment from 'moment';

const NewList = ({ onAddList }) => {
  const [newList, setNewList] = useState({
    listTitle: '',
    listDescription: '',
  });

  const addList = () => {
    if (newList.listTitle && newList.listDescription) {
      const currentDateAndTime = moment().format('DD. MM. YYYY - HH:mm:ss');
      onAddList({ ...newList, dateTime: currentDateAndTime });
      setNewList({ listTitle: '', listDescription: '' });
    }
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr',
      }}
    >
      <Box
        sx={{
          mb: '1rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <TextField
          sx={{ mr: 1 }}
          value={newList.listTitle}
          type='text'
          placeholder='List Title'
          onChange={(e) =>
            setNewList({ ...newList, listTitle: e.target.value })
          }
        />
        <TextField
          value={newList.listDescription}
          type='text'
          placeholder='List Description'
          onChange={(e) =>
            setNewList({ ...newList, listDescription: e.target.value })
          }
        />
      </Box>
      <Button
        sx={{ justifySelf: 'center' }}
        onClick={addList}
        variant='contained'
      >
        Add list
      </Button>
    </Box>
  );
};

export default NewList;
