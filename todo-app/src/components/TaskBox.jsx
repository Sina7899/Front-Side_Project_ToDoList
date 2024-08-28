import { Fragment, useContext, useState } from "react";

import { Input } from "./Input.jsx";
import { TextArea } from "./TextArea.jsx";
import { Box } from "./Box.jsx";

import { CLASSES } from "../styles/styleClasses.js";

import { ToDoAppContexts } from "../store/ToDo_App-context.jsx";

import { ReactComponent as AddTaskIcon } from "../assets/icons/note_stack_add.svg";

import { getFromLocalStorage } from "../local-Storage.js";

import { addTaskHandler, editTaskHandler } from "../API/todoApp.js";

import { URLS } from "../API/api.js";

function TaskBox() {
  const {
    taskInfoOnBox,
    setTaskInfoOnBox,
    boxStatus,
    setBoxStatus,
    userTasksDispatches,
    taskActions,
    taskComplete,
    setTaskComplete,
  } = useContext(ToDoAppContexts);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  const handleTitleChangeForAddTask = (event) => {
    setNewTask((prevInfo) => ({
      ...prevInfo,
      title: event.target.value,
    }));
  };

  const handleTitleChangeForEditTask = (event) => {
    setTaskInfoOnBox((prevInfo) => ({
      ...prevInfo,
      title: event.target.value,
    }));
  };

  const handleDescriptionChangeForAddTask = (event) => {
    setNewTask((prevInfo) => ({
      ...prevInfo,
      description: event.target.value,
    }));
  };

  const handleDescriptionChangeForEditTask = (event) => {
    setTaskInfoOnBox((prevInfo) => ({
      ...prevInfo,
      description: event.target.value,
    }));
  };

  const [taskProcessLoading, setTaskProcessLoading] = useState(false);

  function handleAddTask(url, data, token) {
    addTaskHandler(url, data, token).then((res) => {
      if (res) {
        console.log(res);
        userTasksDispatches({
          type: taskActions.ADD_TASK,
          payload: { newTask: res.newTask },
        });
        setTaskProcessLoading(false);
        setNewTask({ ...newTask, title: "", description: "" });
      }
    });
  }

  function handleEditTask(url, data, token) {
    editTaskHandler(url, data, token).then((res) => {
      if (res) {
        console.log(res);
        userTasksDispatches({
          type: taskActions.EDIT_TASK,
          payload: {
            taskId: res.updatedTask[0].task_id,
            newTitle: res.updatedTask[0].title,
            newDescription: res.updatedTask[0].description,
          },
        });
        setTaskProcessLoading(false);
      }
    });
  }

  const addTaskButtonOnClick = (e) => {
    e.preventDefault();
    setTaskProcessLoading(true);
    setTaskComplete(false);
    handleAddTask(
      `http://${URLS.baseURL}/api/tasks`,
      {
        title: newTask.title,
        description: newTask.description,
      },
      getFromLocalStorage("JWT")
    );
  };

  const editTaskButtonOnClick = (e) => {
    e.preventDefault();
    setTaskProcessLoading(true);
    handleEditTask(
      `http://${URLS.baseURL}/api/tasks`,
      {
        taskId: taskInfoOnBox.id,
        title: taskInfoOnBox.title,
        description: taskInfoOnBox.description,
        status: false,
      },
      getFromLocalStorage("JWT")
    );
  };

  function resetButtonOnClick() {
    setBoxStatus(true);
    setNewTask({ ...newTask, title: "", description: "" });
  }

  const boxButtonsAlternatives = {
    addButton: (
      <>
        <button
          onClick={addTaskButtonOnClick}
          className={CLASSES.ToDoApp_Page.boxAddButtonStyle}
          disabled={taskProcessLoading}
        >
          {taskProcessLoading ? undefined : <AddTaskIcon />}
          <span className={CLASSES.ToDoApp_Page.boxButtonsSpanStyle}>
            {taskProcessLoading ? "Loading..." : "Add"}
          </span>
        </button>
      </>
    ),
    editButton: (
      <>
        <button
          onClick={editTaskButtonOnClick}
          className={CLASSES.ToDoApp_Page.boxAddButtonStyle}
          disabled={taskProcessLoading}
        >
          <span className={CLASSES.ToDoApp_Page.boxButtonsSpanStyle}>
            {taskProcessLoading ? "Loading..." : "Edit"}
          </span>
        </button>
      </>
    ),
    resetButton: (
      <>
        <button
          onClick={resetButtonOnClick}
          className={CLASSES.ToDoApp_Page.boxResetButtonStyle}
        >
          <span className={CLASSES.ToDoApp_Page.boxButtonsSpanStyle}>
            Reset
          </span>
        </button>
      </>
    ),
  };

  let boxTitleInputProps = {
    inputLabelFor: "taskTitle",
    labelText: "",
    inputId: "taskTitle",
    inputName: "task-title",
    inputType: "text",
    inputPattern: "[A-Za-z]+",
    inputPlaceholder: "Task Title...",
    required: true,
    inputValue: newTask.title,
    inputOnChange: handleTitleChangeForAddTask,
    labelStyle: "",
    inputStyle: CLASSES.ToDoApp_Page.boxTitleInputStyle,
  };

  let boxDescriptionTagProps = {
    id: "taskDescription",
    value: newTask.description,
    onChange: handleDescriptionChangeForAddTask,
    name: "task-description",
    placeholder: "Description...",
    textAreaStyle: CLASSES.ToDoApp_Page.boxDescriptionTextareaStyle,
    autofocus: true,
    required: true,
  };

  let boxProps = {
    BoxContainerTag: "section",
    BoxTitleTag: Input,
    BoxTitleTagProps: boxTitleInputProps,
    BoxDescriptionTag: TextArea,
    BoxDescriptionTagProps: boxDescriptionTagProps,
    BoxDescription: null,
    buttons: boxButtonsAlternatives.addButton,
    boxContainerTagStyle: CLASSES.ToDoApp_Page.boxContainerTagStyle,
    boxDataDivStyle: CLASSES.ToDoApp_Page.boxDataDivStyle,
    boxTitleTagStyle: "", //Styled in boxTitleInputProps as input style.
    boxDescriptionTagStyle: "", //Styled in boxDescriptionTagProps as textarea style.
    boxButtonsDivStyle: CLASSES.ToDoApp_Page.boxButtonsDivStyle,
  };

  if (!boxStatus) {
    boxTitleInputProps.inputValue = taskInfoOnBox.title;
    boxTitleInputProps.inputOnChange = handleTitleChangeForEditTask;

    if (taskInfoOnBox.status === true || taskComplete === true) {
      boxProps.buttons = boxButtonsAlternatives.resetButton;
      setTaskComplete(false);
    } else {
      boxProps.buttons = (
        <>
          {boxButtonsAlternatives.editButton}
          {boxButtonsAlternatives.resetButton}
        </>
      );
    }

    boxDescriptionTagProps.value = taskInfoOnBox.description;
    boxDescriptionTagProps.onChange = handleDescriptionChangeForEditTask;
  }

  return <Box {...boxProps} />;
}

export { TaskBox };
