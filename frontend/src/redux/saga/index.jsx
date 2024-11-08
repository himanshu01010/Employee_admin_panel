import {all} from 'redux-saga/effects';
import authSaga, { watchLogoutSaga } from './auth.saga';
import { employeeSaga, getEmployeeByIdSaga, getEmployeeSaga, watchDeleteEmployee, watchFetchTotalEmployees, watchUpdateEmployee } from './employeeSaga';


export default function* rootSaga(){
    yield all([
        authSaga(),
        employeeSaga(),
        getEmployeeSaga(),
        getEmployeeByIdSaga(),
        watchUpdateEmployee(),
        watchDeleteEmployee(),
        watchLogoutSaga(),
        watchFetchTotalEmployees()
    ]);
}