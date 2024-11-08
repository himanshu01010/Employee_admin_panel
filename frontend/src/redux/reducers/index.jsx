import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user.reducers";

const appReducer = combineReducers({
    userReducer
})

const rootReducer = (state, action)=>{
    return appReducer(state,action);
}

export default rootReducer;
