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
import './Login.css';

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

class Login extends Component {
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
    console.log('Log in clicked');
    event.preventDefault(); // Prevents the native functionality of the form

    this.setState({ isLoading: true });

    this.props
      .login({ email: this.state.email, password: this.state.password })
      .then(user => {
        if (!user.isFirstLogin) {
          this.props.notifications.showSuccess('Welcome back!');
        }
        console.log('res @ login', user);
      })
      .catch(err => {
        console.log('err: ', err);
        console.log('err.response: ', err.response);
        console.log('err.message: ', err.message);
        
        this.props.notifications.showError(err.response.data.message);
        this.setState({ isLoading: false }, () => {});
      });
  };

  render() {
    return (
      <AnimationContainer className="login" pose={this.state.isVisible ? 'visible' : 'hidden'}>
        <form className="login__form" onSubmit={this.loginHandler}>
          <div className="login__left">
            <div className="login__inputWrapper">
              <Div className="login__logoWrapper">
                <FontAwesomeIcon icon={'coins'} size={'6x'} />
              </Div>
              <Div>
                <h1 className="login__title">Login to your account.</h1>
              </Div>
              <Div className="Div">
                <TextField
                  id="outlined-email-input"
                  label="Email"
                  // className={classes.textField}
                  type="email"
                  name="email"
                  autoComplete="email"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  onChange={this.inputHandler}
                />
              </Div>
              <Div className="Div">
                <TextField
                  id="outlined-password-input"
                  label="Password"
                  // className={classes.textField}
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  onChange={this.inputHandler}
                />
              </Div>
              <Div className="login__forgotWrapper">
                <p>
                  <Link to="/forgotpassword">Forgot Password</Link>
                </p>
              </Div>
              <Div className="login__buttonWrapper">
                {/* <Button variant="contained" color="primary" type="submit" fullWidth>
                  Login
                </Button> */}
                <MyButton fullwidth type="submit" isLoading={this.state.isLoading}>
                  Login here
                </MyButton>
              </Div>

              <Div className="login__registerWrapper">
                <p>
                  No account yet?{' '}
                  <span>
                    <Link to="/signup">Register here</Link>
                  </span>
                </p>
              </Div>
            </div>
          </div>

          <BlackDiv className="login__right" pose={this.state.isVisible ? 'normal' : 'away'}>
            APP NEWS
          </BlackDiv>
        </form>
      </AnimationContainer>
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
    )(Login)
  )
);
