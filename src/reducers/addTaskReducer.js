import * as types from '../constants/actionTypes';
// import objectAssign from 'object-assign';
import cloneDeep from 'clone-deep'
import axios from 'axios';

const initialState = {
    id: null,
    tasks:[],
    task: null,
    page: 'addTaskPage'
}

export default function addTaskReducer (state = initialState, action) {
    let newState;
    switch(action.type) {
        case types.ADD_TASK:
            newState = cloneDeep(state);
            newState.tasks = action.payload;
            newState.tasks.push(action.task);
            // newState.tasks = state.tasks.map(value => objectAssign({}, value))
            console.log("task added", action.task);
            axios.post('http://localhost:3099/tasks', action.task)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            return newState;

        case types.GET_TASK:
            newState = cloneDeep(state);
            newState.tasks = action.payload;
            return newState;
        
        case types.GO_TO_ADD_TASK:
            newState = cloneDeep(state);
            newState.task = null;
            newState.page = "addTaskPage";
            return newState;
            
        case types.EDIT_TASK:
            newState = cloneDeep(state);
            newState.tasks = action.payload;
            newState.id = action.id;
            newState.page = 'editTaskPage'
            newState.task = newState.tasks.find((task) => task.id==action.id)
            console.log("newState.task",newState.task);
            return newState;

        case types.UPDATE_TASK:
            newState = cloneDeep(state);
            axios.put("http://localhost:3099/tasks/"+action.id,action.task)
            .then(response => {
                console.log(response);
            })
            let updateIdx;
            newState.tasks.map((task,idx) => {
                if(task.id === action.id) {
                    updateIdx = idx;
                }
            })
            newState.tasks[updateIdx] = action.task;    
            return newState;
            
        case types.DELETE_TASK:
            newState = cloneDeep(state);
            axios.delete("http://localhost:3099/tasks/"+action.id)
            .then(response => {
                console.log(response);
            })
            let removeIdx;
            newState.tasks.map((task,idx) => {
                if(task.id === action.id) {
                    removeIdx = idx;
                }
            })
            newState.tasks.splice(removeIdx,1);
            return newState;

        default:
            return state; 
    }
}
