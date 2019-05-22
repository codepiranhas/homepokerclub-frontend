import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '../Avatar/Avatar';
import config from '../../config';
// import './MemberCard.css';

const BaseCard = styled.div`
  position: relative;

  padding: 10px;

  border-radius: 10px;

  width: 100%;
  height: 120px;
  background-color: var(--c-gray-dark80);

  display: inline-flex;

  @media (max-width: 1024px) {
    width: 100%;
    height: 120px;
  }
`;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;

const Img = styled.img`
  width: 80px;
  height: 80px;
  border: solid var(--c-accent) 2px;
  border-radius: 90px;
`;

const DetailsWraper = styled.div`
  // display: flex;
  // flex-direction: column;
  // justify-content: space-between;
`;

const Row1 = styled.div`
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
  max-width: 95%;
`;

const ButtonsWrapper = styled.div`
  position: absolute;
  right: 10px;
`;

const MemberName = styled.h2`
  flex: auto;
  
  color: var(--c-accent);

  @media (max-width: 770px) {
    font-size: 22px;
  }
`;

const renderAvatar = (member) => {
  if (member.avatarUrl) {
    return (
      <Img
        src={`${config.s3BucketUrl}/${member.avatarUrl}`}
        alt="member avatar"
      /> 
    );
  } else {
    return (
      <Avatar size="normal" color="green">{member.name[0].toUpperCase()}</Avatar>
    );
  }
}

const MemberCard = ({ member, handleEditMember, handleRemoveMember }) => {
  const { name, email, social } = member;

  return (
    <BaseCard>
      <AvatarWrapper className="flex-1">
        {renderAvatar(member)}
      </AvatarWrapper>
      <DetailsWraper className="flex-4">
        <Row1 name={name}>
          <NameWrapper className="wide-space-above">
            <MemberName>{name}</MemberName>
          </NameWrapper>
          <ButtonsWrapper>
            <FontAwesomeIcon onClick={() => handleEditMember(member)} className="space-right" icon={'pencil-alt'} size={'lg'} />
            <FontAwesomeIcon onClick={() => handleRemoveMember(member)} className="tight-space-right cursor-pointer" icon={'times'} size={'lg'} />
          </ButtonsWrapper>
        </Row1>
        <Row2 className="">
          <p>{email}</p>
        </Row2>
        {social &&
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
   handleEditMember: PropTypes.func,
   handleRemoveMember: PropTypes.func,
};

MemberCard.defaultProps = {
}

export { MemberCard };
export default MemberCard;
