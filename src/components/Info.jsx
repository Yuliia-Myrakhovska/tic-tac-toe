function Info({ statusGame, winX, winO, allGame, onReset }) {
  return (
    <div className="info-container">
      <div className="info-text">
        <h2>{statusGame}</h2>
        <h3>ГРАВЕЦЬ 1 (✖): кількість виграшів - {winX}</h3>
        <h3>ГРАВЕЦЬ 2 (◯): кількість виграшів - {winO}</h3>
        <h3>Всьго ігор: {allGame}</h3>
      </div>
      <button className="button-reset" onClick={onReset}>
        Нова гра
      </button>
    </div>
  );
}

export default Info;
