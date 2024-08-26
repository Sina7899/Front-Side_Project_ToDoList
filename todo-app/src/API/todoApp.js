import { get, post, put, Delete } from "./api.js";

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

export {
  getTasksRequest,
  addTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
};
