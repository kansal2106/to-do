import * as types from '../constants/actionTypes';
import axios from 'axios';

export const getTasks = () => (dispatch) => {
    let params;
      params = {  
        method: 'GET',
        url:"http://localhost:3099/tasks",
      };
    axios(params)
    .then(response => {
      // console.log(response);
        dispatch({
          type: types.GET_TASK,
          payload: response.data
        });
    })
    .catch(function (error) {
        console.log(error);
    });
}

export const getMembers = () => (dispatch) => {
  let params;
    params = {  
      method: 'GET',
      url:"http://localhost:3099/members",
    };
  axios(params)
  .then(response => {
    // console.log(response);
      dispatch({
        type: types.GET_MEMBER,
        payload: response.data
      });
  })
  .catch(function (error) {
      console.log(error);
  });
}

export const goToAddTask = (history) => (dispatch) => {
    dispatch({
        type: types.GO_TO_ADD_TASK
    })
    history.push({pathname:'/tasks'})
}

export const goToAddMember = (history) => (dispatch) => {
    dispatch({
        type: types.GO_TO_ADD_MEMBER
    })
    history.push({pathname:'/members'})
}

export const editTask = (id,history) => (dispatch) => {
    let params;
      params = {  
        method: 'GET',
        url:"http://localhost:3099/tasks",
      };
    axios(params)
    .then(response => {
      // console.log("edittasks");
      dispatch({
        type: types.EDIT_TASK,
        payload: response.data,
        id: id
      });
      history.push({pathname: '/tasks/'+id});
    })
    .catch(function (error) {
        console.log(error);
    });
}

export const editMember = (id,history) => (dispatch) => {
    let params;
      params = {  
        method: 'GET',
        url:"http://localhost:3099/members",
      };
    axios(params)
    .then(response => {
      // console.log("editmembers");
      dispatch({
        type: types.EDIT_MEMBER,
        payload: response.data,
        id: id
      });
      history.push({pathname: '/members/'+id});
    })
    .catch(function (error) {
        console.log(error);
    });
}

export const deleteTask = (id) => (dispatch) => {
    dispatch({
      type: types.DELETE_TASK,
      id: id
    });
}

export const deleteMember = (id) => (dispatch) => {
  dispatch({
    type: types.DELETE_MEMBER,
    id: id
  });
}

