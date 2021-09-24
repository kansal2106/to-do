import * as types from '../constants/actionTypes';
import axios from 'axios';

export const saveMember = (member,history) => (dispatch) => {
  let params;
    params = {  
      method: 'GET',
      url:"http://localhost:3099/members",
    };
  axios(params)
  .then(response => {
    dispatch({
      type: types.ADD_MEMBER,
      member: member,
      payload: response.data
    });
    history.push({pathname:'/'});
  })
  .catch(function (error) {
      console.log(error);
  });
}

export const updateMember = (member,id,history) => (dispatch) => {
  dispatch({
    type: types.UPDATE_MEMBER,
    member: member,
    id: id
  });
  history.push({pathname:'/'});
}

export const deleteMember = (id) => (dispatch) => {
  dispatch({
    type: types.DELETE_MEMBER,
    id: id
  });
}
