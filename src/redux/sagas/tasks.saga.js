import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchAllTasksSaga() {
  try {
    const response = yield axios.get("/api/tasks/all_tasks");
    yield put({ type: "SET_ALL_TASKS", payload: response.data });
  } catch (error) {
    console.log("Error with fetching all tasks:", error);
  }
}

function* fetchAllAvailableTasksSaga() {
  try {
    const response = yield axios.get("/api/tasks/all_available_tasks");
    yield put({ type: "SET_ALL_AVAILABLE_TASKS", payload: response.data });
  } catch (error) {
    console.log("Error with fetching all tasks:", error);
  }
}

function* addNewTaskAdminSaga(action) {
  try {
    yield axios.post("/api/tasks/admin", action.payload);
    yield put({ type: "FETCH_ALL_TASKS" });
  } catch (error) {
    console.log("Error posting task:", error);
  }
}

function* addNewTaskUserSaga(action) {
  try {
    yield axios.post("/api/tasks/user", action.payload);
    yield put({ type: "FETCH_INCOMING_TASKS" });

  } catch (error) {
    console.log("Error posting task:", error);
  }
}


function* fetchIncomingTasksSaga() {
  try {
    const response = yield axios.get("/api/tasks/not_approved");
    yield put({ type: "SET_INCOMING_TASKS", payload: response.data });
    yield put({ type: "FETCH_ALL_AVAILABLE_TASKS" });
  } catch (error) {
    console.log("Error with fetching incoming tasks:", error);
  }
}

function* fetchIncomingTasksForUserSaga() {
  try {
    const response = yield axios.get("/api/tasks/not_approved_user");
    yield put({ type: "SET_INCOMING_TASKS_FOR_USER", payload: response.data });
    yield put({ type: "FETCH_ALL_AVAILABLE_TASKS" });
  } catch (error) {
    console.log("Error with fetching incoming tasks:", error);
  }
}

function* fetchAllTasksForAdminSaga() {
  try {
    const response = yield axios.get("/api/tasks/user_assigned_tasks");
    yield put({ type: "SET_ALL_TASKS_FOR_ADMIN", payload: response.data });
  } catch (error) {
    console.log("Error with fetching all tasks for admin:", error);
  }
}

function* fetchAllTasksForUserSaga() {
  try {
    const response = yield axios.get("/api/tasks/user_assigned_tasks");
    yield put({ type: "SET_ALL_TASKS_FOR_USER", payload: response.data });
  } catch (error) {
    console.log("Error with fetching all tasks for admin:", error);
  }
}

function* fetchAllCompletedTasksSaga() {
  try {
    const response = yield axios.get("/api/tasks/admin_completed");
    yield put({ type: "SET_ALL_COMPLETED_TASKS", payload: response.data });
  } catch (error) {
    console.log("Error with fetching all completed tasks:", error);
  }
}

function* fetchAllCompletedTasksForUserSaga() {
  try {
    const response = yield axios.get("/api/tasks/user_completed");
    yield put({ type: "SET_ALL_COMPLETED_TASKS_FOR_USER", payload: response.data });
  } catch (error) {
    console.log("Error with fetching all completed tasks for user:", error);
  }
}

function* markTaskApprovedSaga(action) {
  try {
    yield axios.put("/api/tasks/admin_approve", action.payload);
    yield put({ type: "FETCH_INCOMING_TASKS" });
    yield put({type: "FETCH_ALL_TASKS_FOR_ADMIN"});
    const response = yield axios.get("/api/tasks/all_tasks");
    yield put({ type: "SET_ALL_TASKS", payload: response.data });
    yield put({ type: "SET_ALL_AVAILABLE_TASKS", payload: response.data });
  } catch (error) {
    console.log("Error marking task as approved:", error);
  }
}

// Deny means delete in this case
function* denyTaskSaga(action) {
  try {

    yield axios.delete(`/api/tasks/${action.payload.task_id}`);
    yield put({ type: "FETCH_INCOMING_TASKS" });
    const response = yield axios.get("/api/tasks/all_tasks");
    yield put({ type: "SET_ALL_TASKS", payload: response.data });
    yield put({ type: "SET_ALL_AVAILABLE_TASKS", payload: response.data });

  } catch (error) {
    console.log("Error marking task as approved:", error);
  }
}

function* completeTaskSaga(action) {
  try {
    const updateCompletion = { ...action.payload, is_admin: true };
    yield call(axios.put, '/api/user/update_admin', updateCompletion);
    const response = yield axios.get('/api/user/verified');
    yield put({ type: 'SET_VERIFIED_USERS', payload: response.data });
  } catch (error) {
    console.error('Error in demoting a user', error);
  }
}

function* submitEditsSaga(action) {
  console.log("submit edits saga, action.payload", action.payload);
  try {
    yield axios.put('/api/tasks/admin_edit_task', action.payload);

    yield put({ type: "FETCH_ALL_TASKS" });
    yield put({ type: "FETCH_INCOMING_TASKS" });


  } catch (error) {
    console.log("error in edit task saga", error);
  }

}

function* tasksSaga() {

  yield takeLatest("FETCH_ALL_TASKS", fetchAllTasksSaga);
  yield takeLatest("FETCH_INCOMING_TASKS", fetchIncomingTasksSaga);
  yield takeLatest("FETCH_INCOMING_TASKS_FOR_USER", fetchIncomingTasksForUserSaga);
  yield takeLatest("ADD_NEW_TASK_USER", addNewTaskUserSaga);
  yield takeLatest("FETCH_ALL_TASKS_FOR_ADMIN", fetchAllTasksForAdminSaga);
  yield takeLatest("FETCH_ALL_TASKS_FOR_USER", fetchAllTasksForUserSaga);
  yield takeLatest("FETCH_ALL_COMPLETED_TASKS", fetchAllCompletedTasksSaga);
  yield takeLatest("MARK_TASK_APPROVED", markTaskApprovedSaga);
  yield takeLatest("DENY_TASK", denyTaskSaga);
  yield takeLatest("ADD_NEW_TASK", addNewTaskAdminSaga);
  yield takeLatest("SUBMIT_EDITS", submitEditsSaga);
  yield takeLatest("FETCH_COMPLETED_USER_TASKS", fetchAllCompletedTasksForUserSaga);
  yield takeLatest("FETCH_ALL_AVAILABLE_TASKS", fetchAllAvailableTasksSaga);
}

export default tasksSaga;
