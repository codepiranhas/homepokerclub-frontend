import React from 'react'
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Menubar.css';
import { colors } from '../../variables/colors';

// import PlayerImg from '../../assets/images/players.svg';
// import TournamentsImg from '../../assets/images/futbol.svg';
// import LeaderboardsImg from '../../assets/images/medal.svg';
// import SettingsImg from '../../assets/images/cog.svg';

const Drawer = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: space-between;
  height: 60px;
  width: 100%;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.15);
  background-color: white;
`

//   background-color: ${colors.normal.primary};

const Section = styled.div`
  display: flex;
  flex-direction: column;
	justify-content: center;
  align-items: center;
  
  width: 33.3%;

  margin: 0;
  padding: 5px;
  
  font-size: 10px;
  font-weight: 500;
  background-color: 'colors.background.white';
  color: ${props => props.active ? colors.text.darkGreen : colors.text.grey};
`

const H3 = styled.h3`
  margin: 0;
  padding: 8px 0px;
`


const MenuBar = (props) => {
  return (
    <Drawer>
      <Section active={props.active === '/clubs' ? "CurrentPage" : ""} onClick={() => props.history.push('/clubs')}>
        <FontAwesomeIcon icon={'coins'} size={'2x'} />
        <H3>My Clubs</H3>      
      </Section>
      <Section active={props.active === '/tournaments' ? "CurrentPage" : ""} onClick={() => props.history.push('/tournaments')}>
        <FontAwesomeIcon icon={'futbol'} size={'2x'} />
        <H3>Tournaments</H3>
      </Section>
      <Section active={props.active === '/account' ? "CurrentPage" : ""} onClick={() => props.history.push('/account')}>
        <FontAwesomeIcon icon={'pencil-alt'} size={'2x'} />
        <H3>Account</H3>
      </Section>
    </Drawer>
  )
}

export default withRouter(MenuBar);