import React, { useState, useEffect, FC } from "react";
import Board from "./components/Board.tsx";
import Info from "./components/Info.tsx";
import Modal from "./components/Modal.tsx";
import Timer from "./components/Timer.tsx";
import "./App.css";

export type SquqreValue = "✖" | "◯" | null;

function getOptions(size: number = 3):number[][] {
  const options:number[][] = [];

  for (let i = 0; i < size; i++) {
    const row:number[] = [];
    const col:number[] = [];
    for (let j = 0; j < size; j++) {
      row.push(i * size + j);
      col.push(j * size + i);
    }
    options.push(row);
    options.push(col);
  }

  const diag:number[] = [];
  const diag2:number[] = [];

  for (let i = 0; i < size; i++) {
    diag.push(i * size + i);
    diag2.push(i * size + (size - (i + 1)));
  }
  options.push(diag);
  options.push(diag2);

  return options;
}
function getWinner(squqres:SquqreValue[], size:number):SquqreValue {
  const options = getOptions(size);

  for (let line of options) {
    const first = squqres[line[0]];

    if (first && line.every((i) => squqres[i] === first)) {
      return first;
    }
  }
  return null;
}
const App: React.FC = () =>{
  const [isNext, setIsNext] = useState<boolean>(true);
  const [size, setSize] = useState<number>(3);
  const [selectedSize, setSelectedSize] = useState<number>(3);
  const [squqres, setSquqres] = useState<SquqreValue[]>(Array(size * size).fill(null));
  const [winX, setWinX] = useState<number>(0);
  const [winO, setWinO] = useState<number>(0);
  const [allGame, setAllGame] = useState<number>(0);
  const [statusGame, setStatusGame] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [seconds, setSeconds] = useState<number>(0);
  const [timeX, setTimeX] = useState<number>(0);
  const [timeO, setTimeO] = useState<number>(0);
  const [timerGame, setTimerGame] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  function emtyTimer() {
    setSeconds(0);
    setTimeX(0);
    setTimeO(0);
  }

  function resetGame() {
    setSize(selectedSize);
    setSquqres(Array(selectedSize * selectedSize).fill(null));
    setIsNext(true);
    emtyTimer();
    setIsGameOver(false);
    setTimerGame(0);
  }

  function changeSize(e: React.ChangeEvent<HTMLSelectElement>) {
    const newSize = parseInt(e.target.value, 10);
    setSelectedSize(newSize);
  }

  function gameClick(i:number) {
    const newSquqres = [...squqres];
    if (getWinner(squqres, size) || newSquqres[i]) {
      return;
    }
    newSquqres[i] = isNext ? "✖" : "◯";
    setSquqres(newSquqres);
    setIsNext(!isNext);
  }

  useEffect(() => {
    const winner = getWinner(squqres, size);
    const isFull = squqres.every((cell) => cell !== null);

    if (winner) {
      if (winner === "✖") {
        setStatusGame("Переміг: ігрок 1.  Вітаємо!");
        setWinX((prev) => prev + 1);

        setTimerGame(timeX);
        setIsGameOver(true);
      } else {
        setStatusGame("Переміг: ігрок 2.  Вітаємо!");
        setWinO((prev) => prev + 1);

        setTimerGame(timeO);
        setIsGameOver(true);
      }
      setAllGame((prev) => prev + 1);
    } else if (isFull) {
      setStatusGame("Нічия! Спробуйте ще :)");
      setAllGame((prev) => prev + 1);

      setTimerGame(seconds);
      setIsGameOver(true);
    } else {
      setStatusGame("Xодить - " + (isNext ? "ГРАВЕЦЬ 1(✖)" : "ГРАВЕЦЬ 2(◯)"));
    }
  }, [squqres, isNext]);

  useEffect(() => {
    if (isGameOver) return;
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
      if (isNext) {
        setTimeX((prev) => prev + 1);
      } else {
        setTimeO((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isNext, isGameOver]);

  useEffect(() => {
    if (isGameOver) {
      const timeout = setTimeout(() => {
        setIsModalOpen(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isGameOver]);

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
