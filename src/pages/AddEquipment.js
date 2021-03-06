import React, { useEffect, useRef, useState } from 'react'
import { useUserContext } from '../context/UseMembersContext'
import { collection, addDoc, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { db } from '../firebase_config';
import Alert from '../components/Alert';
import { useUserAuth } from '../context/UserAuthContext';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

const AddEquipment = ({ nav }) => {
	nav(true)
	document.title = "SIGCE Inventory | Add Equipment"
	const { departmentArray, equipmentCheck, items, getDate, allDepts, equipmentItem } = useUserContext()
	const btn = useRef()
	const [flag, setFlag] = useState(false);
	const [alertType, setAlertType] = useState("blue");
	const [labs, setLabs] = useState([]);
	const { user } = useUserAuth()
	const [files, setFiles] = useState([])
	const [progress, setProgress] = useState(0)
	const InitialState = {
		department: "",
		Lab: "",
		InwardNo: "",
		TagNo: "",
		EquipmentName: "",
		DateOfPurchase: "",
		Supplier: "",
		Cost: "",
		Specifications: "",
		Shifted: false,
		ShiftedDate: null,
		ShiftedFromDept: null,
		ShiftedFromLab: null,
		Scrap: false,
		Brand: "",
		ScrapDate: null,
		BillNumber: "",
		TotalIncTaxes: "",
		Model: "",
		Model_SerialNo: "",
		date: getDate(),
		timestamp: serverTimestamp(),
		user: "",
		files: []
	}
	const [data, setData] = useState(InitialState);
	useEffect(() => {
		const { department } = data;
		if (allDepts !== undefined) {
			let newArr2 = []
			allDepts.map((item) => {
				if (item.includes(department)) {
					newArr2.push(item.replace(`${department} `, ''))
				} else if (item === "") {
					newArr2.push(item)
				}
			})
			setLabs(newArr2)
		}
	}, [data.department, allDepts]);
	const call_alert = (content, type) => {
		setFlag(true);
		setMessage(content);
		setAlertType(type)
		const timeout = setTimeout(() => {
			setFlag(false);
			clearTimeout(timeout);
		}, 10);
	};
	const handleFileInputChange = (e) => {
		let arr = [];
		setProgress(0)
		for (let i = 0; i < e.target.files.length; i++) {
			arr.push(e.target.files[i]);
		}
		setFiles(arr);
	};

	const [btnText, setBtnText] = useState("Add Equipment");
	const [message, setMessage] = useState("");
	const addData = async () => {
		let arr = []
		if (data.Lab.length < 3 && data.EquipmentName.length < 3 && data.Supplier.length < 3 && data.DateOfPurchase.length < 3 && data.Specifications.length < 3) {
			call_alert("Please Fill The Form Properly", "red")
		}
		else {
			if (items.includes(data.TagNo)) {
				call_alert("Item Already Exists", "red")
			}
			else {
				setBtnText("Adding Equipment...");
				btn.current.disabled = true;
				let newData = data;
				newData.user = user.displayName
				newData.TagNo = data.TagNo.toUpperCase()
				const storage = getStorage();
				newData.files = arr
				await addDoc(collection(db, "INVENTORY"), newData)
					.then(async (document) => {
						console.log(document.id)
						equipmentCheck(data.TagNo)
						setBtnText("Equipment Added")
						setData(InitialState)
						call_alert("Equipment Added", "blue")
						files.forEach((file) => {
							const storageRef = ref(storage, `${data.department}/${document.id}/${file.name}`);
							const uploadTask = uploadBytesResumable(storageRef, file)
							uploadTask.on('state_changed',
								(snapshot) => {
									const progressPer = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
									setProgress(progressPer)
								},
								(error) => {
									console.log(error)
								},
								() => {
									getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
										const obj = {
											name: file.name,
											url: downloadURL
										}
										arr.push(obj)
										await updateDoc(doc(db, "INVENTORY", `${document.id}`), {
											files: arr
										}).then(() => {
											console.log("updated")
										})
									});
								}
							);
						})
						setTimeout(() => {
							btn.current.disabled = false;
							setBtnText("Add Equipment")
						}, 2000);
					})
			}
		}
	}

	const handleForm = (e) => {
		const name = e.target.name
		setData({ ...data, [name]: e.target.value })
	}
	return (
		<>
			<Alert message={message} messageSetter={setMessage} flag={flag} type={alertType} />
			<form autoComplete='off' >
				<div className=' w-7/12 m-auto mt-8'>
					<div className='w-full flex justify-between'>
						<div className='w-full my-2 flex flex-col'>
							<label className=' text-white'>Name Of Equipment : </label>
							<select className="w-11/12 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-1"
								type="text"
								name='EquipmentName'
								value={data.EquipmentName} onChange={handleForm}
								placeholder="Name Of Equipment">
								{
									equipmentItem && equipmentItem.map((item) => {
										return <option value={item} key={item}>{item.length === 0 ? "---Choose Option---" : item}</option>
									})
								}
							</select>
						</div>
						<div className='w-full my-2 flex flex-col items-end'>
							<label className=' text-white self-start ml-9'>Date Of Purchase : </label>
							<input
								className="w-11/12 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-1"
								type="date"
								name='DateOfPurchase'
								value={data.DateOfPurchase} onChange={handleForm}
								placeholder="Date Of Purchase"
							/>
						</div>
					</div>
					<div className='w-full flex justify-between'>
						<div className='w-full my-2 flex flex-col'>
							<label className=' text-white'>Department :</label>
							<select name='department' value={data.department} onChange={handleForm} className='w-11/12 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-1'>
								{
									departmentArray.map((department) => {
										return <option key={department} value={department}>{department.length === 0 ? "Select The Department" : `${department}`}</option>
									})
								}
							</select>
						</div>
						<div className='w-full my-2 flex flex-col items-end'>
							<label className=' text-white self-start ml-9'>Name Of Lab : </label>
							<select className="w-11/12 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-1"
								disabled={data.department.length === 0}
								name='Lab'
								value={data.Lab} onChange={handleForm}
							>
								{data.Lab}
								{
									data.department.length === 0 ?
										<option key="" value="">{"---Choose Department---"}</option> :
										labs.map((lab) => {
											return <option value={lab} key={lab}>{lab.length === 0 ? "---Choose Option---" : `${lab}`}</option>
										})}
							</select>
						</div>
					</div>
					<div className='w-full flex justify-between'>
						<div className='w-full my-2 flex flex-col'>
							<label className=' text-white'>SN / Inward No. : </label>
							<input
								className="w-11/12 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-1"
								type="text"
								name='InwardNo'
								value={data.InwardNo} onChange={handleForm}
								placeholder="SN / Inward No."
							/>
						</div>
						<div className='w-full my-2 flex flex-col items-end'>
							<label className=' text-white self-start ml-9'>Tag No. : </label>
							<input
								className="w-11/12 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-1"
								type="text"
								name='TagNo'
								value={data.TagNo} onChange={handleForm}
								placeholder="Tag No."
							/>
						</div>
					</div>

					<div className='w-full flex justify-between'>
						<div className='w-full my-2 flex flex-col'>
							<label className='text-white'>Supplier Name : </label>
							<input
								className="w-11/12 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-1"
								type="text"
								name='Supplier'
								value={data.Supplier} onChange={handleForm}
								placeholder="Supplier Name"
							/>
						</div>
						<div className='w-full my-2 flex flex-col items-end'>
							<label className='text-white self-start ml-9'>Cost Of Equipment : </label>
							<input
								className="w-11/12 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-1"
								type="text"
								name='Cost'
								value={data.Cost} onChange={handleForm}
								placeholder="Cost Of Equipment"
							/>
						</div>
					</div>
					<div className='w-full flex justify-between'>
						<div className='w-full my-2 flex flex-col'>
							<label className='text-white'>Brand Name : </label>
							<input
								className="w-11/12 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-1"
								type="text"
								name='Brand'
								value={data.Brand} onChange={handleForm}
								placeholder="Brand Name"
							/>
						</div>
						<div className='w-full my-2 flex flex-col items-end'>
							<label className='text-white self-start ml-9'>Bill Number : </label>
							<input
								className="w-11/12 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-1"
								type="text"
								name='BillNumber'
								value={data.BillNumber} onChange={handleForm}
								placeholder="Bill Number"
							/>
						</div>
					</div>
					<div className='w-full flex justify-between'>
						<div className='w-full my-2 flex flex-col'>
							<label className='text-white'>Model : </label>
							<input
								className="w-11/12 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-1"
								type="text"
								name='Model'
								value={data.Model} onChange={handleForm}
								placeholder="Model"
							/>
						</div>
						<div className='w-full my-2 flex flex-col items-end'>
							<label className='text-white self-start ml-9'>Model Serial No. : </label>
							<input
								className="w-11/12 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-1"
								type="text"
								name='Model_SerialNo'
								value={data.Model_SerialNo} onChange={handleForm}
								placeholder="Model Serial No."
							/>
						</div>
					</div>
				</div>
				<div className='w-7/12 my-2 flex flex-col m-auto'>
					<label className='text-white'>Total Cost Incl. Taxes : </label>
					<input
						className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-1"
						type="text"
						name='TotalIncTaxes'
						value={data.TotalIncTaxes} onChange={handleForm}
						placeholder="Total Cost Incl. Taxes"
					/>
				</div>
				<div className='w-7/12 my-2 flex flex-col m-auto'>
					<label className='text-white'>Upload Files : </label>
					<input
						className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-1"
						type="file"
						name='TotalIncTaxes'
						onChange={handleFileInputChange}
						placeholder="Total Cost Incl. Taxes"
						multiple
					/>
				</div>
				<div className='bg-gray-300 h-2 rounded-lg w-7/12 my-2 flex flex-col m-auto'>
					<div className='bg-green-500 h-2 w-20 rounded-lg duration-200' style={{ width: progress + "%" }}></div>
				</div>
				<div className='w-7/12 my-2 flex flex-col m-auto'>
					<label className='text-white'>Specifications Of Equipment : </label>
					<textarea
						className="h-36 resize-y w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-1"
						type="text"
						name='Specifications'
						value={data.Specifications} onChange={handleForm}
						placeholder="Specifications Of Equipment"
					></textarea>
					<button ref={btn} className="mt-5 mb-10 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none" onClick={() => {
						addData()
					}}
						type="button">
						<svg role="status" className={btnText === "Adding Equipment..." ? "inline w-6 h-6 mr-3 text-white animate-spin" : "hidden"} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
							<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
						</svg>
						<p>{btnText}</p>
					</button>
				</div>
			</form>

		</>
	)
}

export default AddEquipment