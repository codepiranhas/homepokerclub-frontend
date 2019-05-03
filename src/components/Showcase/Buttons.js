import React, { Component } from "react";
import styled from "styled-components";
import Button from "../Button/Button";

const Div = styled.div`
	width: 100%;
	height: 1600px;
	padding: 50px;
	background-color: #222;

	color: #ddd;
`

export default class Buttons extends Component {

	render() {
    return (
      <Div>
        <h2 className="no-margin-padding">Small</h2>
        <div className='display-flex'>
          <div className='margin-all'>
            <Button size='small'>OK</Button>
          </div>
          <div className='margin-all'>
            <Button size='small' variant="danger">DELETE</Button>
          </div>
          <div className='margin-all'>
            <Button size='small' variant="plain">CANCEL</Button>
          </div>
        </div>

				<br /><br />

        <h2 className="no-margin-padding">Default</h2>
        <div className='display-flex'>
          <div className='margin-all'>
            <Button>OK</Button>
          </div>
          <div className='margin-all'>
            <Button variant="danger">DELETE</Button>
          </div>
          <div className='margin-all'>
            <Button variant="plain">CANCEL</Button>
          </div>
        </div>

				<br /><br />

        <h2 className="no-margin-padding">Large</h2>
        <div className='display-flex'>
          <div className='margin-all'>
            <Button size="large">OK</Button>
          </div>
          <div className='margin-all'>
            <Button size="large" variant="danger">DELETE</Button>
          </div>
          <div className='margin-all'>
            <Button size="large" variant="plain">CANCEL</Button>
          </div>
        </div>

				<br /><br />

        <h2 className="no-margin-padding">Outline</h2>
        <div className='display-flex'>
          <div className='margin-all'>
            <Button outline size="large">OK</Button>
          </div>
          <div className='margin-all'>
            <Button outline variant="danger">DELETE</Button>
          </div>
          <div className='margin-all'>
            <Button outline size="small" variant="plain">CANCEL</Button>
          </div>
        </div>

				<br /><br />

				<h2 className="no-margin-padding">With Icon</h2>
        <div className='display-flex'>
          <div className='margin-all'>
            <Button icon="pencil-alt" size="large">Edit</Button>
          </div>
          <div className='margin-all'>
            <Button icon="trash-alt" variant="danger">DELETE</Button>
          </div>
          <div className='margin-all'>
            <Button icon="trash-alt" size="small" variant="plain">CANCEL</Button>
          </div>
        </div>

				<br /><br />

				<h2 className="no-margin-padding">With Icon - outline</h2>
        <div className='display-flex'>
          <div className='margin-all'>
            <Button outline icon="pencil-alt" size="large">Edit</Button>
          </div>
          <div className='margin-all'>
            <Button outline icon="trash-alt" variant="danger">DELETE</Button>
          </div>
          <div className='margin-all'>
            <Button outline icon="trash-alt" size="small" variant="plain">CANCEL</Button>
          </div>
        </div>

				<br /><br />

        <h2 className="no-margin-padding">Disabled</h2>
        <div className='display-flex'>
          <div className='margin-all'>
            <Button isDisabled size="large">OK</Button>
          </div>
          <div className='margin-all'>
            <Button isDisabled variant="danger">DELETE</Button>
          </div>
          <div className='margin-all'>
            <Button isDisabled size="small" variant="plain">CANCEL</Button>
          </div>
        </div>

				<br /><br />

				<h2 className="no-margin-padding">Disabled - outline</h2>
        <div className='display-flex'>
          <div className='margin-all'>
            <Button outline isDisabled size="large">OK</Button>
          </div>
          <div className='margin-all'>
            <Button outline isDisabled variant="danger">DELETE</Button>
          </div>
          <div className='margin-all'>
            <Button outline isDisabled size="small" variant="plain">CANCEL</Button>
          </div>
        </div>

				<br /><br />

        <h2 className="no-margin-padding">Loading</h2>
        <div className='display-flex'>
          <div className='margin-all'>
            <Button isLoading size="large">OK</Button>
          </div>
          <div className='margin-all'>
            <Button isLoading variant="danger">DELETE</Button>
          </div>
          <div className='margin-all'>
            <Button isLoading size="small" variant="plain">CANCEL</Button>
          </div>
        </div>

				<br /><br />

        <h2 className="no-margin-padding">Loading outline</h2>
        <div className='display-flex'>
          <div className='margin-all'>
            <Button outline isLoading size="large">OK</Button>
          </div>
          <div className='margin-all'>
            <Button outline isLoading variant="danger">DELETE</Button>
          </div>
          <div className='margin-all'>
            <Button outline isLoading size="small" variant="plain">CANCEL</Button>
          </div>
        </div>

				<br /><br />
			</Div>
		)
	}
}
