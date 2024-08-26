import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CLASSES } from "../styles/styleClasses.js";

import { Main } from "../components/Main.jsx";
import { Form } from "../components/Form.jsx";
import { Input } from "../components/Input.jsx";
import { Button } from "../components/Button.jsx";

import { URLS } from "../API/api.js";

import { ToDoAppContexts } from "../store/ToDo_App-context.jsx";

import { getTasksRequest } from "../API/todoApp.js";

function LoginPage() {
  const CONTEXTS = useContext(ToDoAppContexts);

  const [logInFormData, setlogInFormData] = useState({
    username: "",
    password: "",
  });

  const handleSignUpInputsChange = (e) => {
    setlogInFormData({
      ...logInFormData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  function logInHandler(logInRoute, userLogInData) {
    CONTEXTS.singInHandler(logInRoute, userLogInData).then((response) => {
      if (response) {
        navigate("/ToDoApp");
      }
    });
  }

  const formProps = {
    FormTitleTag: "h1",
    formTitle: "JUST DO IT!",
    formMethod: null,
    formAction: "#",
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
    inputLabelFor: "user-name",
    labelText: "Username",
    inputId: "user-name",
    inputName: "username",
    inputType: "text",
    inputPattern: "[A-Za-z]+",
    inputPlaceholder: "Enter Username",
    required: true,
    inputOnChange: handleSignUpInputsChange,
    labelStyle: CLASSES.Login_Page.labelStyle,
    inputStyle: CLASSES.Login_Page.inputStyle,
  };

  const passwordInputProps = {
    inputLabelFor: "pas-sword",
    labelText: "Password",
    inputId: "pass-word",
    inputName: "password",
    inputType: "password",
    inputPattern: "[a-zA-Z0-9]{5,10}",
    inputPlaceholder: "Enter password",
    required: true,
    inputOnChange: handleSignUpInputsChange,
    labelStyle: CLASSES.Login_Page.labelStyle,
    inputStyle: CLASSES.Login_Page.inputStyle,
  };

  const loginButtonProps = {
    buttonType: "submit",
    inputValue: "Log in",
    buttonOnClick: (e) => {
      e.preventDefault();
      logInHandler(`http://${URLS.baseURL}/api/login`, logInFormData);
    },
    buttonStyle: CLASSES.Login_Page.loginButtonStyle,
  };

  const signUpButtonProps = {
    buttonType: "button",
    inputValue: "Sign up",
    buttonOnClick: () => navigate("/Signup"),
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
