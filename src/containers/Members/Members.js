import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MediaQuery from 'react-responsive';
import { withNotifications } from "../../hocs/WithNotifications";
import { userActions, clubActions, appActions } from "../../actions";
import MemberCard from "../../components/MemberCard/MemberCard";
import styled from 'styled-components';
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import "./Members.css";

const Input = styled.input`
  width: 100%;
  height: 60px;
  padding: 0 5px 0 10px;
  border-radius: 5px;
  border: none;
  font-size: 22px;
  color: var(--c-gray-light);
  background-color: var(--c-gray-medium);
`;
class Members extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allMembers: [],
      membersInView: [],
      stuff: 1,
      isModalOpen: false
    };
  }

  fakeMembers = () => {
    let testData = []

    for (let i = 0; i < 50; i++) {
      testData.push({
        name: 'George' + i % 5,
        email: 'geo@mail.com' + i,
        type: 'member'
      })
    }

    return testData;
  }

  componentDidMount() {
    console.log('this.props @ Members: ', this.props);
    this.props.setPageHeader('Members');

    setTimeout(() => {
      this.setState({
        allMembers: this.fakeMembers(),
        membersInView: this.fakeMembers(),
      });
    }, 1000);
  }

  handleInput = event => {
    console.log('event: ', event);
    this.setState({ [event.target.name]: event.target.value });
  };

  handleOpenDialog = () => {
    console.log('Opening the modal')
    this.setState({ isModalOpen: true })
  }

  handleCreateUser = (e) => {
    console.log('handleCreateUser: ', e);
    this.setState({ isModalOpen: false });
  }

  handleCancel = (e) => {
    console.log('handleCancel: ', e);
    this.setState({ isModalOpen: false });
  }

  render() {
    const { membersInView, isModalOpen } = this.state;

    return (
      <div className="fullwidth wide-space-above">

      {isModalOpen &&
        <Modal
          isOpen={isModalOpen}
          didClickOk={this.handleCreateUser}
          didClickCancel={this.handleCancel}
          withInput={true}
          titleText='Add new member'
          okText='lets do it'
          cancelText='cancel'
        />
      }

      <MediaQuery query="(min-width: 700px)">
        <div className="xx display-flex flex-justify-end wide-space-below">
          
            <div className="members-filterbar flex-auto space-right">
              <Input type={'text'} name={'name'} onChange={this.handleInput} placeholder="Type to filter members" />
            </div>
        
          <div className="members-add-new">
            <Button onClick={this.handleOpenDialog} size="large" width="180" height="60">Add New</Button>
          </div>
        </div>
      </MediaQuery>


        <MediaQuery query="(max-width: 699px)">
        <div className="wide-space-below">
          <Button onClick={this.handleOpenDialog} size="large" fullwidth>Add New</Button>
        </div>
        <div className="space-below">
          <Input type={'text'} onChange={this.handleFilter} placeholder="Type to filter members" />
        </div>
        </MediaQuery>


        <div className="members-grid">
          {membersInView.map(member => {
            return (
              <MemberCard key={member.email} member={member} />
            )
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ user, app }) {
  return { user, app };
}

// Example using the context API to give access to notifications on this component
// It can now find the state in its props (this.props.notifications)
export default withNotifications(withRouter(connect(mapStateToProps, {...userActions, ...clubActions, ...appActions})(Members)));
