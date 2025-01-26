const intToMinutes = (int) => {
  const minutes = Math.floor(int / 60);
  const seconds = int - minutes * 60;
  return `${minutes.toFixed(0).padStart(2, "0")}:${seconds.toFixed(0).padStart(2, "0")}`;
};
export default intToMinutes;
