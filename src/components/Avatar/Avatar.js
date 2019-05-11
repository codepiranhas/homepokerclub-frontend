import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';


const styles = {
	superSmall: {
		fontSize: "16px",
		width: 25,
		height: 25,
	},
  small: {
		fontSize: "20px",
		width: 50,
		height: 50,
	},
	normal: {
		fontSize: "28px",
		width: 75,
		height: 75,
	},
  large: {
		fontSize: "36px",
    width: 100,
    height: 100,
	},
	superLarge: {
		fontSize: "64px",
    width: 150,
    height: 150,
	},
	grey: {
		color: '#fff',
		backgroundColor: grey[500],
	},
	red: {
		color: '#fff',
		backgroundColor: red[500],
	},
	green: {
		color: '#fff',
		backgroundColor: green[500],
	},

};


const AvatarComponent = ({ children, classes, size, color }) => {
  return (
		<Avatar className={classNames(classes[size], classes[color])}>
			{children}
		</Avatar>
  )
};

AvatarComponent.propTypes = {
	size: PropTypes.oneOf(['superSmall', 'small', 'normal', 'large', 'superLarge' ]),
  color: PropTypes.oneOf(['grey', 'green', 'red']),
};

AvatarComponent.defaultProps = {
	size: 'normal',
	color: 'grey',
}

export { AvatarComponent };
export default withStyles(styles)(AvatarComponent);
