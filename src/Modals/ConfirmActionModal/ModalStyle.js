import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import green from '@material-ui/core/colors/green';

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

const ConfirmActionModal = ({ children, cancelButton, okButton, isOpen, titleText, onDismiss }) => {
  return (
    <Dialog
      onClose={() => onDismiss(false)}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <DialogTitle id="customized-dialog-title">
        {titleText}
      </DialogTitle>

      <DialogContent>
        <div className="wide-space-around text-center">
          {children}
        </div>
      </DialogContent>

      <DialogActions>
        <div className="display-flex fullwidth fullheight">
          <div className="leftAction flex-1 wide-space-left">
            <MuiThemeProvider theme={buttonTheme}>
              {cancelButton
                ? cancelButton
                : <></>
              }
            </MuiThemeProvider>
          </div>
          <div className="rightAction flex-1 wide-space-right display-flex flex-justify-end">
            <MuiThemeProvider theme={buttonTheme}>
              {okButton
                ? okButton
                : <></>
              }
              </MuiThemeProvider>
          </div>
        </div>
      </DialogActions>
    </Dialog>
  );
}

ConfirmActionModal.propTypes = {
  isOpen: PropTypes.bool,
  titleText: PropTypes.string,
  okButton: PropTypes.element,
  cancelButton: PropTypes.element,
  okVariant: PropTypes.oneOf(['primary', 'plain', 'danger']),
  cancelVariant: PropTypes.oneOf(['primary', 'plain', 'danger']),
};

ConfirmActionModal.defaultProps = {
  isOpen: false,
  titleText: 'Confirm your action',
  okVariant: 'primary',
  cancelVariant: 'plain',
}

export { ConfirmActionModal };
export default ConfirmActionModal;