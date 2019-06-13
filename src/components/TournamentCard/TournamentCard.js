import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Avatar from '../Avatar/Avatar';
// import config from '../../config';
import Button from '../Button/Button';
// import './MemberCard.css';

const BaseCard = styled.div`
  padding: 20px 25px 15px 25px;

  border-radius: 10px;

  width: 100%;

  background-color: var(--c-gray-dark80);
`;

const Title = styled.h3`
  color: var(--c-white);
  font-size: 18px;
`;

const StartDate = styled.h3`
  color: var(--c-white);
  font-size: 18px;
`;
const StartTime = styled.p`
  color: var(--c-gray-light50);
  font-size: 16px;
`;

const Detail = styled.p`
  color: var(--c-gray-light50);
`;

const BuyIn = styled.p`
  color: var(--c-accent);
  font-weight: 700;
  font-size: 22px;
`;

const TournamentCard = ({ name, handleEditTournament, handleDeleteTournament }) => {
  return (
    <BaseCard>
      <div className="display-flex flex-justify-between">
        <Title>Texas Hold'em NL</Title>
        <StartDate>Dec 29, 2019</StartDate>
      </div>

      <div className="display-flex flex-justify-between">
        <div className="display-flex flex-direction-column">
          <Detail>Starting Chips: 5000</Detail>
          <Detail>Blinds: 20/40</Detail>
          <Detail>Level Time: 15 min</Detail>
        </div>
        <div>
          <StartTime>21:00</StartTime>
        </div>
      </div>

      <div className="display-flex flex-direction-column flex-align-center space-above">
        <BuyIn>Buy-in: 50$</BuyIn>
        <Detail>Registered Players: 6/9</Detail>
      </div>

      <div className="wide-space-above">
        <Button variant="plain" size="small" fullwidth>Tournament Dashboard</Button>
      </div>
    </BaseCard>
  )
};

TournamentCard.propTypes = {
   name: PropTypes.string.isRequired,
   handleEditTournament: PropTypes.func,
   handleDeleteTournament: PropTypes.func,
};

TournamentCard.defaultProps = {
}

export { TournamentCard };
export default TournamentCard;
