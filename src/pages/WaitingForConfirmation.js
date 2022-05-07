import React from 'react'

const WaitingForConfirmation = ({ nav }) => {
	nav(false)
	return (
		<>
		<h1 className='text-center text-white font-bold text-2xl mt-10'>Waiting For Confirmation From admin</h1>
		</>
	)
}

export default WaitingForConfirmation