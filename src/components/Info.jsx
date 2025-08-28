function Info({ statusGame, onReset }) {
  return (
    <div>
      <h2>{statusGame}</h2>
      <button onClick={onReset}>Почати знову</button>
    </div>
  );
}

export default Info;
