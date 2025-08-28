import Squqre from "./Squqre";

function Board({ squqres, onClick }) {
  function renderSquqres(i) {
    return <Squqre value={squqres[i]} onClick={() => onClick(i)} />;
  }
  return (
    <div className="board__container">
      <div className="board__item">
        {renderSquqres(0)}
        {renderSquqres(1)}
        {renderSquqres(2)}
      </div>
      <div className="board__item">
        {renderSquqres(3)}
        {renderSquqres(4)}
        {renderSquqres(5)}
      </div>
      <div className="board__item">
        {renderSquqres(6)}
        {renderSquqres(7)}
        {renderSquqres(8)}
      </div>
    </div>
  );
}

export default Board;
