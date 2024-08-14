function Form({
  FormTitleTag,
  formTitle,
  formStyle,
  formTitleStyle,
  formMethod,
  formAction,
  formTarget,
  children,
}) {
  return (
    <form
      method={formMethod}
      action={formAction}
      target={formTarget}
      className={formStyle}
    >
      <FormTitleTag className={formTitleStyle}>{formTitle}</FormTitleTag>
      {children}
    </form>
  );
}

export { Form };
