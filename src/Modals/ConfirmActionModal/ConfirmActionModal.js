import React from 'react';
import ReactDOM from 'react-dom';
import ModalStyle from './ModalStyle';

const Modal = props => {
	return ReactDOM.createPortal(
		<div className="modal">
			<ModalStyle
				isOpen={true}
				cancelButton={props.cancelButton}
				okButton={props.okButton}
				titleText={props.titleText}
				onDismiss={props.onDismiss}
			>
				{props.body}
			</ModalStyle>
		</div>,
		document.querySelector('#modal')
	);
};

export default Modal;