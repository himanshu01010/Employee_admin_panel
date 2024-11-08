export const BASE_URL = 'http://localhost:3000/'

export const END_POINTS ={
    LOGIN : `api/auth/login`,
    CREATE_EMP :`api/employee/create`,
    GET_ALL_EMP:`api/employee/getallemployees`,
    GET_EMPLOYEE_BY_ID: (id) => `api/employee/getemployees/${id}`,
    UPDATE_EMP:(id)=>`api/employee/update/${id}`,
    DELETE_EMP: (id) => `api/employee/deleteEmployees/${id}`,
    LOGOUT: `api/auth/logout`,
    GET_TOTAL_EMPLOYEES: 'api/employee/getTotalEmployees',
}