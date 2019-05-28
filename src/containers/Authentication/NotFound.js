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

const AnimationContainer = posed.div({
  visible: { staggerChildren: 50 },
});

const Div = posed.div({
  visible: { y: 0, opacity: 1, transition: { duration: 500 } },
  hidden: { y: 20, opacity: 0 },
});

const BlackDiv = posed.div({
  normal: { x: 0 },
  away: { x: -300 },
});

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

  inputHandler = event => {
    // The event.target.name contains the "name" from the input
    // and then can be used to target the same named key at this.state
    this.setState({ [event.target.name]: event.target.value });
  };

  loginHandler = async event => {
    event.preventDefault(); // Prevents the native functionality of the form

    this.setState({ isLoading: true });

    this.props
      .login({ email: this.state.email, password: this.state.password })
      .then(user => {
        if (!user.isFirstLogin) {
          this.props.notifications.showSuccess('Welcome back!');
        }
      })
      .catch(err => {  
        this.props.notifications.showError(err.response.data.message);
        this.setState({ isLoading: false }, () => {});
      });
  };

  render() {
    return (
      <div className="login-space">
        Not Found
      </div>
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
