import { createContext, useState, useReducer } from "react";

const ToDoAppContexts = createContext({
  userTasks: [],
  userTasksDispatches: () => {},
  taskActions: {},
  taskInfoOnBox: [],
  setTaskInfoOnBox: () => {},
  boxStatus: Boolean,
  setBoxStatus: () => {},
  taskComplete: Boolean,
  setTaskComplete: () => {},
  isLoading: Boolean,
  setIsLoading: () => {},
});

function ToDoAppContextsProvider({ children }) {
  const TASK_ACTIONS = {
    GET_TASK: "get-all-task",
    ADD_TASK: "add-task",
    EDIT_TASK: "edit-task",
    DONE_TASK: "done-task",
    DELETE_TASK: "delete-task",
  };

  function reducer(userTasks, action) {
    switch (action.type) {
      case TASK_ACTIONS.GET_TASK:
        return [...userTasks, ...action.payload.tasks];

      case TASK_ACTIONS.ADD_TASK:
        return [...userTasks, ...action.payload.newTask];

      case TASK_ACTIONS.EDIT_TASK:
        userTasks.forEach((task) => {
          if (task.task_id === action.payload.taskId) {
            task.title = action.payload.newTitle;
            task.description = action.payload.newDescription;
          }
        });
        return [...userTasks];

      case TASK_ACTIONS.DONE_TASK:
        userTasks.forEach((task) => {
          if (task.task_id === action.payload.taskId) {
            task.status = action.payload.status;
          }
        });
        return [...userTasks];

      case TASK_ACTIONS.DELETE_TASK:
        return userTasks.filter(
          (task) => task.task_id !== action.payload.taskId
        );

      default:
        return userTasks;
    }
  }

  const [userTasks, dispatch] = useReducer(reducer, []);

  const [isLoading, setIsLoading] = useState(true);

  const [boxStatus, setBoxStatus] = useState(true);

  const [taskComplete, setTaskComplete] = useState(false);

  const [taskInfoOnBox, setTaskInfoOnBox] = useState({
    title: "",
    description: "",
    id: "",
    status: "",
  });

  const toDoAppCtxValues = {
    userTasks: userTasks,
    userTasksDispatches: dispatch,
    taskActions: TASK_ACTIONS,
    taskInfoOnBox: taskInfoOnBox,
    setTaskInfoOnBox: setTaskInfoOnBox,
    boxStatus: boxStatus,
    setBoxStatus: setBoxStatus,
    taskComplete: taskComplete,
    setTaskComplete: setTaskComplete,
    isLoading: isLoading,
    setIsLoading: setIsLoading,
  };

  return (
    <ToDoAppContexts.Provider value={toDoAppCtxValues}>
      {children}
    </ToDoAppContexts.Provider>
  );
}

export { ToDoAppContextsProvider, ToDoAppContexts };
