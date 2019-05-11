import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import './Input.css';

// const colors = {
//   'primary': {
//     backgroundColor: '#ffffff01',
//     fontColor: '#222426',
//   },
//   'danger': {
//     backgroundColor: '#ffffff01',
//     fontColor: '#FDFFFC',
//   },
//   'plain': {
//     backgroundColor: '#ffffff01',
//     fontColor: '#222426',
//   },
// };

const sizes = {
  'small': {
    height: '40px',
    fontSize: '18px',
    iconSize: '1x',
    textPadding: '6px 12px',
    textPaddingWithIcon: '6px 12px 6px 30px',
    iconPadding: '10px',
  },
  'normal': {
    height: '60px',
    fontSize: '22px',
    iconSize: '2x',
    textPadding: '6px 12px',
    textPaddingWithIcon: '6px 12px 6px 65px',
    iconPadding: '20px',
  },
  'large': {
    height: '100px',
    fontSize: '36px',
    iconSize: '3x',
    textPadding: '6px 12px',
    textPaddingWithIcon: '6px 12px 6px 90px',
    iconPadding: '25px',
  }
};

const Div = styled.div`
  position: relative;
  width: 100%;
  max-width: ${props => props.fullwidth ? '100%' : '400px'};
`;

const IconWrapper = styled.div`
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  color: #888;
  padding-left: ${props => sizes[props.size].iconPadding};
`;

const Input = styled.input`
  width: 100%;
  max-width: ${props => props.fullwidth ? '100%' : '400px'};
  height: ${props => sizes[props.size].height}
  padding: ${props => props.icon ? sizes[props.size].textPaddingWithIcon : sizes[props.size].textPadding};
  border-radius: 5px;
  border: none;
  font-size: ${props => sizes[props.size].fontSize}
  color: var(--c-gray-light);
  background-color: var(--c-gray-medium);
  text-align: left;
`;


const InputComponent = ({ value, placeholder, autoFocus, name, type, onChange, fullwidth, size, icon, isDisabled }) => {
  return (
    <Div fullwidth={fullwidth}>
      {icon &&
        <IconWrapper size={size}>
          <FontAwesomeIcon icon={icon} size={sizes[size].iconSize} />
        </IconWrapper>
      }
      <Input
        value={value}
        autoFocus={autoFocus}
        type={type}
        name={name}
        icon={icon}
        size={size}
        placeholder={placeholder}
        fullwidth={fullwidth}
        onChange={onChange}
      />
    </Div>
  )
};

InputComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  autoFocus: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'normal', 'large']),
};

InputComponent.defaultProps = {
  placeholder: 'Type here...',
  type: 'text',
  name: 'input',
  size: 'normal',
  autoFocus: false
};

export { InputComponent };
export default InputComponent;
