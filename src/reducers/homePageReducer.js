import * as types from '../constants/actionTypes';
import cloneDeep from 'clone-deep'
import axios from 'axios';

const initialState = {
    members:[],
    tasks: []
}

export default function homePageReducer (state = initialState, action) {
    let newState;
    let removeIdx;
    switch(action.type) {
        case types.GET_TASK:
            newState = cloneDeep(state);
            newState.tasks = action.payload;
            return newState;

        case types.GET_MEMBER:
            newState = cloneDeep(state);
            newState.members = action.payload;
            return newState;
    
        case types.DELETE_TASK:
            newState = cloneDeep(state);
            axios.delete("http://localhost:3099/tasks/"+action.id)
            .then(response => {
                console.log(response);
            })
            newState.tasks.map((task,idx) => {
                if(task.id === action.id) {
                    removeIdx = idx;
                }
            })
            newState.tasks.splice(removeIdx,1);
            return newState;
                
        case types.DELETE_MEMBER:
            newState = cloneDeep(state);
            axios.delete("http://localhost:3099/members/"+action.id)
            .then(response => {
                console.log(response);
            })
            newState.members.map((member,idx) => {
                if(member.id === action.id) {
                    removeIdx = idx;
                }
            })
            newState.members.splice(removeIdx,1);
            return newState;

        default:
            return state; 
    }
}
