import {
  mainProps,
  firstNameInputProps,
  lastNameInputProps,
  usernameInputProps,
  passwordInputProps,
  repeatPasswordInputProps,
  signInButtonProps,
} from "./props/singinPropsData.js";

import { CLASSES } from "../styles/styleClasses.js";

import { Main } from "../components/Main";
import { Input } from "../components/Input.jsx";
import { Button } from "../components/Button.jsx";

function SignUp() {
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
