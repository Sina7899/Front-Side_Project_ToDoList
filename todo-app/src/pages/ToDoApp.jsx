import {
  Fragment,
  useContext,
  useEffect,
  useReducer,
  useState,
  useCallback,
} from "react";

import { CLASSES } from "../styles/styleClasses.js";

import Avatar from "boring-avatars";

import { Main } from "../components/Main";
import { Input } from "../components/Input.jsx";
import { Button } from "../components/Button.jsx";
import { Nav } from "../components/Nav.jsx";
import { Card } from "../components/Card.jsx";
import { Box } from "../components/Box.jsx";

import { ReactComponent as AllTasksIcon } from "../assets/icons/list.svg";
import { ReactComponent as IncompleteIcon } from "../assets/icons/edit_note.svg";
import { ReactComponent as CompletedIcon } from "../assets/icons/tv_options_edit_channels.svg";
import { ReactComponent as AddTaskIcon } from "../assets/icons/note_stack_add.svg";

import { ToDoAppContexts } from "../store/ToDo_App-context.jsx";

import {
  getTasksRequest,
  addTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
} from "../API/todoApp.js";
import { URLS } from "../API/api.js";

function ToDoApp() {
  const CONTEXTS = useContext(ToDoAppContexts);

  const TASK_ACTIONS = {
    GET_TASK: "get-task",
    ADD_TASK: "add-task",
    EDIT_TASK: "edit-task",
    DELETE_TASK: "delete-task",
  };

  const [userTasks, dispatch] = useReducer(reducer, []);
  const [isLoading, setIsLoading] = useState(true);

  function getTasksHandler(url, params, token) {
    return getTasksRequest(url, params, token)
      .then((response) => {
        if (response.status === 200) {
          console.log("Request was successful:", response.data);
          let responseData = {
            tasks: response.data.tasks,
            userInfo: response.data.userInfo,
          };
          CONTEXTS.localStorage.add(
            "firstName",
            response.data.userInfo.firstName
          );
          CONTEXTS.localStorage.add(
            "lastName",
            response.data.userInfo.lastName
          );
          return responseData;
        } else {
          console.log("Request was not successful:", response);
          alert(response.request.response);
        }
      })
      .catch((error) => {
        console.error("There was an error making the request:", error);
      });
  }

  function addTaskHandler(url, data, token) {
    return addTaskRequest(url, data, token)
      .then((response) => {
        if (response.status === 201) {
          console.log("Request was successful:", response.data);
          return true;
        } else {
          console.log("Request was not successful:", response);
          alert(response.request.response);
        }
      })
      .catch((error) => {
        console.error("There was an error making the request:", error);
      });
  }

  function reducer(userTasks, action) {
    switch (action.type) {
      case TASK_ACTIONS.GET_TASK:
        return [...userTasks, ...action.payload.tasks];

      case TASK_ACTIONS.ADD_TASK:
        return [...userTasks, ...action.payload.newTask];

      default:
        return userTasks;
    }
  }

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasksHandler(
          `http://${URLS.baseURL}/api/tasks`,
          "",
          CONTEXTS.localStorage.get("JWT")
        );
        if (response) {
          dispatch({
            type: TASK_ACTIONS.GET_TASK,
            payload: { tasks: response.tasks },
          });
        }
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  function playerAvatar(userName) {
    const variant = "beam";
    const size = 90;
    const colors = ["#2473ce", "#6aa5e7", "#062f64"];
    let avatarTag = (
      <Avatar
        name={userName}
        size={size}
        variant={variant}
        colors={colors}
        id="avatar"
        className=""
      />
    );

    return avatarTag;
  }

  const mainProps = {
    ContainerTag: Fragment,
    containerTagProps: null,
    mainStyle: CLASSES.ToDoApp_Page.mainTagStyle,
  };

  const userInfo = {
    firstName: CONTEXTS.localStorage.get("firstName"),
    lastName: CONTEXTS.localStorage.get("lastName"),
  };

  const userName = `${userInfo.firstName} ${userInfo.lastName}`;

  const avatarTag = playerAvatar(userInfo.firstName);

  const navHeaderContent = (
    <>
      {avatarTag}
      <p className={CLASSES.ToDoApp_Page.userNameStyle}>{userName}</p>
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

  const cardButtonsProps = {
    doneButtonProps: {
      buttonType: "button",
      inputValue: "Done",
      buttonOnClick: null,
      buttonStyle: CLASSES.ToDoApp_Page.doneButtonStyle,
    },
    deleteButtonProps: {
      buttonType: "button",
      inputValue: "Delete",
      buttonOnClick: null,
      buttonStyle: CLASSES.ToDoApp_Page.deleteButtonStyle,
    },
    completedBadgeProps: {
      buttonType: "button",
      inputValue: "Completed",
      buttonOnClick: null,
      disabled: true,
      buttonStyle: CLASSES.ToDoApp_Page.completedBadgeStyle,
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
  };

  const [viewTaskOnBoxInfo, setViewTaskOnBoxInfo] = useState({
    title: "",
    description: "",
    id: "",
  });

  const handleCardClick = (title, description, cardKey) => {
    setViewTaskOnBoxInfo({
      ...viewTaskOnBoxInfo,
      title: title,
      description: description,
      id: cardKey,
    });
    setBoxButtons(boxButtonsAlternatives.editButton);
  };

  const [cardButtons, setCardButtons] = useState(
    cardButtonsAlternatives.default
  );

  const cardProps = {
    CardTag: "div",
    CardTitleTag: "h2",
    buttons: cardButtons,
    cardOnClick: handleCardClick,
    cardTagStyle: CLASSES.ToDoApp_Page.cardTagStyle,
    cardInfoDivStyle: CLASSES.ToDoApp_Page.cardInfoDivStyle,
    cardTitleTagStyle: CLASSES.ToDoApp_Page.cardTitleTagStyle,
    cardDescriptionStyle: CLASSES.ToDoApp_Page.cardDescriptionStyle,
    cardButtonsDivStyle: CLASSES.ToDoApp_Page.cardButtonsDivStyle,
  };

  const handleTitleChange = (event) => {
    setViewTaskOnBoxInfo((prevInfo) => ({
      ...prevInfo,
      title: event.target.value,
    }));
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
    inputValue: viewTaskOnBoxInfo.title,
    inputOnChange: handleTitleChange,
    labelStyle: "",
    inputStyle: CLASSES.ToDoApp_Page.boxTitleInputStyle,
  };
  const [test, setTest] = useState("");

  const handleDescriptionChange = (event) => {
    setTest(event.target.value);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    console.log("State on click:", test);
  };

  const boxDescriptionTagContent = (
    <textarea
      id="taskDescription"
      value={test}
      onChange={handleDescriptionChange}
      name="task-description"
      placeholder="Description..."
      className={CLASSES.ToDoApp_Page.boxDescriptionTextareaStyle}
      autofocus
      required
    ></textarea>
  );

  // function addTaskButtonHandler(url, data, token) {
  //   addTaskHandler(url, data, token).then((res) => {
  //     if (res) {
  //       dispatch({
  //         type: TASK_ACTIONS.ADD_TASK,
  //         payload: { tasks: res.newTask },
  //       });
  //     }
  //   });
  // }

  // const handleAddTask = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     console.log(viewTaskOnBoxInfo);
  //     addTaskButtonHandler(
  //       `http://${URLS.baseURL}/api/tasks`,
  //       {
  //         title: viewTaskOnBoxInfo.title,
  //         description: viewTaskOnBoxInfo.description,
  //       },
  //       CONTEXTS.localStorage.get("JWT")
  //     );
  //   },
  //   [viewTaskOnBoxInfo, CONTEXTS.localStorage, addTaskButtonHandler]
  // );

  useEffect(() => {
    console.log("viewTaskOnBoxInfo updated:", viewTaskOnBoxInfo);
  }, [viewTaskOnBoxInfo]);

  const boxButtonsAlternatives = {
    addButton: (
      <>
        <button
          onClick={handleAddTask}
          className={CLASSES.ToDoApp_Page.boxAddButtonStyle}
        >
          <AddTaskIcon />
          <span className={CLASSES.ToDoApp_Page.boxAddButtonSpanStyle}>
            Add
          </span>
        </button>
      </>
    ),
    editButton: (
      <>
        <button onClick={""} className={CLASSES.ToDoApp_Page.boxAddButtonStyle}>
          <span className={CLASSES.ToDoApp_Page.boxAddButtonSpanStyle}>
            Edit
          </span>
        </button>
      </>
    ),
  };

  const [boxButtons, setBoxButtons] = useState(
    boxButtonsAlternatives.addButton
  );

  let boxProps = {
    BoxContainerTag: "section",
    BoxTitleTag: Input,
    BoxTitleTagProps: boxTitleInputProps,
    BoxDescriptionTag: Fragment,
    BoxDescriptionTagProps: null,
    BoxDescription: boxDescriptionTagContent,
    buttons: boxButtons,
    boxContainerTagStyle: CLASSES.ToDoApp_Page.boxContainerTagStyle,
    boxDataDivStyle: CLASSES.ToDoApp_Page.boxDataDivStyle,
    boxTitleTagStyle: "", //Styled in boxTitleInputProps as input style.
    boxDescriptionTagStyle: "", //Styled in boxDescriptionTagContent as textarea style.
    boxButtonsDivStyle: CLASSES.ToDoApp_Page.boxButtonsDivStyle,
  };

  return (
    <Main {...mainProps}>
      {isLoading ? (
        <div className={CLASSES.ToDoApp_Page.loadingDivStyle}>Loading...</div>
      ) : (
        <>
          <Nav {...navProps} />
          <section className={CLASSES.ToDoApp_Page.cardsSectionStyle}>
            {userTasks.length === 0 ? (
              <h3>No Task Added yet!</h3>
            ) : (
              userTasks.map((task) => {
                return (
                  <Card
                    cardKey={task.task_id}
                    cardTitle={task.title}
                    cardDescription={task.description}
                    {...cardProps}
                  />
                );
              })
            )}
          </section>
          <Box {...boxProps} />
        </>
      )}
    </Main>
  );
}

export { ToDoApp };
