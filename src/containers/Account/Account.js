import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { withNotifications } from "../../hocs/WithNotifications";
import styled from "styled-components";
import { colors } from "../../variables/colors";
import { userActions } from "../../actions";

import "./Account.css";

const Page = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  align-items: center;
  text-align: center;
`

const H1 = styled.h1`
  color: ${colors.text.white}
`
const P = styled.p`
  color: ${colors.text.white}
`

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldCreateNew: false,
      shouldJoinExisting: false
    };
  }

  componentDidMount() {
    console.log('this.props: ', this.props);
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
      <div>
       <Page>
          <H1>Profile Page</H1>
          <P className="wide-margin-bottom">Lets get you started by creating a club or joining an existing one.</P>
          <button onClick={this.handleCreateClub}>Create club</button>
          <button onClick={this.handleJoinClub}>Join existing club</button>
          <button onClick={this.handleCreateTournament}>Create tournament</button>
          <button onClick={this.handleLogout}>Logout</button>
        </Page>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

// Example using the context API to give access to notifications on this component
// It can now find the state in its props (this.props.notifications)
export default withNotifications(withRouter(connect(mapStateToProps, userActions)(Account)));
