import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withNotifications } from "../../hocs/WithNotifications";
import { userActions, clubActions, appActions, memberActions } from "../../actions";
// import styled from 'styled-components';
import Button from "../../components/Button/Button";
import { makeGetFilteredMembers } from '../../selectors';

import ConfirmActionModal from '../../Modals/ConfirmActionModal/ConfirmActionModal';
import "./Members.css";

class MembersDelete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      member: null,
    };
  }

  findMember(members) {
    const memberId = this.props.match.params.memberId;
    const member = members.find(member => member._id === memberId);

    return member;
  }

  onCancel = () => {
    this.props.history.push(`/clubs/${this.props.club.current._id}/members`);
  }

  onDelete = (member) => {
    this.props.removeMemberFromClub(member._id)
      .then(() => {
        this.props.history.push(`/clubs/${this.props.club.current._id}/members`);
        this.props.notifications.showSuccess(`${member.name} removed successfully.`);
      })
      .catch(err => {
        console.log('error @ onDismiss @ memberDelete: ', err);
      })
  }

  renderLoading() {
    return (
      <div>Loading...</div>
    )
  }

  renderModal(member) {
    const titleText = 'Delete member';
    const cancelButton = <Button onClick={() => this.onCancel()} variant='plain'>CANCEL</Button>;
    const okButton = <Button onClick={() => this.onDelete(member)} variant='danger'>DELETE</Button>;

    const body = <p>By removing <strong>{member.name}</strong> from the club,
                    you will not be able to add him as a participant in future tournaments.</p>

    return (
      <ConfirmActionModal
        member={member}
        cancelButton={cancelButton}
        okButton={okButton}
        body={body}
        titleText={titleText}
        onDismiss={this.onCancel}
      />
    );
  }

  render() {
    // Get the members from the redux state or find it from the list of members.
    // The second part is needed on situations like page refresh or using a bookmarked url.
    const member = this.props.member || this.findMember(this.props.members)

    return member
      ? this.renderModal(member)
      : this.renderLoading();
  }
}

/**
 * Slightly different way to create the mapStateToProps objects.
 * Used for creating memoized selectors with reselect.
 */
function makeMapStateToProps() {
  const getFilteredMembers = makeGetFilteredMembers()
  const mapStateToProps = (state, props) => {
    return {
      user: state.user,
      app: state.app,
      club: state.club,
      members: getFilteredMembers(state)
    }
  }
  return mapStateToProps
}

export default withNotifications(withRouter(connect(
  makeMapStateToProps,
  { ...userActions, ...clubActions, ...appActions, ...memberActions }
  )(MembersDelete)));
