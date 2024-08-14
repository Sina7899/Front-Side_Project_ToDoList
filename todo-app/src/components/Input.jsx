function Input({
  inputLabelFor,
  labelText,
  inputId,
  inputName,
  inputType,
  inputPattern,
  inputPlaceholder,
  required,
  labelStyle,
  inputStyle,
}) {
  return (
    <label for={inputLabelFor} className={labelStyle}>
      {labelText}
      <input
        id={inputId}
        name={inputName}
        type={inputType}
        pattern={inputPattern}
        placeholder={inputPlaceholder}
        required={required}
        className={inputStyle}
      />
    </label>
  );
}

export { Input };
