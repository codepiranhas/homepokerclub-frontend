import React from 'react';
import styled from "styled-components";
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import green from '@material-ui/core/colors/green';
import './Modal.css'

const InputWrapper = styled.div`
  margin-top: 60px;
  width: 100%;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  max-width: 400px;
  height: 60px;
  padding: 0 5px 0 10px;
  border-radius: 5px;
  border: none;
  font-size: 22px;
  color: var(--c-gray-light);
  background-color: var(--c-gray-medium);
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
  // closeButton: {
  //   position: 'absolute',
  //   right: theme.spacing(1),
  //   top: theme.spacing(1),
  //   color: theme.palette.grey[500],
  // },
})
)(MuiDialogTitle)
// (props => {
//   const { children, classes, onClose } = props;
//   return (
//     <MuiDialogTitle disableTypography className={classes.root}>
//       <Typography variant="h6">{children}</Typography>
//       {onClose ? (
//         <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </MuiDialogTitle>
//   );
// });

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

class Modal extends React.Component {
  state = {};

  handleClose = () => {
    this.props.didClickCancel({
      action: 'clickOutside',
      data: this.state
    });
  };

  handleCancel = () => {
    this.props.didClickCancel({
      action: 'cancel',
      data: this.state
    });
  }

  handleOk = () => {
    this.props.didClickOk({
      action: 'ok',
      data: this.state
    });
  };

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { withInput, titleText, okText, cancelText } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="customized-dialog-title"
        open={this.props.isOpen}
        // maxWidth = {'md'}
      >
        <DialogTitle className='redz' id="customized-dialog-title" onClose={this.handleClose}>
          {titleText || ''}
        </DialogTitle>

        <DialogContent>
          <div className="wide-space-around">
            Invite your friends to join the club. Once accepted, they will be able to register
            and participate in the club's tournaments.
          </div>

          {withInput &&
            <InputWrapper>
              <Input type={'text'} name={'name'} onChange={this.handleInput} placeholder="Type here..." />
            </InputWrapper>
          }

        </DialogContent>

        <DialogActions>
          <div className="display-flex fullwidth fullheight">
            <div className="leftAction flex-1 wide-space-left">
              <MuiThemeProvider theme={buttonTheme}>
                <Button onClick={this.handleCancel} color="primary">
                  {cancelText || 'CANCEL'}
                </Button>
              </MuiThemeProvider>
            </div>
            <div className="rightAction flex-1 wide-space-right display-flex flex-justify-end">
              <MuiThemeProvider theme={buttonTheme}>
                  <Button onClick={this.handleOk} color="primary">
                    {okText || 'OK'}
                  </Button>
                </MuiThemeProvider>
            </div>
          </div>

        </DialogActions>

      </Dialog>
    );
  }
}

export default Modal;
