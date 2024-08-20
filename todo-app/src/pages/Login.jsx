import { useNavigate } from "react-router-dom";

import { CLASSES } from "../styles/styleClasses.js";

import { Main } from "../components/Main.jsx";
import { Form } from "../components/Form.jsx";
import { Input } from "../components/Input.jsx";
import { Button } from "../components/Button.jsx";

function LoginPage() {
  const formProps = {
    FormTitleTag: "h1",
    formTitle: "JUST DO IT!",
    formMethod: "get",
    formAction: "/ToDoApp",
    formTarget: "_self",
    formStyle: CLASSES.Login_Page.formStyle,
    formTitleStyle: CLASSES.Login_Page.formTitleStyle,
  };

  const mainProps = {
    ContainerTag: Form,
    containerTagProps: formProps,
    mainStyle: CLASSES.Login_Page.mainTagStyle,
  };

  const usernameInputProps = {
    inputLabelFor: "username",
    labelText: "Username",
    inputId: "username",
    inputName: "user-name",
    inputType: "text",
    inputPattern: "[A-Za-z]+",
    inputPlaceholder: "Enter Username",
    required: true,
    labelStyle: CLASSES.Login_Page.labelStyle,
    inputStyle: CLASSES.Login_Page.inputStyle,
  };

  const passwordInputProps = {
    inputLabelFor: "password",
    labelText: "Password",
    inputId: "password",
    inputName: "pass-word",
    inputType: "password",
    inputPattern: "[a-zA-Z0-9]{5,10}",
    inputPlaceholder: "Enter password",
    required: true,
    labelStyle: CLASSES.Login_Page.labelStyle,
    inputStyle: CLASSES.Login_Page.inputStyle,
  };

  const loginButtonProps = {
    buttonType: "submit",
    inputValue: "Log in",
    buttonOnClick: null,
    buttonStyle: CLASSES.Login_Page.loginButtonStyle,
  };

  const navigate = useNavigate();

  const signUpButtonProps = {
    buttonType: "button",
    inputValue: "Sign up",
    buttonOnClick: () => {
      navigate("/Signup");
    },
    buttonStyle: CLASSES.Login_Page.signUpButtonStyle,
  };

  return (
    <Main {...mainProps}>
      {
        <>
          <section className={CLASSES.Login_Page.loginSection}>
            <fieldset className={CLASSES.Login_Page.fieldsetStyle}>
              <Input {...usernameInputProps} />
              <Input {...passwordInputProps} />
            </fieldset>
            <Button {...loginButtonProps} />
          </section>
          <Button {...signUpButtonProps} />
        </>
      }
    </Main>
  );
}

export { LoginPage };
