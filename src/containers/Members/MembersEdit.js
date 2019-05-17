import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withNotifications } from "../../hocs/WithNotifications";
import { clubActions } from "../../actions";
import { makeGetFilteredMembers } from '../../selectors';
import MemberDetailsModal from '../../Modals/MemberDetailsModal/MemberDetailsModal';
import "./Members.css";

class MembersEdit extends React.Component {
  findMember(members) {
    const memberId = this.props.match.params.memberId;
    const member = members.find(member => member._id === memberId);

    return member;
  }
  
  onDismiss = (result) => {
    if (result.action === 'updated') {
      this.props.notifications.showSuccess(`${result.data.name} updated successfully.`);
    }
 
    this.props.history.push(`/clubs/${this.props.club.current._id}/members`);
  }

  renderLoading() {
    return (
      <div>Loading...</div>
    )
  }

  renderModal(member) {
    return (
      <MemberDetailsModal
        member={member}
        mode='edit'
        onDismiss={this.onDismiss}
      />
    );

  }

  render() {
    const member = this.findMember(this.props.members);

    return member
      ? this.renderModal(member)
      : this.renderLoading()
  }
}

/**
 * Slightly different way to create the mapStateToProps objects.
 * Used for creating memoized selectors with reselect.
 */
function makeMapStateToProps() {
  const getFilteredMembers = makeGetFilteredMembers()
  const mapStateToProps = (state) => {
    return {
      club: state.club,
      members: getFilteredMembers(state)
    }
  }
  return mapStateToProps
}

export default withNotifications(withRouter(connect(makeMapStateToProps, { ...clubActions })(MembersEdit)));
