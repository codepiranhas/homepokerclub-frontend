import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { withNotifications } from "../../hocs/WithNotifications";
// import styled from "styled-components";
// import { colors } from "../../variables/colors";
// import { userActions } from "../../actions";


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

// function mapStateToProps({ user }) {
//   return { user };
// }

// Example using the context API to give access to notifications on this component
// It can now find the state in its props (this.props.notifications)
// export default withNotifications(withRouter(connect(mapStateToProps, userActions)(Account)));
export default withNotifications(withRouter((Account)));
