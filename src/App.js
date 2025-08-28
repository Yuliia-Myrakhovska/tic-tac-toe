import React, { useState } from "react";
import Board from "./components/Board";
import Info from "./components/Info";

import "./App.css";

function getWinner(squqres) {
  const options = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];
  for (let i = 0; i < options.length; i++) {
    const [a, b, c] = options[i];

    if (squqres[a] && squqres[a] === squqres[b] && squqres[a] === squqres[c]) {
      return squqres[a];
    }
  }
  return null;
}
function App() {
  const [isNext, setIsNext] = useState(true);
  const [squqres, setSquqres] = useState(Array(9).fill(null));

  function resetGame() {
    setSquqres(Array(9).fill(null));
    setIsNext(true);
  }
  function gameClick(i) {
    const newSquqres = [...squqres];
    if (getWinner(i) || newSquqres[i]) {
      return;
    }
    newSquqres[i] = isNext ? "x" : "o";
    setSquqres(newSquqres);
    setIsNext(!isNext);
  }

  const winner = getWinner(squqres);
  const isFull = squqres.every((cell) => cell !== null);
  let statusGame;
  if (winner) {
    statusGame = `Переміг: ${winner}`;
  } else if (isFull) {
    statusGame = "Нічия!";
  } else {
    statusGame = "Наступний:" + (isNext ? "x" : "o");
  }

  return (
    <div>
      <h1>tic-tac-toe</h1>
      <Board squqres={squqres} onClick={gameClick} />
      <Info statusGame={statusGame} onReset={resetGame} />
    </div>
  );
}

export default App;
