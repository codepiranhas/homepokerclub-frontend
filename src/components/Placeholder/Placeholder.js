import React from 'react'
import styled from 'styled-components';

const Div = styled.div`

  margin 5px;
  
  display: flex;
	justify-content: center;
  align-items: center;
  
  width: ${props => props.width}px;
  height: ${props => props.height}px;

  background-color: #ddd;
  color: #444;
  font-size: 18px;
`

const Placeholder = (props) => {
  return (
    <Div height={props.h} width={props.w}>
      {props.w} x {props.h}
    </Div>
  )
}

export default Placeholder;