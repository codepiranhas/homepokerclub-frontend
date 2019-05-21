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
      file: null,
      isLogoUploading: false,
    };

    // Used to be able to programmatically click the hidden 
    // input element when the user clicks the upload button.
    this.hiddenFileInput = React.createRef();
  }

  componentDidMount() {
    this.props.setPageHeader('Account');
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

    this.setState({ isLogoUploading: true });

    // Call the redux action to save the club logo
    this.props.updateLogo(file)
      .then(() => {
        // Wait a little more to let the <img> load to catchup.
        setTimeout(() => {
          this.setState({ isLogoUploading: false });
        }, 500);
      });
  }

  renderLogo() {
    if (this.props.club.current.logoUrl) {
      return (
        <Img
          src={`${config.s3BucketUrl}/${this.props.club.current.logoUrl}`}
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
    const { isLogoUploading } = this.state;

    return (
      <div className="display-flex flex-direction-column flex-align-center">
        {this.renderLogo()}

        <div className="wide-space-around display-flex flex-justify-center">
          <Button onClick={this.onUploadAvatar} isLoading={isLogoUploading} type="button" variant="primary" size="small">Upload Logo</Button>
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

function mapStateToProps({ user, app, club }) {
  return { user, app, club };
}

// Example using the context API to give access to notifications on this component
// It can now find the state in its props (this.props.notifications)
export default
  withNotifications(
  withRouter(
  connect(mapStateToProps, { ...userActions, ...appActions, ...clubActions })(
  Account)));
