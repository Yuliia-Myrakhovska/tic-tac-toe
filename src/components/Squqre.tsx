import {SquqreValue} from "../App.tsx";

type SquqreProps = {
  value:SquqreValue; 
  onClick:() => void;
};
const Squqre:React.FC<SquqreProps> = ({ value, onClick }) => {
  return (
    <button className="squere" onClick={onClick}>
      {value}
    </button>
  );
}

export default Squqre;
