import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import { withNotifications } from "../../hocs/WithNotifications";
import styled from "styled-components";
// import { colors } from "../../styles/colors";
import { userActions, appActions } from "../../actions";

import "./Account.css";

const Page = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  align-items: center;
  text-align: center;
`

// const H1 = styled.h1`
//   color: ${colors.text.white}
// `
// const P = styled.p`
//   color: ${colors.text.white}
// `

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldCreateNew: false,
      shouldJoinExisting: false
    };
  }

  componentDidMount() {
    this.props.setPageHeader('Account');
  }

  handleSelect = (selection) => {
    if (selection === 'shouldCreateNew') {
      this.setState({ shouldCreateNew: true, shouldJoinExisting: false });
    }
    else {
      this.setState({ shouldCreateNew: false, shouldJoinExisting: true });
    }
  }

  handleCreateClub = () => {
    console.log('creating new club');
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

  render() {
    return (
      <Page>
        <Link to="/">Go home</Link>
        <button onClick={this.handleLogout}>Logout</button>
      </Page>
    );
  }
}

function mapStateToProps({ user, app }) {
  return { user, app };
}

// Example using the context API to give access to notifications on this component
// It can now find the state in its props (this.props.notifications)
export default
  withNotifications(
  withRouter(
  connect(mapStateToProps, { ...userActions, ...appActions })(
  Account)));
