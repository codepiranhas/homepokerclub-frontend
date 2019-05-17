import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { clubActions, appActions } from "../../actions";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import "./Main.css";

const Div = styled.div`
  font-weight: 700;
  font-size: 72px;
`
class Main extends Component {
  componentDidUpdate() {
    const { app, club } = this.props;

    if (app.isStateInitialized) {
      this.props.history.push(`/clubs/${club.current._id}`);
    }
  }

  render() {
    return (
      <Div className="display-flex flex-center-center fullheight">
        <LoadingIndicator />
      </Div>
    );
  }
}

function mapStateToProps({ app, club }) {
  return { app, club };
}

export default withRouter(connect(mapStateToProps, { ...clubActions, ...appActions})(Main));
