import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { withNotifications } from "../../hocs/WithNotifications";
import { userActions, clubActions, appActions } from "../../actions";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { club } = this.props

    if (club.current) {
      this.props.history.push(`/clubs/${club.current._id}`)
    }

    this.props.setPageHeader('Home');

    // How to get parameters
    // const params = new URLSearchParams(this.props.location.search);
    // const info = params.get('joined'); // bar

    if (!this.props.user.isFirstLogin) {
      console.log('Not first login.')
    }
    else {
      console.log('First login.')
    }
  }

  render() {
    return (
      <div>
        <h1>This is home</h1>
      </div>
    );
  }
}

function mapStateToProps({ user, app, club }) {
  return { user, app, club };
}

// Example using the context API to give access to notifications on this component
// It can now find the state in its props (this.props.notifications)
export default withNotifications(withRouter(connect(mapStateToProps, {...userActions, ...clubActions, ...appActions})(Home)));
