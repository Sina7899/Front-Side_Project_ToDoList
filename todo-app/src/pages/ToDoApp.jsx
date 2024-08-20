import { React, Fragment } from "react";

import { CLASSES } from "../styles/styleClasses.js";

import { Main } from "../components/Main";
import { Input } from "../components/Input.jsx";
import { Button } from "../components/Button.jsx";
import { Nav } from "../components/Nav.jsx";
import { Card } from "../components/Card.jsx";
import { Box } from "../components/Box.jsx";

import testAvatar from "../assets/images/test_avatar.jpg";

import { ReactComponent as AllTasksIcon } from "../assets/icons/list.svg";
import { ReactComponent as IncompleteIcon } from "../assets/icons/edit_note.svg";
import { ReactComponent as CompletedIcon } from "../assets/icons/tv_options_edit_channels.svg";
import { ReactComponent as AddTaskIcon } from "../assets/icons/note_stack_add.svg";

function ToDoApp() {
  const mainProps = {
    ContainerTag: Fragment,
    containerTagProps: null,
    mainStyle: CLASSES.ToDoApp_Page.mainTagStyle,
  };

  const navHeaderContent = (
    <>
      <img
        src={testAvatar}
        alt="User Avatar"
        className={CLASSES.ToDoApp_Page.avatarStyle}
      />
      <p className={CLASSES.ToDoApp_Page.userNameStyle}>Sina Sami</p>
    </>
  );

  const navListItemsContent = (
    <>
      <li className={CLASSES.ToDoApp_Page.listItemsStyle}>
        <AllTasksIcon className={CLASSES.ToDoApp_Page.iconStyle} />
        <span className={CLASSES.ToDoApp_Page.spanStyle}>All Tasks</span>
      </li>
      <li className={CLASSES.ToDoApp_Page.listItemsStyle}>
        <IncompleteIcon className={CLASSES.ToDoApp_Page.iconStyle} />
        <span className={CLASSES.ToDoApp_Page.spanStyle}>Incomplete</span>
      </li>
      <li className={CLASSES.ToDoApp_Page.listItemsStyle}>
        <CompletedIcon className={CLASSES.ToDoApp_Page.iconStyle} />
        <span className={CLASSES.ToDoApp_Page.spanStyle}>Completed</span>
      </li>
    </>
  );

  const navProps = {
    NavHeaderTag: "div",
    navHeaderContent: navHeaderContent,
    NavListItemsTag: "ul",
    navListItems: navListItemsContent,
    navStyle: CLASSES.ToDoApp_Page.navStyle,
    navHeaderStyle: CLASSES.ToDoApp_Page.navHeaderStyle,
    navListItemsStyle: CLASSES.ToDoApp_Page.navListItemsTagStyle,
  };

  const doneButtonProps = {
    buttonType: "button",
    inputValue: "Done",
    buttonOnClick: null,
    buttonStyle: CLASSES.ToDoApp_Page.doneButtonStyle,
  };

  const deleteButtonProps = {
    buttonType: "button",
    inputValue: "Delete",
    buttonOnClick: null,
    buttonStyle: CLASSES.ToDoApp_Page.deleteButtonStyle,
  };

  const completedBadgeProps = {
    buttonType: "button",
    inputValue: "Completed",
    buttonOnClick: null,
    disabled: true,
    buttonStyle: CLASSES.ToDoApp_Page.completedBadgeStyle,
  };

  const cardButtonsContent = (
    <>
      <Button {...doneButtonProps} />
      <Button {...deleteButtonProps} />
      {/* <Button {...completedBadgeProps} /> */}
    </>
  );

  const cardProps = {
    CardTag: "div",
    CardTitleTag: "h2",
    cardTitle: "Task 1",
    cardDescription: "Task 1 Description",
    buttons: cardButtonsContent,
    cardTagStyle: CLASSES.ToDoApp_Page.cardTagStyle,
    cardInfoDivStyle: CLASSES.ToDoApp_Page.cardInfoDivStyle,
    cardTitleTagStyle: CLASSES.ToDoApp_Page.cardTitleTagStyle,
    cardDescriptionStyle: CLASSES.ToDoApp_Page.cardDescriptionStyle,
    cardButtonsDivStyle: CLASSES.ToDoApp_Page.cardButtonsDivStyle,
  };

  const boxTitleInputProps = {
    inputLabelFor: "taskTitle",
    labelText: "",
    inputId: "taskTitle",
    inputName: "task-title",
    inputType: "text",
    inputPattern: "[A-Za-z]+",
    inputPlaceholder: "Task Title...",
    required: true,
    labelStyle: "",
    inputStyle: CLASSES.ToDoApp_Page.boxTitleInputStyle,
  };

  const boxDescriptionTagContent = (
    <textarea
      id="taskDescription"
      name="task-description"
      placeholder="Description..."
      className={CLASSES.ToDoApp_Page.boxDescriptionTextareaStyle}
      autofocus
      required
    ></textarea>
  );

  const boxAddButtonContent = (
    <>
      <button className={CLASSES.ToDoApp_Page.boxAddButtonStyle}>
        <AddTaskIcon />
        <span className={CLASSES.ToDoApp_Page.boxAddButtonSpanStyle}>Add</span>
      </button>
    </>
  );

  const boxProps = {
    BoxContainerTag: "section",
    BoxTitleTag: Input,
    BoxTitleTagProps: boxTitleInputProps,
    BoxTitle: "",
    BoxDescriptionTag: Fragment,
    BoxDescriptionTagProps: null,
    BoxDescription: boxDescriptionTagContent,
    buttons: boxAddButtonContent,
    boxContainerTagStyle: CLASSES.ToDoApp_Page.boxContainerTagStyle,
    boxDataDivStyle: CLASSES.ToDoApp_Page.boxDataDivStyle,
    boxTitleTagStyle: "", //Styled in boxTitleInputProps as input style.
    boxDescriptionTagStyle: "", //Styled in boxDescriptionTagContent as textarea style.
    boxButtonsDivStyle: CLASSES.ToDoApp_Page.boxButtonsDivStyle,
  };

  return (
    <Main {...mainProps}>
      {
        <>
          <Nav {...navProps} />
          <section className={CLASSES.ToDoApp_Page.cardsSectionStyle}>
            <Card {...cardProps} />
            <Card {...cardProps} />
            <Card {...cardProps} />
          </section>
          <Box {...boxProps} />
        </>
      }
    </Main>
  );
}

export { ToDoApp };
