import { useContext, useState, useRef } from "react";

import { Card } from "./Card.jsx";
import { Button } from "./Button.jsx";

import { CLASSES } from "../styles/styleClasses.js";

import { editTaskHandler, deleteTaskHandler } from "../API/todoApp.js";

import { getFromLocalStorage } from "../local-Storage.js";

import { URLS } from "../API/api.js";

import { ToDoAppContexts } from "../store/ToDo_App-context.jsx";

function TasksCard() {
  const {
    taskInfoOnBox,
    setTaskInfoOnBox,
    userTasks,
    taskActions,
    userTasksDispatches,
    setBoxStatus,
    taskComplete,
    setTaskComplete,
  } = useContext(ToDoAppContexts);

  const cardRef = useRef({
    title: "",
    description: "",
    id: "",
  });

  const cardOnClick = (title, description, cardKey, cardStatus) => {
    setBoxStatus(false);
    cardRef.current.title = title;
    cardRef.current.description = description;
    cardRef.current.id = cardKey;
    setTaskInfoOnBox({
      ...taskInfoOnBox,
      status: cardStatus,
      title: title,
      description: description,
      id: cardKey,
    });
  };

  const [taskProcessLoading, setTaskProcessLoading] = useState(false);

  function handleEditTask(url, data, token) {
    editTaskHandler(url, data, token).then((res) => {
      if (res) {
        console.log(res);
        userTasksDispatches({
          type: taskActions.DONE_TASK,
          payload: {
            taskId: res.updatedTask[0].task_id,
            status: res.updatedTask[0].status,
          },
        });
        setTaskProcessLoading(false);
        setTaskComplete(true);
      }
    });
  }

  function handleDeleteTask(url, data, token) {
    deleteTaskHandler(url, data, token).then((res) => {
      if (res) {
        userTasksDispatches({
          type: taskActions.DELETE_TASK,
          payload: {
            taskId: cardRef.current.id,
          },
        });
        setTaskProcessLoading(false);
      }
    });
  }

  const doneButtonOnClick = (e) => {
    e.preventDefault();
    setTaskProcessLoading(true);
    handleEditTask(
      `http://${URLS.baseURL}/api/tasks`,
      {
        taskId: cardRef.current.id,
        title: cardRef.current.title,
        description: cardRef.current.description,
        status: true,
      },
      getFromLocalStorage("JWT")
    );
    setTaskInfoOnBox({
      ...taskInfoOnBox,
      status: true,
    });
  };

  const deleteButtonOnClick = (e) => {
    setTaskProcessLoading(true);
    handleDeleteTask(
      `http://${URLS.baseURL}/api/tasks/${cardRef.current.id}`,
      "",
      getFromLocalStorage("JWT")
    );
  };

  const cardButtonsProps = {
    doneButtonProps: {
      buttonType: "button",
      inputValue: taskProcessLoading ? "Loading..." : "Done",
      buttonOnClick: doneButtonOnClick,
      disabled: false,
      buttonStyle: CLASSES.ToDoApp_Page.doneButtonStyle,
    },
    deleteButtonProps: {
      buttonType: "button",
      inputValue: taskProcessLoading ? "Loading..." : "Delete",
      buttonOnClick: deleteButtonOnClick,
      disabled: false,
      buttonStyle: CLASSES.ToDoApp_Page.deleteButtonStyle,
    },
    completedBadgeProps: {
      buttonType: "button",
      inputValue: "Completed",
      buttonOnClick: null,
      disabled: true,
      buttonStyle: CLASSES.ToDoApp_Page.completedBadgeStyle,
    },
    notCompletedBadgeProps: {
      buttonType: "button",
      inputValue: "In-Progress",
      buttonOnClick: null,
      disabled: true,
      buttonStyle: CLASSES.ToDoApp_Page.inCompletedBadgeStyle,
    },
  };

  const cardButtonsAlternatives = {
    default: (
      <>
        <Button {...cardButtonsProps.doneButtonProps} />
        <Button {...cardButtonsProps.deleteButtonProps} />
      </>
    ),
    complete: <Button {...cardButtonsProps.completedBadgeProps} />,
    inComplete: <Button {...cardButtonsProps.notCompletedBadgeProps} />,
  };

  const cardProps = {
    CardTag: "div",
    CardTitleTag: "h2",
    cardOnClick: cardOnClick,
    cardInfoDivStyle: CLASSES.ToDoApp_Page.cardInfoDivStyle,
    cardTitleTagStyle: CLASSES.ToDoApp_Page.cardTitleTagStyle,
    cardDescriptionStyle: CLASSES.ToDoApp_Page.cardDescriptionStyle,
    cardButtonsDivStyle: CLASSES.ToDoApp_Page.cardButtonsDivStyle,
  };

  return (
    <>
      {userTasks.length === 0 ? (
        <h3>No Task Added yet!</h3>
      ) : (
        userTasks.map((task) => {
          let cardButtons = cardButtonsAlternatives.inComplete;
          if (task.status === true) {
            cardButtons = cardButtonsAlternatives.complete;
          } else if (taskComplete === true && task.status === true) {
            cardButtons = cardButtonsAlternatives.complete;
          } else if (cardRef.current.id === task.task_id) {
            cardButtons = cardButtons = cardButtonsAlternatives.default;
          }
          return (
            <Card
              cardStatus={task.status}
              cardKey={task.task_id}
              cardTitle={task.title}
              cardDescription={task.description}
              buttons={cardButtons}
              cardTagStyle={
                cardRef.current.id === task.task_id
                  ? "flex justify-between items-center w-[468px] min-h-[90px] p-[0px_20px] bg-White_W3 rounded-[5px] hover:cursor-pointer border-solid border-2 border-sky-500"
                  : "flex justify-between items-center w-[468px] min-h-[90px] p-[0px_20px] bg-White_W3 rounded-[5px] hover:cursor-pointer"
              }
              {...cardProps}
            />
          );
        })
      )}
    </>
  );
}

export { TasksCard };
