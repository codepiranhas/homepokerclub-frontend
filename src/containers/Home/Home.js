import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { withNotifications } from "../../hocs/WithNotifications";
// import styled from "styled-components";
// import { colors } from "../../variables/colors";
import { userActions, clubActions } from "../../actions";

// import Placeholder from "../../components/Placeholder/Placeholder";

// import Club from "../Club/Club";

import Button from '@material-ui/core/Button';

import "./Home.css";



class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldCreateNew: false,
      shouldJoinExisting: false
    };
  }

  componentDidMount() {
    console.log('this.props: ', this.props);
    if (!this.props.user.isFirstLogin) {
      this.props.history.push('/account')
    }
    else {
      console.log('First login!')
    }
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



  render() {
    return (
      <div className="home__grid-container">


        <div className="grid-item--club card-look">
          <Button variant="contained" color="primary"onClick={this.handleNewClub}>New Club</Button>
        </div>

        <div className="grid-item--capsule1 card-look">14 members</div>
        <div className="grid-item--capsule2 card-look">145 games</div>
        <div className="grid-item--capsule3 card-look">2320 hours</div>
        <div className="grid-item--capsule4 card-look">2500$</div>
        <div className="grid-item--capsule5 card-look">Capsule 5</div>

        <div className="grid-item--tournaments card-look">Tournaments</div>

        <div className="grid-item--members card-look">Members</div>

        <div className="grid-item--statistics1 card-look">Statistics 1</div>
        <div className="grid-item--statistics2 card-look">Statistics 2</div>
        <div className="grid-item--statistics3 card-look">Statistics 3</div>
        <div className="grid-item--statistics4 card-look">Statistics 4</div>
 

      </div>

      // <Page>
      //   <H1>Welcome to HomePokerClub!</H1>
      //   <P className="wide-margin-bottom">Lets get you started by creating a club or joining an existing one.</P>
      //   <button onClick={this.handleCreateClub}>Create club</button>
      //   <button onClick={this.handleJoinClub}>Join existing club</button>
      //   <button onClick={this.handleCreateTournament}>Create tournament</button>
      //   <button onClick={this.handleLogout}>Logout</button>
      // </Page>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

// Example using the context API to give access to notifications on this component
// It can now find the state in its props (this.props.notifications)
export default withNotifications(withRouter(connect(mapStateToProps, {...userActions, ...clubActions})(Home)));
