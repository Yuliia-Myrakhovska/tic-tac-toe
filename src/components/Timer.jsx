function Timer({ time, timeX, timeO }) {
  function formatTime(second) {
    const minute = Math.floor(second / 60);
    const sec = second % 60;
    return `${minute.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  }
  return (
    <div>
      <div>all{formatTime(time)}</div>
      <div>x-{formatTime(timeX)}</div>
      <div>o-{formatTime(timeO)}</div>
    </div>
  );
}
export default Timer;
