import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from './saga/index';
import rootReducer from "./reducers";


const SagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware({thunk:false}).concat(SagaMiddleware),
});


SagaMiddleware.run(rootSaga);

export default store;