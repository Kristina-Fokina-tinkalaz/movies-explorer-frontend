
import "./InfoTooltip.css";

function InfoTooltip(props) {
  return (
    <div
      className={`popup overlay-light ` + (props.isOpen ? "popup__opened" : "")}
      id={`popup-info-tooltip`}
    >
      <div className="tooltip">
        <img src={props.img} className="tooltip__image" alt="error"/>
        <p className="tooltip__text">{props.text}</p>
        <button type="reset" className="close-icon" onClick={props.onClose} />
      </div>
    </div>
  );
}
export default InfoTooltip;