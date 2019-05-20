import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clubActions } from '../../actions';
import { withNotifications } from '../../hocs/WithNotifications';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '../../components/Button/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import green from '@material-ui/core/colors/green';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from '../../components/Input/Input';
import Avatar from '../../components/Avatar/Avatar';
import styled from 'styled-components';
import config from '../../config';

const Img = styled.img`
  width: 180px;
  height: 180px;
  border: solid var(--c-accent) 2px;
  border-radius: 90px;
`;

const buttonTheme = createMuiTheme({
  palette: { primary: green }
})

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: 'var(--c-gray-dark)',
    borderTop: '3px solid var(--c-accent)',
    color: 'var(--c-white)'
  },
})
)(MuiDialogTitle)

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    paddingBottom: '50px',
    padding: theme.spacing(2),
    backgroundColor: 'var(--c-gray-dark)',
    color: 'var(--c-white)',
    fontSize: '16px',
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing(1),
    backgroundColor: 'var(--c-gray-dark)',
  },
}))(MuiDialogActions);

class MemberDetailsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: null,
      memberId: null,
      name: '',
      email: '',
      file: null,
      imageUrl: null,
      tempImageUrl: null,
      isLoading: false,
    };

    this.hiddenFileInput = React.createRef();
  }
  
  componentDidMount() {
    this.setState({ mode: this.props.mode });
    
    if (this.props.mode === 'edit') {
      const { name, email, _id, imageUrl } = this.props.member;

      this.setState({
        name: name || '',
        email: email || '',
        memberId: _id,
        imageUrl,
      });
    }
  }

  onCancel = () => {
    this.props.onDismiss({
      action: 'cancelled',
      data: this.state
    });
  }

  onSave = async () => {
    const { name, email, memberId, file, imageUrl } = this.state;
    const { addToClub, updateMember, mode } = this.props;
    let action = '';

    this.setState({ isLoading: true });

    if (mode === 'create') {
      await addToClub(name.slice(0, 25), email, file); // TODO: Make the input to stop accepting more chars instead
      action = 'created';
    } else if (mode === 'edit') {
      action = 'updated'
      await updateMember(name.slice(0.25), email, memberId, file, imageUrl); // TODO: Make the input to stop accepting more chars instead
    }

    this.setState({ isLoading: false });

    this.props.onDismiss({
      action,
      data: this.state
    });
  };

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onUploadAvatar = () => {
    console.log('upload clicked')
    this.hiddenFileInput.current.click();
  }

  onFileChange = event => {
    const file = event.target.files[0];

    if (file.size > 597152){
      return this.props.notifications.showError('File is too large. Please upload images up to 0.5 MB.')
    };

    const tempImageUrl = URL.createObjectURL(file);

    this.setState({ file, tempImageUrl })
  }

  renderAvatar() {
    if (this.state.tempImageUrl) {
      return (
        <Img
          src={this.state.tempImageUrl}
          alt="member avatar"
        /> 
      )
    }
    else if (this.state.imageUrl) {
      return (
        <Img
          src={`${config.s3BucketUrl}/${this.state.imageUrl}`}
          alt="member avatar"
        /> 
      )
    } else {
      return (
        <Avatar size="superLarge">
          <FontAwesomeIcon
            icon={'user-tie'}
            size={'lg'}
            color={'#333'}
          />
        </Avatar>
      );
    }
  }

  render() {
    const { mode } = this.props;
    const { name, email, isLoading } = this.state;

    return (
      <Dialog
        onClose={this.onCancel}
        aria-labelledby="customized-dialog-title"
        open={this.props.isOpen}
      >
        <DialogTitle className='redz' id="customized-dialog-title">
          {
            mode === 'create'
            ? 'Add member'
            : 'Edit member'
          }
        </DialogTitle>

        <DialogContent>
          <div className="space-above wide-space-below display-flex flex-justify-center fullwidth">
            {this.renderAvatar()}
          </div>

          <div className="super-wide-space-below display-flex flex-justify-center">
            <Button onClick={this.onUploadAvatar} type="button" variant="primary" size="small">Upload Image</Button>
            <input
              type="file"
              accept="image/*"
              onChange={this.onFileChange}
              hidden
              ref={this.hiddenFileInput}
            />
          </div>

          <div className="wide-space-below text-center">
            A name is enough to add a new member to the club. However, by filling their email, you will
            later be able to send announcements and reminders to all members of your club.
          </div>

          <div className="fullwdith">
            <form className="display-flex flex-direction-column fullwidth" onSubmit={this.onSave}>
              <div className='display-flex flex-justify-center fullwidth space-below'>
                <Input onChange={this.handleInput} value={name} name="name" placeholder="Name" autoFocus />
              </div>
              <div className='display-flex flex-justify-center fullwidth'>
                <Input onChange={this.handleInput} value={email} type="email" name="email" placeholder="Email" />
              </div>
            </form>
          </div>
        </DialogContent>

        <DialogActions>
          <div className="display-flex fullwidth fullheight">
            <div className="leftAction flex-1 wide-space-left">
              <MuiThemeProvider theme={buttonTheme}>
                <Button onClick={this.onCancel} variant="plain">
                  CANCEL
                </Button> 
              </MuiThemeProvider>
            </div>
            <div className="rightAction flex-1 wide-space-right display-flex flex-justify-end">
              <MuiThemeProvider theme={buttonTheme}>
                <Button onClick={this.onSave} isLoading={isLoading} type="submit" variant="primary">
                {
                  mode === 'create'
                    ? 'ADD'
                    : 'UPDATE'
                }
                </Button>
              </MuiThemeProvider>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    );
  }
}

MemberDetailsModal.propTypes = {
  mode: PropTypes.oneOf(['create', 'edit', 'view']).isRequired,
};

MemberDetailsModal.defaultProps = {
}

export default withNotifications(
  connect(
    null,
    clubActions
  )(MemberDetailsModal)
);
