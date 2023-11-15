import moment from 'moment';

export const sortArrayByDateOrAbcd = (array, key, sortOption, sortOrder) => {
  const result = array.slice().sort((a, b) => {
    let comparison = 0;
    // Apply sorting based on the prop values
    if (sortOption === 'date') {
      const dateA = moment(a.dateTime, 'DD. MM. YYYY - HH:mm:ss');
      const dateB = moment(b.dateTime, 'DD. MM. YYYY - HH:mm:ss');
      comparison = dateA.diff(dateB);
    } else if (sortOption === 'abcd') {
      comparison = a[key].localeCompare(b[key]);
    }
    // Apply sortOrder (ascending or descending)
    return sortOrder === 'asc' ? comparison : -comparison;
  });
  return result;
};
