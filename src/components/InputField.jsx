import "../styles/components.css";

function InputField({ label, type, placeholder, value, onChange, disabled }) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}

export default InputField;
