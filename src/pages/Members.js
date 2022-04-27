import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UseMembersContext';
import { PencilIcon, ChevronDownIcon } from "@heroicons/react/outline"
import Dropdown from '../components/Dropdown';
import ConfirmationModal from '../components/ConfirmationModal';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase_config';

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
	const [showModal, setShowModal] = useState(false);
	const [modalData, setModalData] = useState({});
	const handleUpdate = (type, member) => {
		setShowModal(true)
		if (type === "ADMIN") {
			setModalData({
				title: "Make The User Admin",
				body: "Are you sure you want to make the user Admin?",
				member: member,
				type: type
			})
		}
		else if (type === "USER") {
			setModalData({
				title: "Make The Admin User",
				body: "Are you sure you want to make the Admin User?",
				member: member,
				type: type
			})
		}
		else if (type === "delete") {
			setModalData({
				title: "Delete The User",
				body: "Are you sure you want to Delete the User?",
				member: member,
				type: type
			})
		}
	}

	const handleDropdownChange = async (uid, type) => {
		if (type === "ADMIN") {
			const docRef = doc(db, "USERS", uid);
			await updateDoc(docRef, {
				admin: true
			})
				.then( async () => {
					await updateDoc(doc(db, "ADMIN", "ADMIN"), {
						ADMINS: arrayUnion(uid)
					})
						.then(() => {
							setShowModal(false)
						})
				})
		}
		else if (type === "USER") {
			const docRef = doc(db, "USERS", uid);
			await updateDoc(docRef, {
				admin: false
			})
				.then( async () => {
					await updateDoc(doc(db, "ADMIN", "ADMIN"), {
						ADMINS: arrayRemove(uid)
					})
						.then(() => {
							setShowModal(false)
						})
				})
		}
		else if (type === "delete") {
			const docRef = doc(db, "USERS", uid);
			await updateDoc(docRef, {
				admin: true
			})
				.then(() => {
					setShowModal(false)
				})
		}


	}
	return (
		<>
			<ConfirmationModal modalHandle={setShowModal} handleOkay={handleDropdownChange} showModal={showModal} data={modalData} />
			<div className='h-full w-full flex justify-center'>
				<table className='table-auto w-11/12 mt-16 flex flex-col text-white'>
					<thead className='bg-gray-500 bg-opacity-40 mb-3 rounded-lg'>
						<tr className='grid grid-cols-5 font-bold w-full justify-between p-3 text-lg'>
							<th className='m-auto'>Name</th>
							<th className='m-auto'>Email</th>
							<th className='m-auto'>Password</th>
							<th className='m-auto'>Department</th>
							<th className='m-auto'>Manage User</th>
						</tr>
					</thead>
					<tbody className=' bg-gray-500 bg-opacity-40 rounded-lg'>
						{
							members && members.map((member, i) => {
								return (
									<tr key={member.uid} onDoubleClick={() => { navigate(`/user/${member.uid}`) }} className={i === members.length - 1 ? "grid grid-cols-5 w-full justify-between p-3" : 'relative grid grid-cols-5 w-full justify-between p-3 border-b-2'}>
										<td className='m-auto cursor-pointer members_title' data-title="Click To Copy" onClick={(e) => { handleCopy(e.target.innerHTML, "Name", e, member.name) }}>{member.name}</td>
										<td className='m-auto cursor-pointer members_title' data-title="Click To Copy" onClick={(e) => { handleCopy(e.target.innerHTML, "Email", e, member.email) }}>{member.email}</td>
										<td className='m-auto cursor-pointer members_title' data-title="Click To Copy" onClick={(e) => { handleCopy(e.target.innerHTML, "Password", e, atob(member.password)) }}>{atob(member.password)}</td>
										<td className='m-auto flex items-center'>{member.department}</td>
										<Dropdown update={handleUpdate} member={member} selected={member.admin} />
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default Members