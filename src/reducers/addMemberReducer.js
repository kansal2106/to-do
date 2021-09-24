import * as types from '../constants/actionTypes';
// import objectAssign from 'object-assign';
import cloneDeep from 'clone-deep'
import axios from 'axios';

const initialState = {
    id: null,
    members:[],
    member: null,
    page: 'addMemberPage'
}

export default function addMemberReducer (state = initialState, action) {
    let newState;
    switch(action.type) {
        case types.ADD_MEMBER:
            newState = cloneDeep(state);
            newState.members = action.payload;
            newState.members.push(action.member);
            // newState.members = state.members.map(value => objectAssign({}, value))
            console.log("member added", action.member);
            axios.post('http://localhost:3099/members', action.member)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            return newState;
        
        case types.GO_TO_ADD_MEMBER:
            newState = cloneDeep(state);
            newState.member = null;
            newState.page = "addMemberPage";
            return newState;

        case types.GET_MEMBER:
            newState = cloneDeep(state);
            newState.member = action.member;
            return newState;

            
            case types.EDIT_MEMBER:
                newState = cloneDeep(state);
                newState.members = action.payload;
                newState.id = action.id;
                newState.page = 'editMemberPage'
                newState.member = newState.members.find((member) => member.id==action.id)
                console.log("newState.member",newState.member);
                return newState;

            case types.UPDATE_MEMBER:
                newState = cloneDeep(state);
                axios.put("http://localhost:3099/members/"+action.id,action.member)
                .then(response => {
                    console.log(response);
                })
                let updateIdx;
                newState.members.map((member,idx) => {
                    if(member.id === action.id) {
                        updateIdx = idx;
                    }
                })
                newState.members[updateIdx] = action.member;    
                return newState;
                
            case types.DELETE_MEMBER:
                newState = cloneDeep(state);
                axios.delete("http://localhost:3099/members/"+action.id)
                .then(response => {
                    console.log(response);
                })
                let removeIdx;
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
