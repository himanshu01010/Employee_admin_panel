import * as TYPE from '../actions/types'

const initialstate ={
    profile:null,
    emloyees:[],
    employeeById: null,  // This will hold the single employee data fetched by ID
    loading: false,
    error: null,
    totalEmployees: 0,
}

const userReducer = (state = initialstate , action)=>{
    const prevState = { ...state}
    const {type , payload} = action 

    switch(type) {
        case TYPE['ADMIN_PROFILE_INFO']:
            return {
                ...prevState,
                profile:payload
            }
        case TYPE.SET_EMPLOYEES:
            return{...prevState,employees:payload}

        case TYPE.SET_EMPLOYEE_BY_ID:
            return {
              ...prevState,
              employeeById:payload,  // Store the employee data here
            };
        case TYPE.SET_TOTAL_EMPLOYEES:
            return {
                ...prevState,
                totalEmployees: payload,
            };

        case TYPE.DELETE_EMPLOYEE_SUCCESS:
            return {
              ...prevState,
              employees: prevState.employees.filter((emp) => emp._id !== action.payload),
            };

        default: return {...prevState}
    }
}

export default userReducer;