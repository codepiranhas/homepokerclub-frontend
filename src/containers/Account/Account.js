import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from "styled-components";
import { withNotifications } from "../../hocs/WithNotifications";
import Avatar from '../../components/Avatar/Avatar';
import Button from '../../components/Button/Button';
import config from '../../config';
import { userActions, appActions, clubActions } from "../../actions";

import "./Account.css";

const Img = styled.img`
  width: 180px;
  height: 180px;
  border: solid var(--c-accent) 2px;
  border-radius: 90px;
`;

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldCreateNew: false,
      shouldJoinExisting: false,
      file: null,
      imageUrl: null,
      tempImageUrl: null,
    };

    this.hiddenFileInput = React.createRef();
  }

  componentDidMount() {
    this.props.setPageHeader('Account');
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

  onUploadAvatar = () => {
    console.log('upload clicked')
    this.hiddenFileInput.current.click();
  }

  onFileChange = event => {
    const file = event.target.files[0];

    if (file.size > 1048576){
      return this.props.notifications.showError('File is too large. Please upload images up to 1 MB.')
    };

    const tempImageUrl = URL.createObjectURL(file);

    this.setState({ file, tempImageUrl })

    // Actually save the logo
    this.props.saveLogo(file);
  }

  renderLogo() {
    if (this.state.tempImageUrl) {
      return (
        <Img
          src={this.state.tempImageUrl}
          alt="member avatar"
        /> 
      )
    }
    else if (this.state.imageUrl) {
      return (
        <Img
          src={`${config.s3BucketUrl}/${this.state.imageUrl}`}
          alt="member avatar"
        /> 
      )
    } else {
      return (
        <Avatar size='superLarge' color='green'>C</Avatar>
      );
    }
  }

  render() {
    return (
      <div className="display-flex flex-direction-column flex-align-center">
        {this.renderLogo()}

        <div className="wide-space-around display-flex flex-justify-center">
          <Button onClick={this.onUploadAvatar} type="button" variant="primary" size="small">Upload Logo</Button>
          <input
            type="file"
            accept="image/*"
            onChange={this.onFileChange}
            hidden
            ref={this.hiddenFileInput}
          />
        </div>

        <div className="club__name">name</div>

        <div className="account__details">
          <div className="change__password">change password</div>
          <div className="delete__account"> delete account</div>
        </div>

        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
}

function mapStateToProps({ user, app }) {
  return { user, app };
}

// Example using the context API to give access to notifications on this component
// It can now find the state in its props (this.props.notifications)
export default
  withNotifications(
  withRouter(
  connect(mapStateToProps, { ...userActions, ...appActions, ...clubActions })(
  Account)));
