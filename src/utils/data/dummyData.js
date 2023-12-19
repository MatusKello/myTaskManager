import { v4 as uuidv4 } from 'uuid';

export const testingListArray = [
  {
    listId: uuidv4(),
    listTitle: 'This is title',
    listDescription: 'This is description',
    dateTime: null,
    tasks: [
      {
        taskId: uuidv4(),
        taskDescription: 'This is task description1',
        dateTime: null,
        isCompleted: false,
      },
      {
        taskId: uuidv4(),
        taskDescription: 'This is task description2',
        dateTime: null,
        isCompleted: false,
      },
      {
        taskId: uuidv4(),
        taskDescription: 'This is task description3',
        dateTime: null,
        isCompleted: false,
      },
    ],
  },
  {
    listId: uuidv4(),
    listTitle: 'This is title2',
    listDescription: 'This is description2',
    dateTime: null,
    tasks: [
      {
        taskId: uuidv4(),
        taskDescription: 'This is task description4',
        dateTime: null,
        isCompleted: false,
      },
      {
        taskId: uuidv4(),
        taskDescription: 'This is task description5',
        dateTime: null,
        isCompleted: false,
      },
    ],
  },
];
