import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { withNotifications } from "../../hocs/WithNotifications";
// import styled from "styled-components";
// import { colors } from "../../styles/colors";
import { userActions, clubActions, appActions } from "../../actions";

import "./Main.css";

class Main extends Component {
  componentDidMount() {
    const { club } = this.props

    if (club.current) {
      this.props.history.push(`/clubs/${club.current._id}`)
    }
    else {
      this.props.history.push(`/login`)
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

  render() {
    return (
      <div>
        Main
      </div>
    );
  }
}

function mapStateToProps({ club }) {
  return { club };
}

// Example using the context API to give access to notifications on this component
// It can now find the state in its props (this.props.notifications)
export default withNotifications(withRouter(connect(mapStateToProps, {...userActions, ...clubActions, ...appActions})(Main)));
