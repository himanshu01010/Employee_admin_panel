import { call,takeLatest } from "redux-saga/effects";
import { LOGIN_ACTION ,LOGOUT} from "../actions/types";
import { END_POINTS } from "../../utils/config";
import axios from "../../utils/axiosConfig";

function* login(payload){

    console.log('Payload:',payload);
    let formData = new FormData();
    Object.keys(payload).forEach(element=>{
        formData.append(element,payload[element]);
    });

    return yield axios.post(END_POINTS.LOGIN,formData,{withCredentials:true});
}


export function* loginSaga(action){
    try {
        console.log('Action Payload:', action.payload);
        const response = yield call(login, action.payload);
        action.callBack(response);
    } catch (error) {
        console.log('Login failed:', error);
        action.callBack(error);
        
    }
}


export function* authSaga(){
    yield takeLatest(LOGIN_ACTION, loginSaga);
}

export default authSaga;


function* logout(action) {
    try {
      const response = yield call(() =>
        axios.post(END_POINTS.LOGOUT, {}, { withCredentials: true })
      );
      action.callback(response.data);  // Pass response.data instead of response
    } catch (error) {
      console.error("Logout failed:", error);
      action.callback({ success: false, message: error.message });
    }
  }
  
  export function* watchLogoutSaga() {
    yield takeLatest(LOGOUT, logout);
  }