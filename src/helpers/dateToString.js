const dateToString = (date) => {
  const dateObject = new Date(date);
  return (
    dateObject.toDateString() + " " + dateObject.toTimeString().slice(0, 5)
  );
};
export default dateToString;
