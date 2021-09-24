import React, { Component,Fragment } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/addMemberActions';
import { Row, Col, Input, Button, Modal } from 'antd';
import './addTaskPage.css'
// import axios from 'axios';

class addMemberPage extends Component {
    constructor() {
        super();
        this.state = {
            memberName: "",
            designation: "",
            location: ""
        }
    }

    componentDidMount = () => {
        const member = this.props.member;
        if(this.props.page==="editMemberPage") {
            this.setState({
                ...this.state,
                memberName: member.memberName,
                designation: member.designation,
                location: member.location
            })
        }
    }

    onChangeName = (event) => {
        this.setState({memberName:event.target.value});
    }

    onChangeDesignation = (event) => {
        this.setState({designation: event.target.value});
    }

    onChangeLocation = (event) => {
        this.setState({location:event.target.value});
    }

    saveMember = () => {
        if(this.state.memberName!="" && this.state.designation!="" && this.state.location!="")
        {
            this.props.actions.saveMember(this.state,this.props.history);
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

    updateMember = () => {
        if(this.state.memberName!="" && this.state.designation!="" && this.state.location!="")
        {
            this.props.actions.updateMember(this.state,this.props.member.id,this.props.history);
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
                <div className="headerClass">{this.props.page==='editMemberPage'?"Edit Member" : "Add Member"}</div>
                <Row className="outerRow">
                    <Col span={24} className="innerRow">
                        <Fragment>
                            <Row>
                                <label>Name<span style={{color:"red"}}> *</span></label>
                            </Row>
                            <Row>
                                <Input 
                                    type="text"
                                    onChange = {this.onChangeName}
                                    defaultValue = {this.props.page==='editMemberPage' ? this.props.member.memberName : null}
                                />
                            </Row>
                        </Fragment>
                    </Col>
                    <Col span={24} className="innerRow">
                        <Fragment>
                            <Row>
                                <label>Designation<span style={{color:"red"}}> *</span></label>
                            </Row>
                            <Row>
                                <Input 
                                    type="text"
                                    onChange = {this.onChangeDesignation}
                                    defaultValue = {this.props.page==='editMemberPage' ? this.props.member.designation : null}
                                />
                            </Row>
                        </Fragment>
                    </Col>
                    <Col span={24} className="innerRow">
                        <Fragment>
                            <Row>
                                <label>Location<span style={{color:"red"}}> *</span></label>
                            </Row>
                            <Row>
                                <Input 
                                    type="text"
                                    onChange = {this.onChangeLocation}
                                    defaultValue = {this.props.page==='editMemberPage' ? this.props.member.location : null}
                                />
                            </Row>
                        </Fragment>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <div  className="btn">
                        {
                            this.props.page!=='editMemberPage' 
                            ?
                            <Button
                                onClick = {this.saveMember}
                                type = "primary"
                            >
                                Add Member
                            </Button>
                            :
                            <Button
                                onClick = {this.updateMember}
                                type = "primary"
                            >
                                Update Member
                            </Button>
                        }
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

addMemberPage.propTypes = {
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        members: state.addMember.members,
        member: state.addMember.member,
        page: state.addMember.page
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
)(addMemberPage);