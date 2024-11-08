import * as TYPE from './types'

export const loginAction = (payload , callBack) => ({
    type: TYPE['LOGIN_ACTION'],
    payload,
    callBack
})

export const createEmployeeAction = (payload, callback) => ({
  type: TYPE.CREATE_EMPLOYEE,
  payload,
  callback,
});

export const fetchEmployeesAction = (callback) => ({
    type: TYPE.FETCH_EMPLOYEES,
    callback,
  });

  export const fetchEmployeeByIdAction = (id, callback) => ({
    type: TYPE.FETCH_EMPLOYEE_BY_ID,  
    payload: { id },  
    callback,  
});


export const updateEmployeeAction = (payload, callback) => ({
  type: TYPE.UPDATE_EMPLOYEE,
  payload,
  callback,
});

export const deleteEmployeeAction = (id, callback) => ({
  type: TYPE.DELETE_EMPLOYEE,
  payload: { id },
  callback,
});

export const logoutAction = (callback) => ({
  type: TYPE.LOGOUT,
  callback,
});

export const fetchTotalEmployeesAction = (callback) => ({
  type: TYPE.FETCH_TOTAL_EMPLOYEES,
  callback,
});
