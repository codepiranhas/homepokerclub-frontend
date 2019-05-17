import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { withNotifications } from "../../hocs/WithNotifications";
// import styled from "styled-components";
import { userActions, appActions, tournamentActions } from "../../actions";
import Button from '../../components/Button/Button';

import './Tournaments.css';

const fakeTournament = {
  name: 'Tournament name',
  buyIn: 50,
  maxPlayers: 9,
  startingChips: 2000,
  startingBlinds: [10, 20],
  levelDuration: 15,
  startDate: Date.now(),
}


class Tournaments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldCreateNew: false,
      shouldJoinExisting: false,
      anchorEl: null
    };
  }

  componentDidMount() {
    this.props.setPageHeader('Tournaments');

    console.log('this.props @ Tournaments: ', this.props);
  }

  onNewTournament = () => {
    console.log('creating new tournament');
    this.props.createTournament(fakeTournament);
  }

  render() {
    console.log('this.props: ', this.props);
    return (
      <div className="tournaments-container">
        <Button onClick={this.onNewTournament}>New Tournament</Button>

        <div className="tournaments-grid">
          {this.props.allTournaments.map(tournament => {
            return (
              <div key={tournament._id}>
                {tournament.name}
                {tournament.buyIn}
                {tournament.createdAt}
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    user: state.user,
    allTournaments: state.tournament.all
  };
}

export default
  withNotifications(withRouter(connect(mapStateToProps, { ...tournamentActions, ...appActions })(Tournaments)));