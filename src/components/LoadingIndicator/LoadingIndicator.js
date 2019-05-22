import React from 'react';
// import PropTypes from 'prop-types';
// import styled, { keyframes } from 'styled-components';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import './Button.css';


const LoadingIndicator = props => {
  return (
		<div className="display-flex flex-center-center fullheight">
			<div className="sk-folding-cube">
				<div className="sk-cube1 sk-cube"></div>
				<div className="sk-cube2 sk-cube"></div>
				<div className="sk-cube4 sk-cube"></div>
				<div className="sk-cube3 sk-cube"></div>
			</div>
		</div>
	);
};

LoadingIndicator.propTypes = {
  // type: PropTypes.string,
  // variant: PropTypes.oneOf(['primary', 'plain', 'danger']),
  // size: PropTypes.oneOf(['small', 'normal', 'large']),
  // fixedWidth: PropTypes.string,
  // onClick: PropTypes.func,
  // isDisabled: PropTypes.bool
};

LoadingIndicator.defaultProps = {
  // type: 'button',
  // variant: 'primary',
  // size: 'normal',
  // isDisabled: false,
}

export { LoadingIndicator };
export default LoadingIndicator;
