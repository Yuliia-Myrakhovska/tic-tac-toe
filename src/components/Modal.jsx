import close from "../img/close.svg";
import style from "./modal.module.css";

function Modal({ isOpen, statusGame, onClose }) {
  if (!isOpen) return null;

  return (
    <div>
      <div className={style.overlay} onClick={onClose}></div>
      <div className={style.container}>
        <div className="modal__close">
          <img src={close} alt="close" onClick={onClose} />
          <h1>{statusGame}</h1>
          <button onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
}
export default Modal;
