//import { createPortal } from 'react-dom';
import './Modal.css';
import { useRef, useEffect } from 'react';

export default function Modal({ children, open }) {
	const dialog = useRef(null);
	useEffect(() => {
		if (open) {
			dialog.current.showModal();
		} else {
			dialog.current.close();
		}
	}, [open]);

	return <dialog ref={dialog}>{children}</dialog>;
}