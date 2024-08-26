function Input({
  inputLabelFor,
  labelText,
  inputId,
  inputName,
  inputType,
  inputPattern,
  inputPlaceholder,
  required,
  inputRef,
  inputValue,
  inputOnChange,
  labelStyle,
  inputStyle,
}) {
  return (
    <label for={inputLabelFor} className={labelStyle}>
      {labelText}
      <input
        id={inputId}
        value={inputValue}
        ref={inputRef}
        name={inputName}
        type={inputType}
        pattern={inputPattern}
        placeholder={inputPlaceholder}
        required={required}
        onChange={inputOnChange}
        className={inputStyle}
      />
    </label>
  );
}

export { Input };
