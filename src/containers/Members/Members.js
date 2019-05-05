import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { withNotifications } from "../../hocs/WithNotifications";
// import styled from "styled-components";
// import { colors } from "../../styles/colors";
import { userActions, clubActions, appActions } from "../../actions";

import "./Members.css";

class Members extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldCreateNew: false,
      shouldJoinExisting: false
    };
  }

  componentDidMount() {
    console.log('this.props @ Members: ', this.props);
    this.props.setPageHeader('Members');
  }

  handleSelect = (selection) => {
    if (selection === 'shouldCreateNew') {
      this.setState({ shouldCreateNew: true, shouldJoinExisting: false });
    }
    else {
      this.setState({ shouldCreateNew: false, shouldJoinExisting: true });
    }
  }

  handleNewClub = () => {
    this.props.createClub({ name: 'Club Coolio' });
  }

  handleJoinClub = () => {
    console.log('joining existing club');
  }

  handleCreateTournament = () => {
    console.log('creating new tournament');
  }

  handleLogout = () => {
    this.props.logout(this.props.user);
  }

  deleteHandler = () => {
    console.log('Delete was clicked!')
  }

  render() {
    return (
      <div>
        <h1>This is members</h1>
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
