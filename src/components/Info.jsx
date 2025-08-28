function Info({ statusGame, winX, winO, allGame, onReset }) {
  return (
    <div>
      <h2>{statusGame}</h2>
      <h3>X:{winX}</h3>
      <h3>O:{winO}</h3>
      <h3>all:{allGame}</h3>
      <button onClick={onReset}>Нова гра</button>
    </div>
  );
}

export default Info;
