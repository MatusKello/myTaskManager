import moment from 'moment';

export const sortArrayByDateOrAbcd = (array, key, sortOption, sortOrder) => {
  const result = array.slice().sort((a, b) => {
    let comparison = 0;

    // Handle null dates
    if (sortOption === 'date') {
      const dateA = a.dateTime
        ? moment(a.dateTime, 'DD. MM. YYYY - HH:mm:ss')
        : null;
      const dateB = b.dateTime
        ? moment(b.dateTime, 'DD. MM. YYYY - HH:mm:ss')
        : null;

      if (dateA === null && dateB === null) {
        comparison = 0;
      } else if (dateA === null) {
        comparison = 1; // Treat null as greater than non-null
      } else if (dateB === null) {
        comparison = -1; // Treat null as greater than non-null
      } else {
        comparison = dateA.diff(dateB);
      }
    } else if (sortOption === 'abcd') {
      comparison = a[key].localeCompare(b[key]);
    }

    // Apply sortOrder (ascending or descending)
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return result;
};
