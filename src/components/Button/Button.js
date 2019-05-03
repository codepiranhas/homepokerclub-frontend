import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { colors } from '../../variables/colors';
// import './Button.css';

const colors = {
  'primary': {
    backgroundColor: '#ffffff01',
    backgroundGradient: 'linear-gradient(253deg, #A8FF78, #78FFD6)',
    border: '1px solid #A8FF78',

    shadowColor: '#78FFD640',
    shadowColorFocused: '#78FFD670',

    fontColor: '#302B63',
    fontColorDisabled: '#302B6380',
    fontColorOutline: '#A8FF78',
    fontColorOutlineDisabled: '#A8FF7880',
  },
  'danger': {
    backgroundColor: '#ffffff01',
    backgroundGradient: 'linear-gradient(253deg, #FF4B2B, #FF416C)',
    border: '1px solid #FF416C',

    shadowColor: '#ff787d40',
    shadowColorFocused: '#ff787d70',

    fontColor: '#FDFFFC',
    fontColorDisabled: '#FDFFFC80',
    fontColorOutline: '#FF416C',
    fontColorOutlineDisabled: '#FF416C80',
  },
  'plain': {
    backgroundColor: '#ffffff01',
    backgroundGradient: 'linear-gradient(253deg, #cccccc30, #cccccc10)',
    border: '1px solid #ccc',

    shadowColor: '#CFDEF310',
    shadowColorFocused: '#CFDEF330',

    fontColor: '#302B63',
    fontColorDisabled: '#302B6380',
    fontColorOutline: '#cccccc',
    fontColorOutlineDisabled: '#cccccc80',
  },
}

const sizes = {
  'small': {
    height: '28px',
    fontSize: '12px',
    iconSize: '1x',
    padding: '6px 12px',
    loadingIconWidth: '6px',
    loadingIconHeight: '6px',
  },
  'normal': {
    height: '36px',
    fontSize: '14px',
    iconSize: '1x',
    padding: '6px 18px',
    loadingIconWidth: '10px',
    loadingIconHeight: '10px',
  },
  'large': {
    height: '56px',
    fontSize: '20px',
    iconSize: 'lg',
    padding: '6px 20px',
    loadingIconWidth: '14px',
    loadingIconHeight: '14px',
  }
}


const BaseButton = styled.button`
  width: ${props => props.fullwidth ? '100%' : props.width ? props.width + 'px' : 'auto'};
  height: ${props => props.height ? props.height + 'px' : sizes[props.size].height};
  
  display: inline-flex;
  justify-content: ${props => props.icon ? 'space-between' : 'center'};
  align-items: center;

  padding: ${props => sizes[props.size].padding};

  border:${props => props.outline ? colors[props.variant].border : 'none'};
  border-radius: 5px;
  background-image: ${props => props.outline ? 'none' : colors[props.variant].backgroundGradient};
  background-color: ${props => props.outline ? colors[props.variant].backgroundColor : 'none'};
  box-shadow: 0px 2px 8px ${props => colors[props.variant].shadowColor};

  color: ${props => props.outline ? colors[props.variant].fontColorOutline : colors[props.variant].fontColor};
  font-size: ${props => props.fontSize ? props.fontSize + 'px' : sizes[props.size].fontSize};
  font-weight: 500;
  cursor: pointer;

  transition: all 0.1s ease;
  :hover {
    box-shadow: 0px 2px 25px ${props => colors[props.variant].shadowColorFocused};
  }
`;

const DisabledButton = styled(BaseButton)`
  filter: opacity(90%) grayscale(20%);
  pointer-events: none;
  color: ${props => props.outline ? colors[props.variant].fontColorOutlineDisabled : colors[props.variant].fontColorDisabled}
`;


const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const LoadingIndicator = styled.div`
  display: inline-flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  position: absolute;

  :after {
    content: " ";
    display: block;
    width: ${props => sizes[props.size].loadingIconWidth};
    height: ${props => sizes[props.size].loadingIconHeight};
    margin: 1px;
    border-radius: 50%;
    border: 2px solid #fff;
    border-color: ${props => colors[props.variant].fontColor} transparent ${props => colors[props.variant].fontColor} transparent;
    animation: ${rotate} 1.2s linear infinite;
  }
`;

const LoadingIndicatorOutline = styled(LoadingIndicator)`
  :after {
    border-color: ${props => colors[props.variant].fontColorOutline} transparent ${props => colors[props.variant].fontColorOutline} transparent;
  }
`;

const IconWrapper = styled.div`
  margin-right: 10px;
`;

const IconWrapperHidden = styled(IconWrapper)`
  opacity: 0;
`

const TextWrapperHidden = styled.div`
  opacity: 0;
`

const P = styled.p`
padding: 0;
margin: 0;
`;


const Button = ({ children, type,size, variant, outline, icon, width, height, fontSize, onClick, isLoading, isDisabled, fullwidth }) => {
  
  if (isLoading) {
    return (
      <DisabledButton
        size={size}
        fullwidth={fullwidth}
        variant={variant}
        outline={outline} 
        width={width}
        height={height}
        isDisabled={true}
      >
      {icon &&
          <IconWrapperHidden>
            <FontAwesomeIcon icon={icon} size={sizes[size].iconSize} />
          </IconWrapperHidden>
        }
      
        <TextWrapperHidden>
          <P>{children}</P>
        </TextWrapperHidden>

        {outline
          ? <LoadingIndicatorOutline size={size} variant={variant}></LoadingIndicatorOutline>
          : <LoadingIndicator size={size} variant={variant}></LoadingIndicator>
        }
      </DisabledButton>
    )
  }

  if (isDisabled) {
    return (
      <DisabledButton
        size={size}
        fullwidth={fullwidth}
        variant={variant}
        outline={outline} 
        width={width}
        height={height}
        fontSize={fontSize}
        isDisabled={isDisabled}
        disabled={isDisabled ? true : false }
      >
        {icon &&
          <IconWrapper>
            <FontAwesomeIcon icon={icon} size={sizes[size].iconSize} />
          </IconWrapper>
        }
      
        <div>
          <P>{children}</P>
        </div>
      </DisabledButton>
    )
  }

  return (
    <BaseButton
      type={type}
      size={size}
      fullwidth={fullwidth}
      variant={variant}
      outline={outline} 
      icon={icon}
      width={width}
      height={height}
      fontSize={fontSize}
      onClick={() => onClick ? onClick() : null}
    >
      {icon &&
        <IconWrapper>
          <FontAwesomeIcon icon={icon} size={sizes[size].iconSize} />
        </IconWrapper>
      }
      
      <div>
        <P>{children}</P>
      </div>
  </BaseButton>
  )
};

Button.propTypes = {
  type: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  fixedWidth: PropTypes.string,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool
};

Button.defaultProps = {
  type: 'button',
  variant: 'primary',
  size: 'normal',
  isDisabled: false,
}

export { Button };
export default Button;
