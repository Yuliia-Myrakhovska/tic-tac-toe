function Timer({ time, timeX, timeO }) {
  function formatTime(second) {
    const minute = Math.floor(second / 60);
    const sec = second % 60;
    return `${minute.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  }
  return (
    <div className="timer-container">
      <h3>Час гри: {formatTime(time)}</h3>
      <h3>Час ГРАВЕЦЯ 1(✖): {formatTime(timeX)}</h3>
      <h3>Час ГРАВЕЦЯ 2(◯): {formatTime(timeO)}</h3>
    </div>
  );
}
export default Timer;
