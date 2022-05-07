import { deleteUser, getAuth } from 'firebase/auth';
import { collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase_config';

const Users = () => {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		const q = query(collection(db, "USERS"), where("isVerified", "==", false));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const arr = [];
			querySnapshot.forEach((doc) => {
				arr.push(doc.data());
			});
			setUsers(arr)
		});
		return () => {
			unsubscribe()
		};
	}, []);
	const authorize = async (uid) => {
		const docRef = doc(db, "USERS", uid);
		await updateDoc(docRef, {
			isVerified: true
		})
			.then(() => {

			})
			.catch((e) => {

			})

	}
	const reject = async (uid) => {
		await deleteDoc(doc(db, "USERS", uid))
			.then(() => {
				console.log("User Deleted")
			})
	}
	return (
		<>
			<div className='h-full w-full flex justify-center'>
				<table className='table-auto w-11/12 mt-16 flex flex-col text-white'>
					<thead className='bg-gray-500 bg-opacity-40 mb-3 rounded-lg'>
						<tr className='grid grid-cols-4 font-bold w-full justify-between p-3 text-lg'>
							<th className='m-auto'>Name</th>
							<th className='m-auto'>Email</th>
							{/* <th className='m-auto'>Link</th> */}
							<th className='m-auto'>Department</th>
							<th className='m-auto'>Authorize</th>
						</tr>
					</thead>
					{
						users.length === 0 ? <h1 className='font-bold text-lg text-center mt-3'>No Users Found!</h1> :
							<tbody className=' bg-gray-500 bg-opacity-40 rounded-lg'>
								{
									users.map((member, i) => {
										return (
											<tr key={member.uid} className={i === users.length - 1 ? "grid grid-cols-4 w-full justify-between p-3" : 'relative grid grid-cols-4 w-full justify-between p-3 border-b-2'}>
												<td className='m-auto cursor-pointer members_title' data-title="Click To Copy">{member.name}</td>
												<td className='m-auto cursor-pointer members_title' data-title="Click To Copy">{member.email}</td>
												<td className='m-auto flex items-center'>{member.department}</td>
												<td className='flex justify-center items-center'>
													<button className='px-2 py-1 rounded font-bold mx-2 hover:bg-green-500 duration-150 bg-green-600' onClick={() => { authorize(member.uid) }}>Authorize</button>
													<button className='px-2 py-1 rounded font-bold mx-2 hover:bg-red-500 duration-150 bg-red-600' onClick={() => { reject(member.uid) }}>Reject</button>
												</td>
											</tr>
										)
									})
								}
							</tbody>
					}
				</table>
			</div>
		</>
	)
}

export default Users