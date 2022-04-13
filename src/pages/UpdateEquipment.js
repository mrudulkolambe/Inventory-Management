import React, { useEffect, useRef, useState } from 'react'
import { collection, onSnapshot, where, query, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from '../firebase_config';
import Alert from '../components/Alert';

const UpdateEquipment = () => {
	const submitBtnElem = document.getElementById('submitBtn');
	const searchBtn = useRef()
	const submitBtn = useRef()
	const [search, setSearch] = useState("");
	const [searchBtnText, setSearchBtnText] = useState("Search");
	const [equipment, setEquipment] = useState();
	const [required, setRequired] = useState(false)
	const [arr, setArr] = useState([])
	const [showInputs, setshowInputs] = useState(false)
	const [flag, setFlag] = useState(false);
	const [alertType, setAlertType] = useState("blue");
	const [message, setMessage] = useState("");
	const InitialState = {
		SN: "",
		TestingDate: "",
		ProblemsAndDetails: "",
		RepairingDate: "",
		RepairedBy: "",
		ReplacedComponents: "",
		ExternalAgency: "",
		AgencyInwardNo: ""
	}
	const [update, setUpdate] = useState(InitialState)

	const fetchData = async () => {
		setSearchBtnText("Searching...")
		searchBtn.current.disabled = true
		const q = query(collection(db, "INVENTORY"), where("TagNo", "==", search));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			querySnapshot.forEach((doc) => {
				const doc_data = {
					id: doc.id,
					data: doc.data()
				}
				setEquipment(doc_data)
				let newArr = doc_data.data.TesingReport
				newArr.reverse()
				console.log(newArr)
				setArr(newArr)
			});
		});
		setSearchBtnText("Search")
		searchBtn.current.disabled = false
	}
	const handleInput = (e) => {
		const name = e.target.name
		setUpdate({ ...update, [name]: e.target.value })
	}
	const handleSubmit = async () => {
		console.log(update)
		console.log(equipment)
		if (required) {
			const equipmentRef = doc(db, "INVENTORY", equipment && equipment.id);
			await updateDoc(equipmentRef, {
				TesingReport: arrayUnion(update)
			})
				.then(() => {
					setUpdate(InitialState)
				})
		}
		else {
			call_alert("All Field Marked * are required", "red")
		}
	}
	const call_alert = (content, type) => {
		setFlag(true);
		setMessage(content);
		setAlertType(type)
		const timeout = setTimeout(() => {
			setFlag(false);
			clearTimeout(timeout);
		}, 10);
	};
	useEffect(() => {
		if (update.TestingDate.length <= 3 || update.ProblemsAndDetails.length <= 3 || update.RepairingDate.length <= 3 || update.RepairedBy.length <= 3 || update.ReplacedComponents.length <= 3) {
			setRequired(false)
		} else {
			setRequired(true)
		}
	}, [update]);

	useEffect(() => {
		if (required) {
			submitBtn && submitBtn.current.classList.add("animate_btn")
			submitBtn && submitBtn.current.classList.add("zindex1000")
			submitBtnElem && submitBtnElem.classList.add("zindex1000")
		}
		else {
			submitBtn && submitBtn.current.classList.remove("animate_btn")
			submitBtn && submitBtn.current.classList.remove("zindex1000")
			submitBtnElem && submitBtnElem.classList.remove("zindex1000")
		}
	}, [required]);

	const handleInputForm = () => {
		if (showInputs) {
			setshowInputs(false)
		}
		else {
			setshowInputs(true)
		}
	}
	return (
		<>
			<Alert message={message} messageSetter={setMessage} flag={flag} type={alertType} />
			<form className='w-full my-2 flex justify-center'>
				<input
					className="w-3/12 px-8 py-4 rounded-l-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
					type="text"
					name='Lab'
					value={search} onChange={(e) => { setSearch(e.target.value) }}
					placeholder="Tag No Of Equipment"
					autoComplete='off'
				/>
				<button ref={searchBtn} name='search' className="tracking-wide font-semibold bg-indigo-500 text-gray-100 w-40 py-4 rounded-r-lg hover:bg-indigo-700 transition-all duration-500 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none" onClick={fetchData}
					type="button">
					<svg role="status" className={searchBtnText === "Searching..." ? "inline w-4 h-4 mr-3 text-white animate-spin" : "hidden"} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
						<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
					</svg>
					<p>{searchBtnText}</p>
				</button>
			</form>

			<div className='mt-10 text-white bg-gray-800'>
				<div className='mb-10'>
					<div className='flex justify-around text-lg'>
						<p><span className='font-bold'>SN / Inward No. : </span><span>{equipment && equipment.data.InwardNo}</span></p>
						<p><span className='font-bold'>Department : </span><span>{equipment && equipment.data.department}</span></p>
						<p><span className='font-bold'>Lab Name : </span><span>{equipment && equipment.data.Lab}</span></p>
						<p><span className='font-bold'>Date Of Purchase. : </span><span>{equipment && equipment.data.DateOfPurchase}</span></p>
					</div>
					<table className='w-11/12 m-auto mt-5'>
						<div className='bg-gray-500 bg-opacity-30 rounded-t-lg'>
							<tr className='grid grid-cols-5 font-bold w-full justify-between p-3 text-lg border-b'>
								<th className='flex justify-center items-center'>Tag No.</th>
								<th className='flex justify-center items-center'>Equipment Name</th>
								<th className='flex justify-center items-center'>Specifications</th>
								<th className='flex justify-center items-center'>Supplier</th>
								<th className='flex justify-center items-center'>Cost</th>
							</tr>
						</div>
						<div className='overflow-hidden bg-gray-500 bg-opacity-30 rounded-b-lg'>
							<tr className='grid grid-cols-5 w-full justify-between p-3' >
								<td className='flex justify-center items-center'>{equipment && equipment.data.TagNo}</td>
								<td className='flex justify-center items-center'>{equipment && equipment.data.EquipmentName}</td>
								<td className='flex justify-center items-center text-center'>{equipment && equipment.data.Specifications}</td>
								<td className='flex justify-center items-center'>{equipment && equipment.data.Supplier}</td>
								<td className='flex justify-center items-center'>{equipment && equipment.data.Cost}</td>
							</tr>
						</div>
					</table>
				</div>
				<button onClick={handleInputForm} className="m-auto my-7 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-40 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">{showInputs ? "Hide" : "Add Log"}</button>
				<div className='w-full m-auto px-4'>
					<form autoComplete='off'>
						<table className='w-full m-auto text-center'>
							<tr className='grid grid-cols-8 font-bold justify-items-center p-3 border-b bg-gray-500 bg-opacity-30 rounded-lg overflow-hidden mb-6'>
								<th className='w-11/12'>SN</th>
								<th className='w-10/12'>Date Of Testing</th>
								<th className='w-11/12'>Details and Problems</th>
								<th className='w-10/12'>Date Of Repairing</th>
								<th className='w-10/12'>Repaired By</th>
								<th className='w-11/12'>Components Replaced</th>
								<th className='w-11/12'>External Agency</th>
								<th className='w-11/12'>Agency Inward No</th>
							</tr>
							<tr className={showInputs ? "grid grid-cols-8 justify-between p-3 border-b m-auto  bg-gray-500 bg-opacity-30 rounded-lg overflow-hidden" : "hidden"}>
								<td className='w-11/12'><input type="text" onChange={handleInput} name='SN' value={update.SN} placeholder="SN*" /></td>
								<td className='w-11/12'><input type="date" onChange={handleInput} name='TestingDate' value={update.TestingDate} /></td>
								<td className='w-11/12'><input type="text" onChange={handleInput} name='ProblemsAndDetails' value={update.ProblemsAndDetails} placeholder='Details and Problems*' /></td>
								<td className='w-11/12'><input type="date" onChange={handleInput} name='RepairingDate' value={update.RepairingDate} /></td>
								<td className='w-11/12'><input type="text" onChange={handleInput} name='RepairedBy' value={update.RepairedBy} placeholder='Repaired By*' /></td>
								<td className='w-11/12'><input type="text" onChange={handleInput} name='ReplacedComponents' value={update.ReplacedComponents} placeholder='Components Replaced*' /></td>
								<td className='w-11/12'><input type="text" onChange={handleInput} name='ExternalAgency' value={update.ExternalAgency} placeholder='External Agency' /></td>
								<td className='w-11/12'><input type="text" onChange={handleInput} name='AgencyInwardNo' value={update.AgencyInwardNo} placeholder='Agency Inward No.' /></td>
							</tr>

							<div ref={submitBtn} id="animatedDiv" className={showInputs ? 'submitBtn -z-10 rounded-lg overflow-hidden' : "zindex1000 relative rounded-lg overflow-hidden"}>
								<button type='button' id='submitBtn' className={showInputs ? "m-auto my-7 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-40 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none" : "hidden"} onClick={handleSubmit}>Submit</button>
								{
									arr.map((report) => {
										return (
											<tr key={report.SN} className='grid grid-cols-8 justify-between p-3 border-b m-auto zindex2000 bg-gray-500 bg-opacity-30 overflow-hidden'>
												<td className='w-11/12'>{report.SN}</td>
												<td className='w-11/12'>{report.TestingDate}</td>
												<td className='w-11/12'>{report.ProblemsAndDetails}</td>
												<td className='w-11/12'>{report.RepairingDate}</td>
												<td className='w-11/12'>{report.RepairedBy}</td>
												<td className='w-11/12'>{report.ReplacedComponents}</td>
												<td className='w-11/12'>{report.ExternalAgency}</td>
												<td className='w-11/12'>{report.AgencyInwardNo}</td>
											</tr>
										)
									})
								}
							</div>
						</table>
					</form>
				</div>
			</div>
		</>
	)
}

export default UpdateEquipment