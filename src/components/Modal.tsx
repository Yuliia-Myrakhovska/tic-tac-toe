type ModalProps = {
  isOpen:boolean; 
  statusGame:string;
  timerGame:number; 
  onClose: () => void;
};

const Modal:React.FC<ModalProps> = ({ isOpen, statusGame, timerGame, onClose }) => {
  if (!isOpen) return null;
  function formatTime(second:number):string {
    const minute = Math.floor(second / 60);
    const sec = second % 60;
    return `${minute.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  }
  return (
    <div>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal-container">
        <h1 className="modal-title">{statusGame}</h1>
        <p className="modal-time">Витрачено часу: {formatTime(timerGame)}</p>
        <button className="modal-close" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}
export default Modal;
