import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { takeEvery, put, take } from 'redux-saga/effects';
import axios from 'axios';

import App from './App';

// this startingPlantArray should eventually be removed
const startingPlantArray = [
  { id: 1, name: 'Rose' },
  { id: 2, name: 'Tulip' },
  { id: 3, name: 'Oak' }
];

const plantList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      return [ ...state, action.payload ]
    case "SET_PLANTS":
      return action.payload
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({ plantList }),
  applyMiddleware(sagaMiddleware, logger),
);
sagaMiddleware.run(rootSaga);

function* fetchPlants (){
  try {
    const response = yield axios.get('/api/plant');
    const action = {
      type: "SET_PLANTS",
      payload: response.data
    };
    yield put(action);
  }
  catch (error) {
    console.error("Error in GET '/api/plant'.", error);
    alert("Error in GET. See console.");
  }
}

function* postPlant(action){
  try {
    yield axios.post('/api/plant', action.payload);
    yield put({type:"FETCH_PLANTS"});
  }
  catch (error) {
    console.error("Error in POST '/api/plant'.", error);
    alert("Error in POST. See console.");
  }
}

function* deletePlant(action){
  try {
    yield axios.delete(`/api/plant/${action.payload}`);
    yield put({type:"FETCH_PLANTS"});
  }
  catch (error){
    console.error("Error in DELETE '/api/plan/:id'.", error);
    alert("Error in DELETE. See console.");
  }
}

function* rootSaga(){
  yield takeEvery("FETCH_PLANTS", fetchPlants);
  yield takeEvery("ADD_PLANT", postPlant);
  yield takeEvery("DELETE_PLANT", deletePlant);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);