function Button({
  buttonType,
  inputValue,
  buttonOnClick,
  disabled,
  buttonStyle,
}) {
  return (
    <input
      type={buttonType}
      value={inputValue}
      onClick={buttonOnClick}
      disabled={disabled}
      className={buttonStyle}
    />
  );
}

export { Button };
