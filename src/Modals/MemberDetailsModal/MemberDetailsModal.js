import React from 'react';
import ReactDOM from 'react-dom';
import ModalStyle from './ModalStyle';

const Modal = props => {
	return ReactDOM.createPortal(
		<div className="modal">
			<ModalStyle
				isOpen={true}
				mode={props.mode}
				member={props.member || null}
				onDismiss={props.onDismiss}
			/>
		</div>,
		document.querySelector('#modal')
	);
};

export default Modal;