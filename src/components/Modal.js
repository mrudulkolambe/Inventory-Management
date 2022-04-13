import React, { useEffect, useRef } from 'react'

const Modal = ({ modalHeader, modalBody, btnText, flag, setFlag }) => {
	const modal = useRef()
	const backdrop = useRef()
	const handleClose = () => {
		modal.current.classList.add("slide_out");
		backdrop.current.classList.add("fade_out");
		setTimeout(() => {
			setFlag(false)
			modal.current.style.display = "none";
			backdrop.current.style.display = "none";
		}, 300);
	}

	const handleOpen = () => {
		if (flag) {
			console.log("first")
			modal.current.style.display = "block";
			backdrop.current.style.display = "block";
			backdrop.current.classList.add("fade_in");
			modal.current.classList.add("modal_in");
		}
	}

	useEffect(() => {
		console.log(flag)
		if (flag) {
			handleOpen()
		}
	}, [flag]);
	return (
		<>
			<div ref={backdrop} className='backdrop'></div>
			<div ref={modal} className='modal w-2/5 bg-white rounded-lg'>
				<div className='flex items-center border-b py-4 px-6'>
					<svg className="flex-shrink-0 w-5 h-5 text-blue-700 mr-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
					<p className='font-bold capitalize'>{modalHeader}</p>
				</div>
				<div className='py-3 px-6'>
					<div>{modalBody}</div>
				</div>
				<div className='flex justify-end items-center p-3 bg-slate-100 px-6 rounded-b' >
					<button className='mx-3 px-3 py-1 text-black font-semibold bg-white border-2 border-gray-400 hover:text-gray-500  rounded-md duration-200' onClick={handleClose}>Close</button>
					<button className='mx-3 px-3 py-1 text-white font-semibold border-2 border-blue-500 bg-blue-500 rounded-md hover:bg-blue-600 duration-200'>{btnText}</button>
				</div>
			</div>
		</>
	)
}

export default Modal