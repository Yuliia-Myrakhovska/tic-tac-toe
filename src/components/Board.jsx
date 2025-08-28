import Squqre from "./Squqre";

function Board({ squqres, size, onClick }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${size}, 50px)`,
        gridTemplateRows: `repeat(${size}, 50px)`,
        gap: "5px",
      }}
    >
      {squqres.map((item, index) => (
        <Squqre key={index} value={item} onClick={() => onClick(index)} />
      ))}
    </div>
  );
}

export default Board;
