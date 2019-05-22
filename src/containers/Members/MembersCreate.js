import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withNotifications } from "../../hocs/WithNotifications";
import { clubActions } from "../../actions";
import MemberDetailsModal from '../../Modals/MemberDetailsModal/MemberDetailsModal';
import "./Members.css";

class MembersCreate extends Component {
  onDismiss = (result) => {
    if (result.action === 'created') {
      this.props.notifications.showSuccess(`${result.data.name} added to the club.`);
    }
 
    this.props.history.push(`/clubs/${this.props.club.current._id}/members`);
  }

  render() {
    return (
      <MemberDetailsModal
        mode='create'
        onDismiss={this.onDismiss}
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

export default withNotifications(withRouter(connect(mapStateToProps, { ...clubActions })(MembersCreate)));
