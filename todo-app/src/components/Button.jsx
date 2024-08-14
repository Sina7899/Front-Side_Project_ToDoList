function Button({ buttonType, inputValue, buttonOnClick, buttonStyle }) {
  return (
    <input
      type={buttonType}
      value={inputValue}
      onClick={buttonOnClick}
      className={buttonStyle}
    />
  );
}

export { Button };
