import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withNotifications } from "../../hocs/WithNotifications";
import { clubActions } from "../../actions";
import TournamentCreateModal from '../../Modals/TournamentCreateModal/TournamentCreateModal';
import "./Tournaments.css";

class TournamentsCreate extends Component {
  onDismiss = (result) => {
    if (result.action === 'created') {
      this.props.notifications.showSuccess(`Tournament created!.`);
    }
 
    this.props.history.push(`/clubs/${this.props.club.current._id}/tournaments`);
  }

  render() {
    return (
      <TournamentCreateModal
        mode='create'
        onDismiss={this.onDismiss}
        disableBackdropClick
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    club: state.club,
  };
}

export default withNotifications(withRouter(connect(mapStateToProps, { ...clubActions })(TournamentsCreate)));
