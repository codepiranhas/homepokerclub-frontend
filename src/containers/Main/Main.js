import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { clubActions, appActions } from "../../actions";

import "./Main.css";

const Div = styled.div`
  font-weight: 700;
  font-size: 72px;
`

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const LoadingIndicator = styled.div`
  display: inline-flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  position: absolute;

  :after {
    content: " ";
    display: block;
    width: 100px;
    height: 100px;
    margin: 1px;
    border-radius: 50%;
    border: 2px solid #fff;
    border-color: green;
    animation: ${rotate} 1.2s linear infinite;
  }
`;

class Main extends Component {
  componentDidUpdate() {
    const { app, club } = this.props;

    console.log('=== componentDidUpdate ===');

    if (app.isStateInitialized) {
      console.log('=== App initialized - push to club ===');
      this.props.history.push(`/clubs/${club.current._id}`);
    }
  }

  render() {
    return (
      <Div className="display-flex flex-center-center fullheight">
        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
      </Div>
    );
  }
}

function mapStateToProps({ app, club }) {
  return { app, club };
}

export default withRouter(connect(mapStateToProps, { ...clubActions, ...appActions})(Main));
