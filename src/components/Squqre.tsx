import {FC} from "react";
import {SquqreValue} from "../App.tsx";

interface SquqreProps {
  value:SquqreValue,
  onClick:() => void
};
const Squqre:FC<SquqreProps> = ({ value, onClick }) => {
  return (
    <button className="squere" onClick={onClick}>
      {value}
    </button>
  );
}

export default Squqre;
