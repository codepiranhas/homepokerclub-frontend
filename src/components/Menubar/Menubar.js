import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { colors } from '../../variables/colors';
import './Menubar.css';

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
`;

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
  color: ${props => (props.active ? colors.text.darkGreen : colors.text.grey)};
`;

const H3 = styled.h3`
  margin: 0;
  padding: 8px 0px;
`;

const Menubar = ({ activeTab, history, tabs }) => {
  return (
    <Drawer>
      {tabs.map(tab => {
        return (
          <Section className="tab" key={tab.url} active={activeTab === tab.url} onClick={() => history.push(tab.url)}>
            <FontAwesomeIcon icon={tab.icon} size={'2x'} />
            <H3>{tab.name}</H3>
          </Section>
        );
      })}
    </Drawer>
  );
};

Menubar.propTypes = {
  activeTab: PropTypes.string.isRequired,
  tabs: PropTypes.array.isRequired,
  history: PropTypes.object,
};

export { Menubar };
export default withRouter(Menubar);
