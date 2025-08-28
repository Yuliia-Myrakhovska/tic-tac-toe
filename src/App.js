import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import Info from "./components/Info";
import Modal from "./components/Modal";

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
  const [winX, setWinX] = useState(0);
  const [winO, setWinO] = useState(0);
  const [allGame, setAllGame] = useState(0);
  const [statusGame, setStatusGame] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  function resetGame() {
    setSquqres(Array(9).fill(null));
    setIsNext(true);
  }
  function gameClick(i) {
    const newSquqres = [...squqres];
    if (getWinner(squqres) || newSquqres[i]) {
      return;
    }
    newSquqres[i] = isNext ? "✖" : "◯";
    setSquqres(newSquqres);
    setIsNext(!isNext);
  }

  function showModal() {
    setTimeout(() => {
      setIsModalOpen(true);
    }, 2000);
  }

  useEffect(() => {
    const winner = getWinner(squqres);
    const isFull = squqres.every((cell) => cell !== null);

    if (winner) {
      if (winner === "✖") {
        setStatusGame("Переміг: ігрок 1.  Вітаємо!");
        setWinX((prev) => prev + 1);
        showModal();
      } else {
        setStatusGame("Переміг: ігрок 2.  Вітаємо!");
        setWinO((prev) => prev + 1);
        showModal();
      }
      setAllGame((prev) => prev + 1);
    } else if (isFull) {
      setStatusGame("Нічия! Спробуйте ще :)");
      setAllGame((prev) => prev + 1);
      showModal();
    } else {
      setStatusGame("ходить - " + (isNext ? "ГРАВЕЦЬ 1(✖)" : "ГРАВЕЦЬ 2(◯)"));
    }
  }, [squqres, isNext]);

  return (
    <div>
      <h1>tic-tac-toe</h1>
      <Board squqres={squqres} onClick={gameClick} />
      <Info
        statusGame={statusGame}
        winX={winX}
        winO={winO}
        allGame={allGame}
        onReset={resetGame}
      />
      <Modal
        isOpen={isModalOpen}
        statusGame={statusGame}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default App;
