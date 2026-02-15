import "../styles/components.css";

function Button({ text, onClick, disabled }) {
  return (
    <button className="primary-btn" onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}

export default Button;
