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
import Input from '../../components/Input/Input';

import "./Account.css";

const Img = styled.img`
  width: 180px;
  height: 180px;
  border: solid var(--c-accent) 2px;
  border-radius: 90px;
`;

const BaseCard = styled.section`

  padding: 20px 20px 20px 25px;
  margin-bottom: 50px;

  border-radius: 10px;

  width: 100%;
  max-width: 800px;

  background-color: var(--c-gray-dark80);

  @media (max-width: 1024px) {
    // width: 100%;
    // height: 120px;
  }
`;

const CardTitle = styled.h2`
  font-size: 24px;
  color: var(--c-accent);
`;

const Label = styled.label`
  font-size: 16px;
`

const H2 = styled.h2`
  color: var(--c-accent);
  margin-bottom: 5px;
`

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      isLogoUploading: false,
      isDetailsSaving: false,
      isPasswordSaving: false,
      clubName: '',
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    };

    // Used to be able to programmatically click the hidden 
    // input element when the user clicks the upload button.
    this.hiddenFileInput = React.createRef();
  }

  componentDidMount() {
    this.props.setPageHeader('Account');
    const { name } = this.props.club.current;

    this.setState({ clubName: name });
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    // The event.target.name contains the "name" from the input
    // and then can be used to target the same named key at this.state
    this.setState({ [name]: value });
  };

  onSaveClubDetails = () => {
    const { clubName } = this.state;

    this.setState({ isDetailsSaving: true });

    this.props.updateClubName(clubName)
      .then(() => this.props.notifications.showSuccess('Club details updated successfully.'))
      .catch(() => this.props.notifications.showError('Unable to save. Please try again.'))
      .finally(() => this.setState({ isDetailsSaving: false }))
  }

  onSavePassword = () => {
    console.log('Gotta save password');
    const { oldPassword, newPassword, confirmNewPassword } = this.state;

    if (newPassword !== confirmNewPassword) {
      return this.props.notifications.showError('Passwords do not match.')
    }

    this.setState({ isPasswordSaving: true });

    return this.props.changePassword(oldPassword, newPassword)
      .then(() => this.props.notifications.showSuccess('Password changed successfully.'))
      .catch(() => this.props.notifications.showError('Unable to save. Please try again.'))
      .finally(() => this.setState({ isPasswordSaving: false }))
  }

  handleLogout = () => {
    this.props.logout(this.props.user);
  }

  onUploadAvatar = () => {
    this.hiddenFileInput.current.click();
  }

  onFileChange = event => {
    const file = event.target.files[0];

    if (file.size > 1048576){
      return this.props.notifications.showError('File is too large. Please upload images up to 1 MB.')
    };

    this.setState({ isLogoUploading: true });

    // Call the redux action to save the club logo
    this.props.updateClubLogo(file)
      .then(() => {
        // Wait a little more to let the <img> load to catchup.
        setTimeout(() => {
          this.setState({ isLogoUploading: false });
        }, 500);
      });
  }

  renderLogo() {
    const { logoUrl } = this.props.club.current;

    if (logoUrl) {
      return (
        <Img
          src={`${config.s3BucketUrl}/${logoUrl}`}
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
    const {
      isLogoUploading,
      isDetailsSaving,
      isPasswordSaving,
      clubName,
      oldPassword,
      newPassword,
      confirmNewPassword
    } = this.state;

    return (
      <div className="display-flex flex-direction-column flex-align-center">
        {this.renderLogo()}

        <section className="wide-space-around display-flex flex-justify-center">
          <Button onClick={this.onUploadAvatar} isLoading={isLogoUploading} type="button" variant="primary" size="small">Upload Logo</Button>
          
          <input
            type="file"
            accept="image/*"
            onChange={this.onFileChange}
            hidden
            ref={this.hiddenFileInput}
          />
        </section>

        <BaseCard className="display-flex flex-direction-column wide-space-above">
          
          <div className="text-center">
            <H2>Current Plan: Basic</H2>
            <h3>Upgrade to Premium to get amazing new features.</h3>
            <div className="wide-space-above">
              <Button>GO PREMIUM</Button>
            </div>
          </div>          
        </BaseCard>

        <BaseCard className="display-flex flex-direction-column">
          <CardTitle className="wide-space-below">Club Details</CardTitle>
          
          <div>
            <Label>Club Name</Label>
            <Input value={clubName} name='clubName' size='small' onChange={this.handleInputChange} placeholder='' />
          </div>

          <div className="wide-space-above">
            <Button type='button' onClick={this.onSaveClubDetails} isLoading={isDetailsSaving}>Save</Button>
          </div>
        </BaseCard>

        <BaseCard className="display-flex flex-direction-column">
          <CardTitle className="wide-space-below">Password</CardTitle>
          
          <div className="wide-space-below">
            <Label>Old Password</Label>
            <Input value={oldPassword} name='oldPassword' size='small' onChange={this.handleInputChange} placeholder='' />
          </div>

          <div className="wide-space-below">
            <Label>New Password</Label>
            <Input value={newPassword} name='newPassword' size='small' onChange={this.handleInputChange} placeholder='' />
          </div>

          <div>
            <Label>Confirm New Password</Label>
            <Input value={confirmNewPassword} name='confirmNewPassword' size='small' onChange={this.handleInputChange} placeholder='' />
          </div>

          <div className="wide-space-above">
            <Button type='button' onClick={this.onSavePassword} isLoading={isPasswordSaving}>Save</Button>
          </div>
        </BaseCard>

        <BaseCard className="display-flex flex-direction-column wide-space-above">
        <CardTitle className="wide-space-below">Danger Zone</CardTitle>

          <h2>Delete Account</h2>
          <p className="super-tight-space-above">Once you delete your account, there is no going back.</p>

          <div className="wide-space-above">
            <Button variant='danger'>DELETE ACCOUNT</Button>
          </div>         
        </BaseCard>

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
