import React from 'react'
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { colors } from '../styles/colors';

// import PlayerImg from '../../assets/images/players.svg';
// import TournamentsImg from '../../assets/images/futbol.svg';
// import LeaderboardsImg from '../../assets/images/medal.svg';
// import SettingsImg from '../../assets/images/cog.svg';

//   background-color: ${colors.normal.primary};

const Box = styled.span`
  width: 100px;
  height: 100px;

  margin: 10px;
  padding: 15px;

  display: flex;
  flex-direction: column;
	justify-content: center;
  align-items: center;

  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.15);
  background-color: ${colors.background.white};
  border-radius: 5px;
  
  font-weight: 500;
  background-color: 'colors.background.white';
  color: ${props => props.active ? colors.text.darkGreen : colors.text.grey};

  transition: all 0.1s ease-in;
`

const H3 = styled.h3`
  margin: 0;
  padding: 8px 0px;
`


const SelectBox = (props) => {
  console.log('props: ', props);
  return (
    <Box active={props.active} onClick={() => props.onClick(props.selection)}>
      <h3>{props.children}</h3>
    </Box>
  )
}

export default withRouter(SelectBox);