import Squqre from "./Squqre.tsx";
import {SquqreValue} from "../App.tsx";
import React,{FC} from "react";

type BoardProps = {
  squqres:SquqreValue[]; 
  size:number; 
  onClick:(i:number) => void; 
}

const Board: React.FC<BoardProps> = ({ squqres, size, onClick }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gridTemplateRows: `repeat(${size}, 1fr)`,
        gap: "5px",
        width: "500px",
        height: "500px",
      }}
    >
      {squqres.map((item, index) => (
        <Squqre key={index} value={item} onClick={() => onClick(index)} />
      ))}
    </div>
  );
}

export default Board;
