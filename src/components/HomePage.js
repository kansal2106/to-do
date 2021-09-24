import React, { Component} from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import * as actions from '../actions/addTaskActions';
// import * as actions from '../actions/addMemberActions';
import * as actions from '../actions/homePageActions';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons';
import './HomePage.css'

// import axios from 'axios'
import { Popover, Button } from 'antd';
// import { parsePath } from 'history';


class HomePage extends Component {
  constructor() {
    super()
    this.state = {
      tasks: null,
      members: null,
    }
  }

  componentDidMount() {
    console.log("cdm");
    this.props.actions.getTasks();
    this.props.actions.getMembers();
  }

  editTask(id) {
    this.props.actions.editTask(id,this.props.history);
  }

  deleteTask(id) {
    this.props.actions.deleteTask(id);
  }

  editMember(id) {
    this.props.actions.editMember(id,this.props.history);
    // this.props.history.push({pathname:'/members/'+id});
  }

  deleteMember(id) {
    this.props.actions.deleteMember(id);
  }

  render() {
    return (
      <div className="outerDiv">
        <div className="homeHeader taskHeader">
          <p>Task</p>
          <Button onClick = {() => this.props.actions.goToAddTask(this.props.history)}>Add Task</Button>
        </div>
        <div className="outerHomeRow">
          {this.props.tasks ? [...this.props.tasks].map((task,index) => {
            return (
              <div key={index} className="taskBox task">
                <Popover content={task.description} title="Description">
                  <h1 className="taskName">{task.taskName}</h1>
                </Popover>
                <div className="taskCategory">{task.category}</div>
                <div className="taskMember">to : {task.member}</div>
                <div className="date-time">
                  <div className="date">{task.date}</div>
                  <div className="time">{task.time}</div>
                </div>
                <div className="edit-delete">
                  <EditOutlined
                    onClick = {() => this.editTask(task.id)}
                    style = {{ fontSize: '20px',margin: '5px'}}
                  >
                    Edit
                  </EditOutlined>
                  <DeleteOutlined 
                    onClick = {() => this.deleteTask(task.id)}
                    style = {{ fontSize: '20px',margin: '5px'}}
                  >
                    Delete
                  </DeleteOutlined>
                </div>
              </div>
            )
          }) : null}
        </div>
        <div className="homeHeader memberHeader">
          <p>Member</p>
          <Button onClick = {() => this.props.actions.goToAddMember(this.props.history)}>Add Member</Button>
        </div>
        <div className="outerHomeRow">
          {this.props.members ? [...this.props.members].map((member,index) => {
            return (
              <div key={index} className="taskBox member">
                <h1 className="memberName">{member.memberName}</h1>
                <div className="memberDesignation">{member.designation}</div>
                <div className="memberLocation">{member.location}</div>
                <div className="edit-delete">
                  <EditOutlined
                    onClick = {() => this.editMember(member.id)}
                    style = {{ fontSize: '20px',margin: '5px'}}
                  >
                    Edit
                  </EditOutlined>
                  <DeleteOutlined 
                    onClick = {() => this.deleteMember(member.id)}
                    style = {{ fontSize: '20px',margin: '5px'}}
                  >
                    Delete
                  </DeleteOutlined>
                </div>
              </div>
            )
          }) : null}
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    tasks: state.homePage.tasks,
    members: state.homePage.members
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
