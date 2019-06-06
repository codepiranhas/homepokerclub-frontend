import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { withNotifications } from "../../hocs/WithNotifications";
import MediaQuery from 'react-responsive';
import { appActions, tournamentActions } from "../../actions";
import Button from '../../components/Button/Button';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import history from '../../helpers/history';

import './Tournaments.css';
import TournamentCard from "../../components/TournamentCard/TournamentCard";

const fakeTournament = {
  name: 'Tournament name',
  buyIn: 50,
  maxPlayers: 9,
  startingChips: 2000,
  blinds: { small: 10, big: 20 },
  payoutOptions: { positions: 3, distribution: 'default' },
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
    this.props.getTournaments();
  }

  handleCreateTournament = () => {
    console.log('Creating a new tournament');
    console.log('this.props.history: ', this.props.history);
    this.props.history.push('tournaments/create')
  }

  renderLoading() {
    return (
      <div className="display-flex flex-center-center">
        <LoadingIndicator />
      </div>    
    )
  }

  render() {
    if (this.props.tournament.isLoading) { return this.renderLoading(); }
    
    return (
      <div className="tournaments-container">

        <MediaQuery query="(min-width: 700px)">
          <div className="display-flex flex-justify-end">
            <Button onClick={this.handleCreateTournament} size="large">New Tournament</Button>
          </div>
        </MediaQuery>

        <MediaQuery query="(max-width: 699px)">
        <div>
            <Button onClick={this.handleCreateTournament} fullwidth size="large">New Tournament</Button>
          </div>
        </MediaQuery>

        <div className="tournaments-grid wide-space-above super-wide-space-below">
          {this.props.tournament.all.map(tournament => {
            return (
              <TournamentCard 
                key={tournament._id}
                name={tournament.name}
              />
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
    tournament: state.tournament
  };
}

export default
  withNotifications(withRouter(connect(mapStateToProps, { ...tournamentActions, ...appActions })(Tournaments)));