import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { withNotifications } from "../../hocs/WithNotifications";
import styled from "styled-components";
import { colors } from "../../variables/colors";
import { userActions } from "../../actions";

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import "./Club.css";

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Left = styled.div`
width: 40%;
min-width: 250px;
height: 100%;

display: flex;
justify-content: center;
align-items: center;
`

const Right = styled.div`
width: 60%;
height: 100%;

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const Placeholder = styled.div`
width: 90%;
height: 90%;
display: flex;
justify-content: center;
align-items: center;
background-color: #ddd;
font-size: 24px;
color: #444;
`

const H1 = styled.h1`
  color: ${colors.text.white}
`
const P = styled.p`
  color: ${colors.text.white}
`

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldCreateNew: false,
      shouldJoinExisting: false,
      anchorEl: null
    };
  }

  componentDidMount() {
    console.log('this.props: ', this.props);
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

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (e) => {
    console.log('menu closed: ', e.target);
  }

  render() {
    const { anchorEl } = this.state;

    return (
      <div className="club-area">

        <div className="club__settings">S</div>

        <div className="club__logo">club logo</div>

        <div className="club__name">club name</div>

        <div className="club__grower"></div>

        <div className="club__change-btn">Change club</div>
      </div>


      // <Container>
      //   <Left>
      //     <Placeholder>Club Logo</Placeholder>
      //   </Left>

      //   <Right>
      //     <h2>Club Name</h2>
      //     <p>Something else</p>
      //     <Button
      //       aria-owns={anchorEl ? 'simple-menu' : undefined}
      //       aria-haspopup="true"
      //       onClick={this.handleClick}
      //     >
      //       Open Menu
      //     </Button>

      //     <Menu
      //       id="simple-menu"
      //       anchorEl={anchorEl}
      //       open={Boolean(anchorEl)}
      //       onClose={this.handleClose}
      //     >
      //       <MenuItem onClick={this.handleClose}>Profile</MenuItem>
      //       <MenuItem onClick={this.handleClose}>My account</MenuItem>
      //       <MenuItem onClick={this.handleClose}>Logout</MenuItem>
      //     </Menu>

      //   </Right>
      // </Container>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

// Example using the context API to give access to notifications on this component
// It can now find the state in its props (this.props.notifications)
export default withNotifications(withRouter(connect(mapStateToProps, userActions)(Account)));
