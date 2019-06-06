import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
// mport posed from 'react-pose';
import { userActions } from '../../actions';
import { withNotifications } from '../../hocs/WithNotifications';
import Button from '../../components/Button/Button';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Authentication.css';


const Sidebar = styled.div`
  position: absolute;
  width: 240px;
  height: calc(100% + 40px);

  top: -20px;
  left: 20px;

  border-radius: 10px;
  box-shadow: 0px 3px 6px var(--c-black20);

  background-color: #222426;
`;

// const StyledLink = styled(Link)`
//   text-decoration: none;

//   &:focus, &:hover, &:visited, &:link, &:active {
//       text-decoration: none;
//   }

//   color: var(--c-white);
// `;

const Tab = styled.div`
  padding: 20px 10px 20px 60px;
  background-color: ${props => props.isActive ? 'var(--c-black)' : 'initial' };

  position: relative;

  cursor: pointer;

  :hover {
    background-color: ${props => props.isActive ? 'var(--c-black)' : 'var(--c-black20)' };
  }

  transition: all 0.3s ease;

  &:before {
    ${props => !!props.isActive ?
     css`
      position: absolute;
      left: 0;
      top: 0;
      content: "";
      width: 3px;
      height: 100%;
      background-color: var(--c-accent);
     ` : 'props.isActive'
    };
 }
`;

const AppTitle = styled.h1`
  margin: 40px 0px 70px 0px;

  display: flex;
  justify-content: center;

  font-size: 20px;
`;

const Span = styled.span`
  color: var(--c-accent);
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

    this.state = {};
  }

  componentDidMount() {
    console.log('Sidebar.js @ componentDidMount - this.props: ', this.props);
  }

  onTabClick = (url) => {
    this.props.history.push(`/authentication/${url}`);
  };
  

  render() {
    console.log('this.props,history', this.props.history);
    const {pathname: currentPath } = this.props.history.location;

    console.log('currentPath: ', currentPath);
    return (
      <Sidebar>
        <div className="display-flex flex-direction-column fullheight">
          <AppTitle>Home<Span>PokerClub</Span></AppTitle>
          <LinkTab onClick={this.onTabClick} isActive={currentPath==='/authentication/login'} label="Login" url="login" />
          <LinkTab onClick={this.onTabClick} isActive={currentPath==='/authentication/register'} label="Register" url="register" />
          <LinkTab onClick={this.onTabClick} isActive={currentPath==='/authentication/guest'} label="Guest access" url="guest" />
        
          <div className="display-flex flex-1 flex-justify-center flex-align-end wide-space-below">
            <Button>About HomePokerClub</Button>
          </div>

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
