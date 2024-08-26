import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CLASSES } from "../styles/styleClasses.js";

import { Main } from "../components/Main";
import { Form } from "../components/Form.jsx";
import { Input } from "../components/Input.jsx";
import { Button } from "../components/Button.jsx";

import { ToDoAppContexts } from "../store/ToDo_App-context.jsx";

import { signUp_InRequest } from "../API/signUp_In.js";
import { URLS } from "../API/api.js";

function SignUp() {
  const CONTEXTS = useContext(ToDoAppContexts);

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

  function capitalizeFirstLetter(word) {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  function userInfoAddToLS(firstName, lastName, username) {
    CONTEXTS.localStorage.add("firstName", capitalizeFirstLetter(firstName));
    CONTEXTS.localStorage.add("lastName", capitalizeFirstLetter(lastName));
    CONTEXTS.localStorage.add("username", username);
  }

  function signUpHandler(
    signUpRoute,
    userSingUpData,
    signInRoute,
    userSingInData
  ) {
    signUp_InRequest(signUpRoute, userSingUpData)
      .then((response) => {
        if (response.status === 201) {
          userInfoAddToLS(
            userSingUpData.firstName,
            userSingUpData.lastName,
            userSingUpData.username
          );
          console.log("Request was successful:", response.data);
          CONTEXTS.singInHandler(signInRoute, userSingInData).then((res) => {
            if (res) {
              navigate("/ToDoApp");
            }
          });
        } else {
          console.log("Request was not successful:", response);
          alert(response.request.response);
        }
      })
      .catch((error) => {
        console.error("There was an error making the request:", error);
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
      signUpHandler(
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
