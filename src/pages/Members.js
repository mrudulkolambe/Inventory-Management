import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UseMembersContext';


const Members = () => {
	const navigate = useNavigate()
	const { members } = useUserContext()
	console.log(members)
	const handleCopy = (context, target) => {
		navigator.clipboard.writeText(context);
	}
	return (
		<div className='h-full w-full flex justify-center'>
			<table className='table-auto w-5/6 mt-16 flex flex-col overflow-hidden text-white'>
				<thead className='bg-gray-500 bg-opacity-40 mb-3 rounded-lg'>
					<tr className='grid grid-cols-4 font-bold w-full justify-between p-3 text-lg'>
						<th className='m-auto'>Name</th>
						<th className='m-auto'>Email</th>
						<th className='m-auto'>Password</th>
						<th className='m-auto'>Department</th>
					</tr>
				</thead>
				<tbody className='overflow-hidden bg-gray-500 bg-opacity-40 rounded-lg'>
					{
						members && members.map((member, i) => {
							console.log(member)
							return (
								<tr key={member.uid} onDoubleClick={() => {navigate(`/user/${member.uid}`)}} className={i === members.length-1 ? "grid grid-cols-4 w-full justify-between p-3" : 'grid grid-cols-4 w-full justify-between p-3 border-b-2'}>
									<td className='m-auto cursor-pointer' title='Click To Copy' onClick={(e) => {handleCopy(e.target.innerHTML, "Name")}}>{member.name}</td>
									<td className='m-auto cursor-pointer' title='Click To Copy' onClick={(e) => {handleCopy(e.target.innerHTML, "Email")}}>{member.email}</td>
									<td className='m-auto cursor-pointer' title='Click To Copy' onClick={(e) => {handleCopy(e.target.innerHTML, "Password")}}>{member.password}</td>
									<td className='m-auto'>{member.department}</td>
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