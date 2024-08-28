import { get, post, put, Delete } from "./api.js";

import { addToLocalStorage } from "../local-Storage.js";

function getTasksRequest(url, params, token) {
  const response = get(url, params, token);
  return response;
}

function addTaskRequest(url, data, token) {
  const response = post(url, data, token);
  return response;
}

function updateTaskRequest(url, data, token) {
  const response = put(url, data, token);
  return response;
}

function deleteTaskRequest(url, data, token) {
  const response = Delete(url, data, token);
  return response;
}

function getTasksHandler(url, params, token) {
  return getTasksRequest(url, params, token)
    .then((response) => {
      if (response.status === 200) {
        console.log("Request was successful:", response.data);
        let responseData = {
          tasks: response.data.tasks,
          userInfo: response.data.userInfo,
        };
        addToLocalStorage("firstName", response.data.userInfo.firstName);
        addToLocalStorage("lastName", response.data.userInfo.lastName);
        return responseData;
      } else {
        console.log("Request was not successful:", response);
        if (
          response.request.response === "" ||
          response.request.response === undefined
        ) {
          alert("Timeout, Please Try Again");
        } else {
          alert(response.request.response);
        }
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
        return response.data;
      } else {
        console.log("Request was not successful:", response);
        if (
          response.request.response === "" ||
          response.request.response === undefined
        ) {
          alert("Timeout, Please Try Again");
        } else {
          alert(response.request.response);
        }
      }
    })
    .catch((error) => {
      console.error("There was an error making the request:", error);
    });
}

function editTaskHandler(url, data, token) {
  return updateTaskRequest(url, data, token)
    .then((response) => {
      if (response.status === 201) {
        console.log("Request was successful:", response.data);
        return response.data;
      } else {
        console.log("Request was not successful:", response);
        if (
          response.request.response === "" ||
          response.request.response === undefined
        ) {
          alert("Timeout, Please Try Again");
        } else {
          alert(response.request.response);
        }
      }
    })
    .catch((error) => {
      console.error("There was an error making the request:", error);
    });
}

function deleteTaskHandler(url, data, token) {
  return deleteTaskRequest(url, data, token)
    .then((response) => {
      if (response.status === 200) {
        console.log("Request was successful:", response.data);
        return response.data;
      } else {
        console.log("Request was not successful:", response);
        if (
          response.request.response === "" ||
          response.request.response === undefined
        ) {
          alert("Timeout, Please Try Again");
        } else {
          alert(response.request.response);
        }
      }
    })
    .catch((error) => {
      console.error("There was an error making the request:", error);
    });
}

export {
  getTasksRequest,
  addTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
  getTasksHandler,
  addTaskHandler,
  editTaskHandler,
  deleteTaskHandler,
};
