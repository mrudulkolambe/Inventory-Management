import { PlusIcon, TrashIcon, XIcon } from '@heroicons/react/outline'
import { arrayRemove, doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase_config'

const ManageLabs  = ({nav}) => {
	nav(true)
	const [labs, setLabs] = useState([])
	const [newLab, setNewLab] = useState([])
	const [data, setData] = useState({ title: "", array: [] })
	const [input, setInput] = useState("");
	const [text, setText] = useState("");
	const deleteLab = async (lab) => {
		const labName = `${departmentValue} ${lab}`
		await updateDoc((doc(db, "LABS", "LABS")), {
			LABS: arrayRemove(labName)
		});
	}
	useEffect(() => {
		const unsub1 = onSnapshot(doc(db, "DEPARTMENTS", "DEPARTMENTS"), (doc) => {
			setDepartments(doc.data().DEPARTMENTS);
		});

		return () => {
			unsub1()
		};
	}, []);
	useEffect(() => {
		const unsub = onSnapshot(doc(db, "LABS", "LABS"), (doc) => {
			setLabs(doc.data().LABS);
		});
		return () => {
			unsub()
		};
	}, []);
	const [departments, setDepartments] = useState([]);
	const [departmentValue, setDepartmentValue] = useState("");
	useEffect(() => {
		setData({
			title: "Labs",
			array: labs,
			modalTitle: departmentValue.length === 0 ? "Choose Lab First" : `Add Lab To ${departmentValue}`,
		})
	}, [departmentValue]);
	useEffect(() => {
		let newArr2 = []
		if (departmentValue === "") {
			setText("No Result Found")
		} else {
			labs.map((item) => {
				if (item.includes(departmentValue)) {
					newArr2.push(item.replace(`${departmentValue} `, ''))
				} else if (item === "") {
					newArr2.push(item)
				}
			})
			setNewLab(newArr2)
		}
	}, [departmentValue, labs]);
	const [showModal, setShowModal] = useState(false);
	const addLab = async () => {
		const labName = `${departmentValue} ${input}`
		await updateDoc((doc(db, "LABS", "LABS")), {
			LABS: arrayUnion(labName)
		})
			.then(() => {
				setInput("")
				setShowModal(false)
			})
	}
	return (
		<>
			<div
				className={
					showModal
						? "w-screen h-screen bg-black bg-opacity-40 fixed zindex1000"
						: "hidden"
				}
			></div>
			<div
				className={
					showModal
						? "rounded-lg shadow-lg p-3 zindex2000 bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/12"
						: "hidden"
				}
			>
				<div className="border-b relative pb-3">
					<p className="font-bold text-lg ">{data.modalTitle}</p>
					<XIcon
						className="h-6 w-6 absolute top-0 right-0 cursor-pointer"
						onClick={() => {
							setShowModal(false);
						}}
					/>
				</div>

				<div className="py-3 flex justify-center items-center flex-col">
					<label htmlFor='data' className='self-start ml-6'>{data.modalTitle} :</label>
					<input type="text" id='data' className="m-auto w-11/12 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-1" name='modalDesc' value={input} onChange={(e) => { setInput(e.target.value) }} placeholder={data.modalTitle} />
				</div>

				<div className="flex justify-between items-center">
					<button
						onClick={() => {
							setShowModal(false);
						}}
						className="bg-red-500 duration-200 w-20 py-2 hover:bg-red-700 rounded-lg text-white font-bold"
					>
						Cancel
					</button>
					<button className="bg-green-600 duration-200 w-20 py-2 hover:bg-green-700 rounded-lg text-white font-bold" onClick={addLab}>
						Okay
					</button>
				</div>
			</div>
			<h1 className='text-white text-4xl text-center mt-5'>{data.title}</h1>
			<div className='w-full flex items-center justify-center'>
				<select className='m-auto w-4/12 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-1' value={departmentValue} onChange={(e) => { setDepartmentValue(e.target.value) }}>
					{
						departments.map((department) => {
							return <option value={department} key={department}>{department.length === 0 ? "---Choose Department---" : department}</option>
						})
					}
				</select>
			</div>
			{
				newLab.length === 0 ? <p className='text-white text-center text-2xl font-bold mt-5'>{text}</p> : newLab.map((child) => {
					return <div key={child} className={child.length === 0 ? "hidden" : 'w-6/12 bg-opacity-40 m-auto text-white bg-gray-500 hover:shadow-lg duration-200 rounded-lg mt-3 p-3 flex justify-between px-12 items-center'}><p>{child}</p><TrashIcon onClick={() => { deleteLab(child) }} className="cursor-pointer stroke-1 h-5 w-5" /></div>
				})
			}
			{
				<div onClick={() => {
					setShowModal(true)
				}} className='fixed flex justify-center items-center bottom-10 bg-gray-500 right-8 cursor-pointer h-12 w-12 rounded-full'>
					<PlusIcon className='stroke-1 text-white h-7 w-7' />
				</div>
			}
		</>
	)
}

export default ManageLabs