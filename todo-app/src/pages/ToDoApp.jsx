import { Fragment, useContext, useEffect, useState } from "react";

import { CLASSES } from "../styles/styleClasses.js";

import { Main } from "../components/Main.jsx";
import { ToDoAppNav } from "../components/ToDoAppNav.jsx";
import { TasksCard } from "../components/TasksCard.jsx";
import { TaskBox } from "../components/TaskBox.jsx";

import { ToDoAppContexts } from "../store/ToDo_App-context.jsx";

import { getFromLocalStorage } from "../local-Storage.js";

import { getTasksHandler } from "../API/todoApp.js";
import { URLS } from "../API/api.js";

function ToDoApp() {
  const { userTasksDispatches, taskActions } = useContext(ToDoAppContexts);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasksHandler(
          `http://${URLS.baseURL}/api/tasks`,
          "",
          getFromLocalStorage("JWT")
        );
        if (response) {
          userTasksDispatches({
            type: taskActions.GET_TASK,
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
  }, [taskActions.GET_TASK, userTasksDispatches, setIsLoading]);

  const mainProps = {
    ContainerTag: Fragment,
    containerTagProps: null,
    mainStyle: CLASSES.ToDoApp_Page.mainTagStyle,
  };

  let toDoAppPageContent = (
    <div className={CLASSES.ToDoApp_Page.loadingDivStyle}>Loading...</div>
  );

  if (!isLoading) {
    toDoAppPageContent = (
      <>
        <ToDoAppNav />
        <section className={CLASSES.ToDoApp_Page.cardsSectionStyle}>
          <TasksCard />
        </section>
        <TaskBox />
      </>
    );
  }

  return <Main {...mainProps}>{toDoAppPageContent}</Main>;
}

export { ToDoApp };
