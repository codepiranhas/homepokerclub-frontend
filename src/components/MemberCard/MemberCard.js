import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Placeholder from '../Placeholder/Placeholder';
// import './MemberCard.css';


const BaseCard = styled.div`
  position: relative;

  padding: 10px;

  border-radius: 10px;

  width: 100%;
  height: 160px;
  background-color: var(--c-gray-dark80);

  display: inline-flex;

  @media (max-width: 1024px) {
    width: 100%;
    height: 140px;
  }
`;

const AvatarWrapper = styled.div`
`;

const DetailsWraper = styled.div`
  // display: flex;
  // flex-direction: column;
  // justify-content: space-between;
`;

const Row1 = styled.div`
  height: 40px;
  display: flex;
`;

const Row2 = styled.div`
  color: var(--c-white50);
`;

const Row3 = styled.div`
  position: absolute;
  bottom: 10px;
`;

const NameWrapper = styled.div`
  flex: auto;
  overflow: scroll;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 80px;
`;

const MemberName = styled.h2`
  flex: auto;
  
  color: var(--c-accent);

  @media (max-width: 770px) {
    font-size: 22px;
  }
`;


const MemberCard = ({ member }) => {
  const { name, email, type, social } = member;

  return (
    <BaseCard>
      <AvatarWrapper className="flex-1">
        <Placeholder w={70} h={70} radius={35} />
      </AvatarWrapper>
      <DetailsWraper className="flex-4">
        <Row1 name={name}>
          <NameWrapper className="space-above">
            <MemberName>{name}</MemberName>
          </NameWrapper>
          <ButtonsWrapper>
            <FontAwesomeIcon className="space-right" icon={'pencil-alt'} size={'lg'} />
            <FontAwesomeIcon className="tight-space-right" icon={'times'} size={'lg'} />
          </ButtonsWrapper>
        </Row1>
        <Row2 className="tight-space-above">
          <p>{email}</p>
        </Row2>
        {!social &&
          <Row3>
            <FontAwesomeIcon className="wide-space-right" icon={['fab', 'instagram']} size={'2x'} />
            <FontAwesomeIcon className="wide-space-right" icon={['fab', 'twitter']} size={'2x'} />
            <FontAwesomeIcon className="wide-space-right" icon={['fab', 'facebook-f']} size={'2x'} />
            <FontAwesomeIcon icon={'envelope'} size={'2x'} />
          </Row3>
        }
      </DetailsWraper>
    </BaseCard>
  )
};

MemberCard.propTypes = {
   member: PropTypes.object.isRequired,
  // variant: PropTypes.string,
  // size: PropTypes.string,
  // fixedWidth: PropTypes.string,
  // onClick: PropTypes.func,
  // isDisabled: PropTypes.bool
};

MemberCard.defaultProps = {
  // type: 'button',
  // variant: 'primary',
  // size: 'normal',
  // isDisabled: false,
}

export { MemberCard };
export default MemberCard;
