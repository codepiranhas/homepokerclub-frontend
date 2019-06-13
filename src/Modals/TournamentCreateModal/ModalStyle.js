import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clubActions, memberActions } from '../../actions';
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
import styled from 'styled-components';
import Stepper from '../../components/Stepper/Stepper';

const Span = styled.span`
  cursor: pointer;
  margin: 0px 30px 0px 10px;
  opacity: 0.9;
  transition: all 0.2s ease;

  :hover {
    opacity: 1;
  }
`;

const StepperSteps = [
  { id: '1', label: 'Basics' },
  { id: '2', label: 'Blind Structure' },
  { id: '3', label: 'Payout' },
  { id: '4', label: 'Review' },
];

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
    color: 'var(--c-white)',
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
      file: null,
      avatarUrl: null,
      tempAvatarUrl: null,
      isLoading: false,

      // TournamentCreate
      currentStep: 0,

      // Step 1
      name: '',
      type: `Texas Hold'em NL`, // Static until we implement more game types
      date: '',
      time: '',

      // Step 2
      startingChips: 0,
      startingSmallBlind: 0,
      startingBigBlind: 0,
      levelDuration: 0,

      // Step 3
      payoutStructure: 'auto',  // Between: ['auto', 'equally-split', 'custom']
      payoutPercentages: [],
  
    };

    this.hiddenFileInput = React.createRef();
  }
  
  componentDidMount() {
    this.setState({ mode: this.props.mode });
    
    if (this.props.mode === 'edit') {
      const { name, email, _id, avatarUrl } = this.props.member;

      this.setState({
        name: name || '',
        email: email || '',
        memberId: _id,
        avatarUrl,
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
    const { name, email, memberId, file, avatarUrl } = this.state;
    const { addMemberToClub, updateMember, mode } = this.props;
    let action = '';

    this.setState({ isLoading: true });

    if (mode === 'create') {
      await addMemberToClub(name.slice(0, 25), email, file); // TODO: Make the input to stop accepting more chars instead
      action = 'created';
    } else if (mode === 'edit') {
      action = 'updated'
      await updateMember(name.slice(0.25), email, memberId, file, avatarUrl); // TODO: Make the input to stop accepting more chars instead
    }

    this.setState({ isLoading: false });

    this.props.onDismiss({
      action,
      data: this.state
    });
  };

  onNext = () => {
    console.log('Neeext!');

    if (!this.validateFields()) {
      console.log('invalid fields found!');
      return;
    }

    const step = this.state.currentStep + 1;
    this.setState({ currentStep: step })
  }

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };


  validateFields = () => {
    const { name, type, date, time } = this.state;

    if (!name) { 
      this.props.notifications.showError('Please add a name for the tournament.');
      return false;
  }
    if (!type) {
      this.props.notifications.showError('Please add a type for the tournament');
      return false;
    }
    if (!date) {
      this.props.notifications.showError('Did you forget to set the date?');
      return false;
    }
    if (!time) {
      this.props.notifications.showError('Did you forget to set the time?');
      return false;
    }

    return true;
  }

  handleGoBack = () => {
    this.setState((prevState) => ({
      currentStep: prevState.currentStep - 1
    }));
  }

  renderStep0 = () => {
    const { name, date, time } = this.state;

    return (
      <form className="display-flex flex-direction-column fullwidth" onSubmit={this.onSave}>
        {/* Tournament Name */}
        <div className='wide-space-below'>
          <label>Your tournament's name</label>
          <Input fullwidth onChange={this.handleInput} size='small' value={name} name="name" placeholder="High rollers" autoFocus />
        </div>

        {/* Type */}
        <div className='wide-space-below'>
          <label>What are we playing? (more types coming soon)</label>
          <Input fullwidth isDisabled onChange={this.handleInput} size='small' value={`Texas Hold'em NL`} name="type" placeholder="High rollers" />
        </div>

        {/* Date */}
        <div className='wide-space-below'>
          <label>When are we playing?</label>
          <Input fullwidth onChange={this.handleInput} size='small' value={date} name="date" type='date' />
        </div>

        {/* Time */}
        <div className='wide-space-below'>
          <label>When EXACTLY are we playing?</label>
          <Input fullwidth onChange={this.handleInput} size='small' value={time} name="time" type='time' />
        </div>
      </form>
    )
  }

  renderStep1 = () => {
    const { startingChips, startingSmallBlind, startingBigBlind, levelDuration } = this.state;

    return (
      <form className="display-flex flex-direction-column fullwidth" onSubmit={this.onSave}>
        {/* Starting Chips */}
        <div className='wide-space-below'>
          <label>Starting Chips</label>
          <Input fullwidth onChange={this.handleInput} size='small' type='number' value={startingChips} name="startingChips" placeholder="High rollers" autoFocus />
        </div>

        {/* Small Blind */}
        <div className='wide-space-below'>
          <label>Small Blind</label>
          <Input fullwidth onChange={this.handleInput} size='small' type='number' value={startingSmallBlind} name="startingSmallBlind" placeholder="High rollers" />
        </div>

        {/* Big Blind */}
        <div className='wide-space-below'>
          <label>Big Blind</label>
          <Input fullwidth onChange={this.handleInput} size='small' type='number' value={startingBigBlind} name="startingBigBlind" placeholder="High rollers" />
        </div>

        {/* Duration */}
        <div className='wide-space-below'>
          <label>Level Duration</label>
          <Input fullwidth onChange={this.handleInput} size='small' type='time' value={levelDuration} name="levelDuration" placeholder="High rollers" />
        </div>
      </form>
    )
  }

  renderStep2 = () => {
    const { startingChips, startingSmallBlind, startingBigBlind, levelDuration } = this.state;

    return (
      <form className="display-flex flex-direction-column fullwidth" onSubmit={this.onSave}>
        {/* How many people get winnings */}
        <label>Who gets the spoils?</label>
        <div id="group1">
          <div>
          <input className="space-right" type="radio" value="value1" name="group1" />
          <label>Auto</label>
          </div>

          <div>
          <input className="space-right" type="radio" value="value2" name="group1" />
          <label>Equally split</label>
          </div>

          <div>
          <input className="space-right" type="radio" value="value2" name="group1" />
          <label>Custom</label>
          </div>
        </div>
      
      </form>
    )
  }

  renderStep3 = () => {
    const { name, type, date, time, isLoading, currentStep } = this.state;

    console.log('this.state: ', this.state);

    return (
      <form className="display-flex flex-direction-column fullwidth" onSubmit={this.onSave}>
        Form is completed
      </form>
    )
  }

  render() {
    const { mode, disableBackdropClick } = this.props;
    const { name, type, date, time, isLoading, currentStep } = this.state;

    return (
      <Dialog
        onClose={this.onCancel}
        aria-labelledby="customized-dialog-title"
        open={this.props.isOpen}
        disableBackdropClick={disableBackdropClick}
      >
        <DialogTitle className='redz' id="customized-dialog-title">
          { currentStep > 0 &&
            <Span onClick={this.handleGoBack}>
              <FontAwesomeIcon icon={'arrow-left'} size='1x' />
            </Span>
          }

          {
            mode === 'create'
            ? 'Create Tournament'
            : 'Edit Tournament'
          }
        </DialogTitle>

        <DialogContent>
          <div className="super-wide-space-below">
            <Stepper
              steps={StepperSteps}
              currentStep={currentStep}
            />
          </div>

          <div className="super-wide-space-below text-center">
            Follow this guide to create a tournament. <br />
            Don't worry about making any mistakes. You can always change these details before
            the tournament starts.
          </div>

          {currentStep === 0 && this.renderStep0()}
          {currentStep === 1 && this.renderStep1()}
          {currentStep === 2 && this.renderStep2()}
          {currentStep === 3 && this.renderStep3()}

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
                <Button onClick={this.onNext} isLoading={isLoading} type="submit" variant="primary">
                {
                  mode === 'create'
                    ? 'NEXT'
                    : 'NEXT'
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
    { ...clubActions, ...memberActions }
  )(MemberDetailsModal)
);
