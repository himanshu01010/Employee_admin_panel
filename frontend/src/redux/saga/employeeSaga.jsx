import { call, put, takeLatest } from 'redux-saga/effects';
import axios from '../../utils/axiosConfig';
import { FETCH_EMPLOYEES,SET_EMPLOYEES ,UPDATE_EMPLOYEE} from '../actions/types';
import * as TYPE from '../actions/types';
import { END_POINTS } from '../../utils/config';

function* createEmployee(action) {
  try {
    let formData = new FormData();
    Object.keys(action.payload).forEach((key) => {
      formData.append(key, action.payload[key]);
    });
    const response = yield call(() =>
      axios.post(END_POINTS.CREATE_EMP, formData)
    );
    action.callback(response.data);
  } catch (error) {
    console.error('Error creating employee:', error);
    action.callback({ success: false, message: 'Failed to create employee' });
  }
}

export function* employeeSaga() {
  yield takeLatest(TYPE.CREATE_EMPLOYEE, createEmployee);
}


function* fetchEmployees(action) {
    try {
      const response = yield call(() =>
        axios.get(END_POINTS.GET_ALL_EMP)
      );
      yield put({ type: SET_EMPLOYEES, payload: response.data.data });
      if (action.callback) action.callback(response);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      if (action.callback) action.callback(null, error);
    }
  }
  
  export function* getEmployeeSaga() {
    yield takeLatest(FETCH_EMPLOYEES, fetchEmployees);
  }

  // Fetch Employee by ID

  function* fetchEmployeeById(action) {
    try {
      // Make the API call with the employee ID
      const response = yield call(() =>
        axios.get(END_POINTS.GET_EMPLOYEE_BY_ID(action.payload.id))  // Dynamic endpoint
      );
  
      // Dispatch action to store the employee data
      yield put({ type: TYPE.SET_EMPLOYEE_BY_ID, payload: response.data.data });
  
      // Call the callback function if provided
      if (action.callback) action.callback(response);
    } catch (error) {
      console.error('Failed to fetch employee by ID:', error);
      if (action.callback) action.callback(null, error);  // Pass error to callback if needed
    }
  }
  
  // Watcher saga to listen for the action type
  export function* getEmployeeByIdSaga() {
    yield takeLatest(TYPE.FETCH_EMPLOYEE_BY_ID, fetchEmployeeById);
  }

  function* updateEmployee(action) {
    try {
      const { payload, callback } = action;
      let formData = new FormData();
      Object.keys(payload).forEach((key) => {
        formData.append(key, payload[key]);
      });
  
      const response = yield call(() =>
        axios.put(END_POINTS.UPDATE_EMP(payload.id), formData)
      );
  
      if (callback) callback(response.data);
    } catch (error) {
      console.error('Error updating employee:', error);
      if (action.callback) action.callback({ success: false, message: 'Failed to update employee' });
    }
  }
  
  export function* watchUpdateEmployee() {
    yield takeLatest(UPDATE_EMPLOYEE, updateEmployee);
  }

  function* deleteEmployee(action) {
    try {
      const { id } = action.payload;
      const response = yield call(() => axios.delete(END_POINTS.DELETE_EMP(id)));
      yield put({ type: TYPE.DELETE_EMPLOYEE_SUCCESS, payload: id }); // Notify success
  
      if (action.callback) action.callback(response.data);
    } catch (error) {
      console.error('Error deleting employee:', error);
      if (action.callback) action.callback({ success: false, message: 'Failed to delete employee' });
    }
  }
  
  export function* watchDeleteEmployee() {
    yield takeLatest(TYPE.DELETE_EMPLOYEE, deleteEmployee);
  }
  
  function* fetchTotalEmployees(action) {
    try {
        const response = yield call(() => axios.get(END_POINTS.GET_TOTAL_EMPLOYEES));
        yield put({ type: TYPE.SET_TOTAL_EMPLOYEES, payload: response.data.data.totalEmployees });
        if (action.callback) action.callback(response);
    } catch (error) {
        console.error("Failed to fetch total employees:", error);
        if (action.callback) action.callback(null, error);
    }
}

export function* watchFetchTotalEmployees() {
    yield takeLatest(TYPE.FETCH_TOTAL_EMPLOYEES, fetchTotalEmployees);
}

