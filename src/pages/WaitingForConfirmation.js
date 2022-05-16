import React from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../context/UseMembersContext'

const WaitingForConfirmation = ({ nav }) => {
	nav(false)
	const { isVerified } = useUserContext()
	return (
		<>
			{isVerified ? <Link to={"/"}><div>Navigate To Home Page</div></Link> : <h1 className='text-center text-white font-bold text-2xl mt-10'>Waiting For Confirmation From admin</h1>}
		</>
	)
}

export default WaitingForConfirmation