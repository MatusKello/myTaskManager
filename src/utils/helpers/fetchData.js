import { projectFirestore } from '../../firebase/config';
import { sortArrayByDateOrAbcd } from './index';

export const fetchListsFromFirestore = async (
  setLists,
  sortSwitch,
  sortOption,
  sortOrder
) => {
  try {
    const snapshot = await projectFirestore.collection('taskList').get();
    let data = snapshot.docs.map((doc) => ({
      listId: doc.id,
      ...doc.data(),
    }));

    if (!sortSwitch) {
      data = sortArrayByDateOrAbcd(data, 'listTitle', sortOption, sortOrder);
    } else {
      // Sorting tasks within each list
      data = data.map((list) => ({
        ...list,
        tasks: list.tasks
          ? sortArrayByDateOrAbcd(
              list.tasks,
              'taskDescription',
              sortOption,
              sortOrder
            )
          : [],
      }));
    }

    setLists(data);
  } catch (error) {
    console.error('Error fetching and sorting lists from Firestore:', error);
  }
};
