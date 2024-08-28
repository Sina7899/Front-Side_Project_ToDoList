import { Nav } from "./Nav.jsx";

import { CLASSES } from "../styles/styleClasses.js";

import Avatar from "boring-avatars";

import { getFromLocalStorage } from "../local-Storage.js";

import { ReactComponent as AllTasksIcon } from "../assets/icons/list.svg";

function ToDoAppNav() {
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

  const userInfo = {
    firstName: getFromLocalStorage("firstName"),
    lastName: getFromLocalStorage("lastName"),
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

  return <Nav {...navProps} />;
}

export { ToDoAppNav };
