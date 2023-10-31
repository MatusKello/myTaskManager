import moment from 'moment';

const DateTime = ({ date }) => {
  const formattedDate = moment(date).format('DD. MM. YYYY - HH:mm:ss');

  return (
    <div>
      <p>{formattedDate}</p>
    </div>
  );
};

export default DateTime;
