function TextArea({
  id,
  value,
  onChange,
  name,
  placeholder,
  textAreaStyle,
  autofocus,
  required,
}) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      className={textAreaStyle}
      autofocus={autofocus}
      required={required}
    ></textarea>
  );
}

export { TextArea };
