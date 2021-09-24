import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import addTask from './addTaskReducer';
import addMember from './addMemberReducer';
import homePage from './homePageReducer';
import { connectRouter } from 'connected-react-router'

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  fuelSavings,
  addTask,
  addMember,
  homePage
});

export default rootReducer;
