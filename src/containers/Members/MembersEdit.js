import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withNotifications } from "../../hocs/WithNotifications";
import { clubActions } from "../../actions";
import { makeGetFilteredMembers } from '../../selectors';
import MemberDetailsModal from '../../Modals/MemberDetailsModal/MemberDetailsModal';
import "./Members.css";

class MembersEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      member: null,
    };
  }

  componentDidMount() {
    const memberId = this.props.match.params.memberId;
    const member = this.props.members.find(member => member._id === memberId)

    this.setState({ member })
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

  renderModal() {
    return (
      <MemberDetailsModal
        member={this.state.member}
        mode='edit'
        onDismiss={this.onDismiss}
      />
    );

  }

  render() {
    return this.state.member
      ? this.renderModal(this.state.member)
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
      user: state.user,
      app: state.app,
      club: state.club,
      members: getFilteredMembers(state)
    }
  }
  return mapStateToProps
}

export default withNotifications(withRouter(connect(makeMapStateToProps, { ...clubActions })(MembersEdit)));
