import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UseMembersContext';
import { PencilIcon } from "@heroicons/react/outline"

const Members = () => {
	document.title = "SIGCE Inventory | All Members"
	const navigate = useNavigate()
	const { members } = useUserContext()
	const handleCopy = (context, target, e, text) => {
		navigator.clipboard.writeText(context);
		e.target.innerHTML = "Copied!";
		e.target.dataset.title = "Copied!"
		setTimeout(() => {
			e.target.innerHTML = text
			e.target.dataset.title = "Click To Copy"
		}, 2000);
	}
	return (
		<div className='h-full w-full flex justify-center'>
			<table className='table-auto w-11/12 mt-16 flex flex-col text-white'>
				<thead className='bg-gray-500 bg-opacity-40 mb-3 rounded-lg'>
					<tr className='grid grid-cols-4 font-bold w-full justify-between p-3 text-lg'>
						<th className='m-auto'>Name</th>
						<th className='m-auto'>Email</th>
						<th className='m-auto'>Password</th>
						<th className='m-auto'>Department</th>
						{/* <th className='m-auto'>Manage User</th> */}
					</tr>
				</thead>
				<tbody className=' bg-gray-500 bg-opacity-40 rounded-lg'>
					{
						members && members.map((member, i) => {
							return (
								<tr key={member.uid} onDoubleClick={() => {navigate(`/user/${member.uid}`)}} className={i === members.length-1 ? "relative grid grid-cols-4 w-full justify-between p-3" : 'relative grid grid-cols-4 w-full justify-between p-3 border-b-2'}>
									<td className='m-auto cursor-pointer members_title' data-title="Click To Copy" onClick={(e) => {handleCopy(e.target.innerHTML, "Name", e, member.name)}}>{member.name}</td>
									<td className='m-auto cursor-pointer members_title' data-title="Click To Copy" onClick={(e) => {handleCopy(e.target.innerHTML, "Email", e, member.email)}}>{member.email}</td>
									<td className='m-auto cursor-pointer members_title' data-title="Click To Copy" onClick={(e) => {handleCopy(e.target.innerHTML, "Password", e, atob(member.password))}}>{atob(member.password)}</td>
									<td className='m-auto flex items-center'>{member.department}</td>
									<td className='m-auto h-5 w-5 absolute right-5 top-4'><Link to={`/manage/user/${member.uid}`}><PencilIcon onClick={() => {}} className='stroke-2 cursor-pointer'/></Link></td>
								</tr>
							)
						})
					}
				</tbody>
			</table>
		</div>
	)
}

export default Members