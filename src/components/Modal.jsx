import close from "../img/close.svg";
import style from "./modal.module.css";

function Modal({ isOpen, statusGame, timerGame, onClose }) {
  if (!isOpen) return null;
  function formatTime(second) {
    const minute = Math.floor(second / 60);
    const sec = second % 60;
    return `${minute.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  }
  return (
    <div>
      <div className={style.overlay} onClick={onClose}></div>
      <div className={style.container}>
        <div className="modal__close">
          <img src={close} alt="close" onClick={onClose} />
          <h1>{statusGame}</h1>
          <p>{formatTime(timerGame)}</p>
          <button onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
}
export default Modal;
