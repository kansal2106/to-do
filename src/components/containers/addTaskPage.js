import React, { Component,Fragment } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/addTaskActions';
import './addTaskPage.css'
import moment from 'moment'

import { Select, Row, Col, Input, DatePicker, TimePicker, Button, Modal } from 'antd';
const { TextArea } = Input;
const { Option } = Select;

class addTaskPage extends Component {
    constructor() {
        super();
        this.state = {
            taskName: "",
            description: "",
            category: "",
            member: "",
            date: "",
            time: ""
        }
    }

    componentDidMount() {
        const task = this.props.task;
        if(this.props.page==="editTaskPage") {
            this.setState({
                ...this.state,
                taskName: task.taskName,
                description: task.description,
                category: task.category,
                member: task.member,
                date: task.date,
                time: task.time
            })
        }
    }
    

    onChangeName = (e) => {
        this.setState({taskName:e.target.value})
    }

    onChangeDesc = (e) => {
        this.setState({description:e.target.value})
    }

    onChangeCategory = (string) => {
        this.setState({category:string})
    }

    onChangeMember = (string) => {
        this.setState({member:string})
    }

    onChangeDate = (date, dateString) => {
        this.setState({date:dateString})
    }

    onChangeTime = (time, timeString) => {
        this.setState({time:timeString})
    }

    saveTask = () => {
        if(this.state.taskName!="" && this.state.category!="" && this.state.member!="")
        {
            this.props.actions.saveTask(this.state,this.props.history);
        } 
        else {
            Modal.warning({
                content: (                       
                  "Please fill the mandatory fields.. !"
                ),
                onOk() {
                }                  
            });
        }
    }

    updateTask = () => {
        if(this.state.taskName!="" && this.state.category!="" && this.state.member!="")
        {
            this.props.actions.updateTask(this.state,this.props.task.id,this.props.history);
        } 
        else {
            Modal.warning({
                content: (                       
                  "Please fill the mandatory fields.. !"
                ),
                onOk() {
                }                  
            });
        }
    }

    render() {
        return (
            <div>
                <div className="headerClass">{this.props.page==='editTaskPage'?"Edit Task" : "Add Task"}</div>
                <Row className="outerRow">
                    <Col span={24} className="innerRow">
                        <Fragment>
                            <Row>
                                <label>Task Name<span style={{color:"red"}}> *</span></label>
                            </Row>
                            <Row>
                                <Input 
                                    type="text"
                                    onChange = {this.onChangeName}
                                    defaultValue = {this.props.page==='editTaskPage' ? this.props.task.taskName : null}
                                />
                            </Row>
                        </Fragment>
                    </Col>
                    <Col span={24} className="innerRow">
                        <Fragment>
                            <Row>
                                <label>Description</label>
                            </Row>
                            <Row>
                                <TextArea 
                                    onChange={this.onChangeDesc}
                                    defaultValue = {this.props.page==='editTaskPage' ? this.props.task.description : null}
                                />
                            </Row>
                        </Fragment>
                    </Col>
                    <Col span={24} className="innerRow">
                        <Fragment>
                            <Row>
                                <label>Category<span style={{color:"red"}}> *</span></label>
                            </Row>
                            <Select
                                showSearch
                                placeholder="Select a category"
                                onSelect={this.onChangeCategory}
                                defaultValue = {this.props.page==='editTaskPage' ? this.props.task.category : null}
                            >
                                <Option value="home">Home</Option>
                                <Option value="work">Work</Option>
                                <Option value="personal">Personal</Option>
                            </Select>
                        </Fragment>
                    </Col>
                    <Col span={24} className="innerRow">
                        <Fragment>
                            <Row>
                                <label>Assign to<span style={{color:"red"}}> *</span></label>
                            </Row>
                            <Select
                                showSearch
                                placeholder="Select a member"
                                onSelect={this.onChangeMember}
                                defaultValue = {this.props.page==='editTaskPage' ? this.props.task.member : null}
                            >
                                {this.props.members.map((member, idx) => {
                                    return (
                                        <Option key={idx} value={member.memberName}>{member.memberName}</Option>
                                    )
                                })}
                            </Select>
                        </Fragment>
                    </Col>
                    <Col span={24} className="innerRow">
                        <span className="datetimespan">Date</span>
                        <DatePicker 
                            format="DD-MM-YYYY"
                            onChange = {this.onChangeDate}
                            placeholder= "Date"
                            className = "dateTime"
                            defaultValue = {this.props.page==='editTaskPage' ? moment(this.props.task.date, "DD-MM-YYYY") : ""}
                        />
                    </Col>
                    <Col span={24} className="innerRow">
                        <span className="datetimespan">Time</span>
                        <TimePicker 
                            onChange={this.onChangeTime} 
                            placeholder = "Time"
                            format = "hh:mm A"
                            className = "dateTime"
                            defaultValue = {this.props.page==='editTaskPage' ? moment(this.props.task.time, 'hh:mm A') : null}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <div  className="btn">
                        {
                            this.props.page!=='editTaskPage' 
                            ?
                            <Button
                                onClick = {this.saveTask}
                                type = "primary"
                            >
                                Add Task
                            </Button>
                            :
                            <Button
                                onClick = {this.updateTask}
                                type = "primary"
                            >
                                Update Task
                            </Button>
                        }
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

addTaskPage.propTypes = {
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        tasks: state.addTask.tasks,
        task: state.addTask.task,
        page: state.addTask.page,
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
)(addTaskPage);
