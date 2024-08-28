import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CLASSES } from "../styles/styleClasses.js";

import { Main } from "../components/Main";
import { Form } from "../components/Form.jsx";
import { Input } from "../components/Input.jsx";
import { Button } from "../components/Button.jsx";

import { signUpHandler } from "../API/signUp_In.js";
import { URLS } from "../API/api.js";

function SignUp() {
  const [signUpFormData, setSignUpFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    repeat_password: "",
  });

  const handleSignUpInputsChange = (e) => {
    setSignUpFormData({
      ...signUpFormData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  function signUpButtonOnClick(
    signUpRoute,
    userSingUpData,
    signInRoute,
    userSingInData
  ) {
    signUpHandler(
      signUpRoute,
      userSingUpData,
      signInRoute,
      userSingInData
    ).then((res) => {
      if (res) {
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
    inputName: "firstName",
    inputType: "text",
    inputPattern: null,
    inputPlaceholder: "Enter Your First Name",
    required: true,
    inputOnChange: handleSignUpInputsChange,
    labelStyle: CLASSES.SignUp_Page.labelStyle,
    inputStyle: CLASSES.SignUp_Page.inputStyle,
  };

  const lastNameInputProps = {
    inputLabelFor: "lastname",
    labelText: "Last Name",
    inputId: "lastname",
    inputName: "lastName",
    inputType: "text",
    inputPattern: null,
    inputPlaceholder: "Enter Your Last Name",
    required: true,
    inputOnChange: handleSignUpInputsChange,
    labelStyle: CLASSES.SignUp_Page.labelStyle,
    inputStyle: CLASSES.SignUp_Page.inputStyle,
  };

  const usernameInputProps = {
    inputLabelFor: "user-name",
    labelText: "Username",
    inputId: "user-name",
    inputName: "username",
    inputType: "text",
    inputPattern: "^[a-zA-Z0-9._]{3,}$",
    inputPlaceholder: "Choose Your Username",
    required: true,
    inputOnChange: handleSignUpInputsChange,
    labelStyle: CLASSES.SignUp_Page.labelStyle,
    inputStyle: CLASSES.SignUp_Page.inputStyle,
  };

  const passwordInputProps = {
    inputLabelFor: "pass-word",
    labelText: "Password",
    inputId: "pass-word",
    inputName: "password",
    inputType: "password",
    inputPattern: "[a-zA-Z0-9]{5,20}",
    inputPlaceholder: "Choose Your Password",
    required: true,
    inputOnChange: handleSignUpInputsChange,
    labelStyle: CLASSES.SignUp_Page.labelStyle,
    inputStyle: CLASSES.SignUp_Page.inputStyle,
  };

  const repeatPasswordInputProps = {
    inputLabelFor: "repeatPassword",
    labelText: "Repeat Password",
    inputId: "repeatPassword",
    inputName: "repeat_password",
    inputType: "password",
    inputPattern: "[a-zA-Z0-9]{5,20}",
    inputPlaceholder: "Repeat Your Password",
    required: true,
    inputOnChange: handleSignUpInputsChange,
    labelStyle: CLASSES.SignUp_Page.labelStyle,
    inputStyle: CLASSES.SignUp_Page.inputStyle,
  };

  const userSignUpData = signUpFormData;

  const userSignInData = {
    username: signUpFormData.username,
    password: signUpFormData.password,
  };

  const signInButtonProps = {
    buttonType: "submit",
    inputValue: "Sign In",
    buttonOnClick: (e) => {
      e.preventDefault();
      signUpButtonOnClick(
        `http://${URLS.baseURL}/api/signup`,
        userSignUpData,
        `http://${URLS.baseURL}/api/login`,
        userSignInData
      );
    },
    disabled: false,
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
