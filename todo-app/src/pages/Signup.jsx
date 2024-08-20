import { CLASSES } from "../styles/styleClasses.js";

import { Main } from "../components/Main";
import { Form } from "../components/Form.jsx";
import { Input } from "../components/Input.jsx";
import { Button } from "../components/Button.jsx";

function SignUp() {
  const formProps = {
    FormTitleTag: "h1",
    formTitle: "JUST DO IT!",
    formMethod: "post",
    formAction: "/ToDoApp",
    formTarget: "_self",
    formStyle: CLASSES.SignUp_Page.formStyle,
    formTitleStyle: CLASSES.SignUp_Page.formTitleStyle,
  };

  const mainProps = {
    ContainerTag: Form,
    containerTagProps: formProps,
    mainStyle: CLASSES.SignUp_Page.mainTagStyle,
  };

  const firstNameInputProps = {
    inputLabelFor: "firstname",
    labelText: "First Name",
    inputId: "firstname",
    inputName: "first-name",
    inputType: "text",
    inputPattern: "[A-Za-z]+",
    inputPlaceholder: "Enter Your First Name",
    required: true,
    labelStyle: CLASSES.SignUp_Page.labelStyle,
    inputStyle: CLASSES.SignUp_Page.inputStyle,
  };

  const lastNameInputProps = {
    inputLabelFor: "lastname",
    labelText: "Last Name",
    inputId: "lastname",
    inputName: "last-name",
    inputType: "text",
    inputPattern: "[A-Za-z]+",
    inputPlaceholder: "Enter Your Last Name",
    required: true,
    labelStyle: CLASSES.SignUp_Page.labelStyle,
    inputStyle: CLASSES.SignUp_Page.inputStyle,
  };

  const usernameInputProps = {
    inputLabelFor: "username",
    labelText: "Username",
    inputId: "username",
    inputName: "user-name",
    inputType: "text",
    inputPattern: "[A-Za-z]+",
    inputPlaceholder: "Choose Your Username",
    required: true,
    labelStyle: CLASSES.SignUp_Page.labelStyle,
    inputStyle: CLASSES.SignUp_Page.inputStyle,
  };

  const passwordInputProps = {
    inputLabelFor: "password",
    labelText: "Password",
    inputId: "password",
    inputName: "pass-word",
    inputType: "password",
    inputPattern: "[a-zA-Z0-9]{5,10}",
    inputPlaceholder: "Choose Your Password",
    required: true,
    labelStyle: CLASSES.SignUp_Page.labelStyle,
    inputStyle: CLASSES.SignUp_Page.inputStyle,
  };

  const repeatPasswordInputProps = {
    inputLabelFor: "repeatPassword",
    labelText: "Repeat Password",
    inputId: "repeatPassword",
    inputName: "repeat_pass-word",
    inputType: "password",
    inputPattern: "[a-zA-Z0-9]{5,10}",
    inputPlaceholder: "Repeat Your Password",
    required: true,
    labelStyle: CLASSES.SignUp_Page.labelStyle,
    inputStyle: CLASSES.SignUp_Page.inputStyle,
  };

  const signInButtonProps = {
    buttonType: "submit",
    inputValue: "Sign In",
    buttonOnClick: null,
    buttonStyle: CLASSES.SignUp_Page.signInButtonStyle,
  };

  return (
    <Main {...mainProps}>
      {
        <>
          <fieldset className={CLASSES.SignUp_Page.fieldsetStyle}>
            <Input {...firstNameInputProps} />
            <Input {...lastNameInputProps} />
            <Input {...usernameInputProps} />
            <Input {...passwordInputProps} />
            <Input {...repeatPasswordInputProps} />
          </fieldset>
          <Button {...signInButtonProps} />
        </>
      }
    </Main>
  );
}

export { SignUp };
