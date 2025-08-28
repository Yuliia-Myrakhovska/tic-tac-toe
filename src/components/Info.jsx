function Info({ statusGame, winX, winO, allGame, onReset }) {
  return (
    <div>
      <h2>{statusGame}</h2>
      <h3>ГРАВЕЦЬ 1 (✖): кількість виграшів - {winX}</h3>
      <h3>ГРАВЕЦЬ 2 (◯):кількість виграшів - {winO}</h3>
      <h3>Всьго ігор:{allGame}</h3>
      <button onClick={onReset}>Нова гра</button>
    </div>
  );
}

export default Info;
