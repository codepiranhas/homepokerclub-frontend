import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import { withNotifications } from "../../hocs/WithNotifications";
// import styled from "styled-components";
// import { colors } from "../../variables/colors";
import { userActions, clubActions, appActions } from "../../actions";

// import Placeholder from "../../components/Placeholder/Placeholder";

import Button from '../../components/Button/Button';

import "./Home.css";



class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldCreateNew: false,
      shouldJoinExisting: false
    };
  }

  componentDidMount() {
    console.log('this.props @ Home: ', this.props);
    this.props.setPageHeader('Home');

    if (!this.props.user.isFirstLogin) {
      this.props.history.push('/account')
    }
    else {
      console.log('First login!')
    }
  }

  handleSelect = (selection) => {
    if (selection === 'shouldCreateNew') {
      this.setState({ shouldCreateNew: true, shouldJoinExisting: false });
    }
    else {
      this.setState({ shouldCreateNew: false, shouldJoinExisting: true });
    }
  }

  handleNewClub = () => {
    this.props.createClub({ name: 'Club Coolio' });
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

  deleteHandler = () => {
    console.log('Delete was clicked!')
  }



  render() {
    return (
      <div>
        <Link to="/account">Go to account</Link>
        <br /><br /><br />


        <h1 className="no-margin-padding">Small</h1>
        <div className='display-flex'>
          <div className='margin-all'>
            <Button size='small'>OK</Button>
          </div>
          <div className='margin-all'>
            <Button size='small' variant="danger">DELETE</Button>
          </div>
          <div className='margin-all'>
            <Button size='small' variant="plain">CANCEL</Button>
          </div>
        </div>

        <h1 className="no-margin-padding">Default</h1>
        <div className='display-flex'>
          <div className='margin-all'>
            <Button>OK</Button>
          </div>
          <div className='margin-all'>
            <Button variant="danger">DELETE</Button>
          </div>
          <div className='margin-all'>
            <Button variant="plain">CANCEL</Button>
          </div>
        </div>

        <h1 className="no-margin-padding">Large</h1>
        <div className='display-flex'>
          <div className='margin-all'>
            <Button size="large">OK</Button>
          </div>
          <div className='margin-all'>
            <Button size="large" variant="danger">DELETE</Button>
          </div>
          <div className='margin-all'>
            <Button size="large" variant="plain">CANCEL</Button>
          </div>
        </div>

        <h1 className="no-margin-padding">Outline</h1>
        <div className='display-flex'>
          <div className='margin-all'>
            <Button outline size="small">OK</Button>
          </div>
          <div className='margin-all'>
            <Button outline variant="danger">DELETE</Button>
          </div>
          <div className='margin-all'>
            <Button outline size="large" variant="plain">CANCEL</Button>
          </div>
        </div>

        <h1 className="no-margin-padding">Disabled</h1>
        <div className='display-flex'>
          <div className='margin-all'>
            <Button isDisabled size="small">OK</Button>
          </div>
          <div className='margin-all'>
            <Button isDisabled variant="danger">DELETE</Button>
          </div>
          <div className='margin-all'>
            <Button isDisabled size="large" variant="plain">CANCEL</Button>
          </div>
        </div>

        <h1 className="no-margin-padding">Loading</h1>
        <div className='display-flex'>
          <div className='margin-all'>
            <Button isLoading size="small">OK</Button>
          </div>
          <div className='margin-all'>
            <Button isLoading variant="danger">DELETE</Button>
          </div>
          <div className='margin-all'>
            <Button isLoading size="large" variant="plain">CANCEL</Button>
          </div>
        </div>

        <h1 className="no-margin-padding">Loading outline</h1>
        <div className='display-flex'>
          <div className='margin-all'>
            <Button outline isLoading size="small">OK</Button>
          </div>
          <div className='margin-all'>
            <Button outline isLoading variant="danger">DELETE</Button>
          </div>
          <div className='margin-all'>
            <Button outline isLoading size="large" variant="plain">CANCEL</Button>
          </div>
        </div>
        

        <br /><br />

        <h1>Large</h1>
        <Button isDisabled>SAVE</Button>
        <br /><br />
        <Button isDisable variant="danger">CANCEL</Button>

        <h1>With Icons</h1>
        <Button outline variant="danger" icon='trash-alt'>DELETE</Button>
        <br /><br />
        <Button variant="danger" width="220" height="80" fontSize="28">FIXED WIDTH</Button>
        <br /><br />
        <Button outline icon='trash-alt'>THIS IS DAMN LONG</Button>
       
      </div>
    );
  }
}

function mapStateToProps({ user, app }) {
  return { user, app };
}

// Example using the context API to give access to notifications on this component
// It can now find the state in its props (this.props.notifications)
export default withNotifications(withRouter(connect(mapStateToProps, {...userActions, ...clubActions, ...appActions})(Home)));
