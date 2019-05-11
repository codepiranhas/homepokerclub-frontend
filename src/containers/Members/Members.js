import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MediaQuery from 'react-responsive';
import { withNotifications } from "../../hocs/WithNotifications";
import { clubActions, appActions } from "../../actions";
import MemberCard from "../../components/MemberCard/MemberCard";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { makeGetFilteredMembers } from '../../selectors';
import "./Members.css";

class Members extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.setPageHeader('Members');
  }

  componentWillUnmount() {
    this.props.setMembersFilter(null);
  }

  handleFilter = event => {
    this.props.setMembersFilter(event.target.value);
  };


  handleCreateMember = () => {
    this.props.history.push(`members/create`);
  }

  handleEditMember = (member) => {
    this.props.history.push(`members/${member._id}/edit`);
  }

  handleRemoveMember = (member) => {
    this.props.history.push(`members/${member._id}/delete`);
  }

  render() {
    return (
      <div className="fullwidth wide-space-above">
        
        <MediaQuery query="(min-width: 700px)">
          <div className="xx display-flex flex-justify-end wide-space-below">
            <div className="members-filterbar flex-auto space-right">
              <Input onChange={this.handleFilter} icon={'search'} fullwidth placeholder="Type to filter members" />
            </div>
            <div className="members-add-new">
              <Button onClick={this.handleCreateMember} size="large" width="180" height="60">Add New</Button>
            </div>
          </div>
        </MediaQuery>

        <MediaQuery query="(max-width: 699px)">
          <div className="wide-space-below">
            <Button onClick={this.handleToggleAddMemberModal} size="large" fullwidth>Add New</Button>
          </div>
          <div className="space-below">
            <Input onChange={this.handleFilter} size='small' icon={'search'} fullwidth placeholder="Type to filter members" />
          </div>
        </MediaQuery>

        <div className="members-grid">
          {this.props.members.map(member => {
            return (
              <MemberCard
                key={member._id}
                member={member}
                handleRemoveMember={() => this.handleRemoveMember(member)}
                handleEditMember={() => this.handleEditMember(member)}
              />
            )
          })}
        </div>
      </div>
    );
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

export default withNotifications(withRouter(connect(makeMapStateToProps, { ...clubActions, ...appActions})(Members)));
