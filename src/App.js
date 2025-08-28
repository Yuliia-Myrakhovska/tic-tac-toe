import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import Info from "./components/Info";
import Modal from "./components/Modal";
import Timer from "./components/Timer";
import "./App.css";

function getOptions(size = 3) {
  const options = [];

  //варінти по горизонталі та вертикалі
  for (let i = 0; i < size; i++) {
    const row = [];
    const col = [];
    for (let j = 0; j < size; j++) {
      row.push(i * size + j);
      col.push(j * size + i);
    }
    options.push(row);
    options.push(col);
  }

  //варіанти діагоналей
  const diag = [];
  const diag2 = [];

  for (let i = 0; i < size; i++) {
    diag.push(i * size + i);
    diag2.push(i * size + (size - (i + 1)));
  }
  options.push(diag);
  options.push(diag2);

  return options;
}
function getWinner(squqres, size) {
  const options = getOptions(size);

  for (let line of options) {
    const first = squqres[line[0]];

    if (first && line.every((i) => squqres[i] === first)) {
      return first;
    }
  }
  return null;
}
function App() {
  const [isNext, setIsNext] = useState(true);
  const [size, setSize] = useState(3);
  const [selectedSize, setSelectedSize] = useState(3);
  const [squqres, setSquqres] = useState(Array(size * size).fill(null));
  const [winX, setWinX] = useState(0);
  const [winO, setWinO] = useState(0);
  const [allGame, setAllGame] = useState(0);
  const [statusGame, setStatusGame] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  function resetGame() {
    setSize(selectedSize);
    setSquqres(Array(selectedSize * selectedSize).fill(null));
    setIsNext(true);
    emtyTimer();
    setIsGameOver(false);
  }

  function changeSize(e) {
    const newSize = parseInt(e.target.value, 10);
    setSelectedSize(newSize);
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
    const winner = getWinner(squqres, size);
    const isFull = squqres.every((cell) => cell !== null);

    if (winner) {
      if (winner === "✖") {
        setStatusGame("Переміг: ігрок 1.  Вітаємо!");
        setWinX((prev) => prev + 1);
        showModal();
        setTimerGame(timeX);
        setIsGameOver(true);
      } else {
        setStatusGame("Переміг: ігрок 2.  Вітаємо!");
        setWinO((prev) => prev + 1);
        showModal();
        setTimerGame(timeO);
        setIsGameOver(true);
      }
      setAllGame((prev) => prev + 1);
    } else if (isFull) {
      setStatusGame("Нічия! Спробуйте ще :)");
      setAllGame((prev) => prev + 1);
      showModal();
      setTimerGame(seconds);
      setIsGameOver(true);
    } else {
      setStatusGame("Xодить - " + (isNext ? "ГРАВЕЦЬ 1(✖)" : "ГРАВЕЦЬ 2(◯)"));
    }
  }, [squqres, isNext]);

  //timer
  const [seconds, setSeconds] = useState(0);
  const [timeX, setTimeX] = useState(0);
  const [timeO, setTimeO] = useState(0);
  const [timerGame, setTimerGame] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  function emtyTimer() {
    setSeconds(0);
    setTimeX(0);
    setTimeO(0);
  }

  useEffect(() => {
    if (isGameOver) return;
    const timerGame = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timerGame);
  }, [isGameOver]);

  useEffect(() => {
    if (isGameOver) return;
    const timerGame = setInterval(() => {
      if (isNext) {
        setTimeX((prev) => prev + 1);
      } else {
        setTimeO((prev) => prev + 1);
      }
    }, 1000);
    return () => clearInterval(timerGame);
  }, [isNext, isGameOver]);

  return (
    <div className="app-container">
      <h1 className="title">tic-tac-toe</h1>
      <select value={selectedSize} onChange={changeSize}>
        {[3, 4, 5, 6, 7, 8, 9].map((i) => (
          <option key={i} value={i}>
            {i} x {i}
          </option>
        ))}
      </select>
      <div className="game-container">
        <Board squqres={squqres} size={size} onClick={gameClick} />
        <div className="game-sidebar">
          <Timer time={seconds} timeX={timeX} timeO={timeO} />
          <Info
            statusGame={statusGame}
            winX={winX}
            winO={winO}
            allGame={allGame}
            onReset={resetGame}
          />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        statusGame={statusGame}
        timerGame={timerGame}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default App;
