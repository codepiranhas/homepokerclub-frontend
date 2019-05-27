import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import posed from 'react-pose';
import { userActions } from '../../actions';
import { withNotifications } from '../../hocs/WithNotifications';
// import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyButton from '../../components/Button/Button';
import './Authentication.css';
import styled from 'styled-components';

const Sidebar = styled.div`
  position: absolute;
  width: 100%;
  height: 60px;

  bottom: 0;

  box-shadow: 0px 0px 10px var(--c-gray-dark);

  background-color: var(--c-gray-medium);
`

const Tab = styled.div`
  background-color: ${props => props.isActive ? 'var(--c-black)' : 'initial' };

  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  cursor: pointer;

  :hover {
    background-color: ${props => props.isActive ? 'var(--c-black)' : 'var(--c-black20)' };
  }

  transition: all 0.3s ease;
`;

const LinkTab = ({ label, url, isActive, onClick }) => {
  return (
    <Tab isActive={isActive} onClick={() => onClick(url)}>
      <p>{label}</p>
    </Tab>
  );
}

class Authentication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isLoading: false,
      isVisible: false,
    };
  }

  componentDidMount() {
    console.log('Login.js @ componentDidMount - this.props: ', this.props);
    this.setState({ isVisible: true });
  }

  onTabClick = (url) => {
    console.log('clicked: ', url)
    this.props.history.push(`/authentication/${url}`);
  };

  render() {
    const {pathname: currentPath } = this.props.history.location;

    return (
      <Sidebar>
        <div className="display-flex fullheight">
          <LinkTab onClick={this.onTabClick} isActive={currentPath==='/authentication/login'} label="Login" url="login" />
          <LinkTab onClick={this.onTabClick} isActive={currentPath==='/authentication/guest'} label="Guest access" url="guest" />
          <LinkTab onClick={this.onTabClick} isActive={currentPath==='/authentication/register'} label="Register" url="register" />
        </div>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  return { errorLogin: state.user.errorLogin };
}

export default withNotifications(
  withRouter(
    connect(
      mapStateToProps,
      userActions
    )(Authentication)
  )
);
