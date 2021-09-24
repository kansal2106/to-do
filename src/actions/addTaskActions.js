import * as types from '../constants/actionTypes';
import axios from 'axios';

export const saveTask = (task,history) => (dispatch) => {
  let params;
    params = {  
      method: 'GET',
      url:"http://localhost:3099/tasks",
    };
  axios(params)
  .then(response => {
    dispatch({
      type: types.ADD_TASK,
      task: task,
      payload: response.data
    });
    history.push({pathname:'/'});
  })
  .catch(function (error) {
      console.log(error);
  });
}

export const updateTask = (task,id,history) => (dispatch) => {
  dispatch({
    type: types.UPDATE_TASK,
    task: task,
    id: id
  });
  history.push({pathname:'/'});
}

export const deleteTask = (id) => (dispatch) => {
  dispatch({
    type: types.DELETE_TASK,
    id: id
  });
}
