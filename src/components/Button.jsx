import "../styles/components.css";

function Button({ text, onClick }) {
  return (
    <button className="primary-btn" onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
