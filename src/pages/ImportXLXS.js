import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import moment from 'moment';
import React, { useState } from 'react'
import { read, utils } from 'xlsx';
import { useUserContext } from '../context/UseMembersContext';
import { useUserAuth } from '../context/UserAuthContext';
import { db } from '../firebase_config';

const ImportXLXS = ({ nav }) => {
	nav(true)
	const { user } = useUserAuth()
	const { items } = useUserContext()
	const [setFile, SetsetFile] = useState();
	const [loading, setLoading] = useState(false);
	function ExcelDateToJSDate(serial) {
		var utc_days = Math.floor(serial - 25569);
		var utc_value = utc_days * 86400;
		var date_info = new Date(utc_value * 1000);
		const date = new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate());
		const newDate = moment(date).format("DD[-]MM[-]YYYY")
		return newDate
	}

	const addData = async () => {
		setLoading(true)
		table.forEach(async (row, i) => {
			if (items.includes(row.TagNo)) {
				return
			}
			else {
				let newData = row;
				newData.user = user.displayName
				newData.TagNo = row.TagNo.toUpperCase()
				newData.timestamp = serverTimestamp()
				await addDoc(collection(db, "INVENTORY"), newData)
					.then(async () => {
						console.log("added1", i)
						const itemRef = doc(db, "EQUIPMENTS", "TAGNO");
						await updateDoc(itemRef, {
							TAGNO: arrayUnion(newData.TagNo)
						})
							.then(() => {
								console.log("added2", i)
							})
							.catch((err) => {
								console.log(err, 1)
							})
					})
					.catch((err) => {
						console.log(err, 2)
					})
			}
		})
		setLoading(false)
	}

	const [table, setTable] = useState([]);
	return (

		<>
			<div className='flex flex-col items-center'>
				<div className="flex justify-center items-center w-6/12 m-auto mt-6">
					<label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
						<div className="flex flex-col justify-center items-center pt-5 pb-6">
							<svg className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
							<p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
							<p className="text-xs text-gray-500 dark:text-gray-400">XLXS, CSV (Max 10MB)</p>
						</div>
						<input id="dropzone-file" type="file" className="hidden" onChange={(e) => {
							setTable([])
							SetsetFile(e.target.files[0])
						}} />
					</label>
				</div>
				<div className='flex items-center'>
					<button onClick={() => {
						if (setFile) {
							const fileReader = new FileReader()
							fileReader.readAsBinaryString(setFile)
							fileReader.onload = (event) => {
								const data = event.target.result
								const workbook = read(data, { type: "binary" });
								workbook.SheetNames.forEach((sheet) => {
									const rowObj = utils.sheet_to_row_object_array(workbook.Sheets[sheet])
									rowObj.forEach((obj) => {
										obj.DateOfPurchase = ExcelDateToJSDate(obj.DateOfPurchase)
									})
									console.log(rowObj)
									setTable(rowObj)
								})
							}
						}
					}}
						className="mx-3 mt-3 text-white bg-green-600 hover:bg-green-500 duration-200 px-4 py-2 rounded-lg font-bold">Import Data</button>
					<button className="mx-3 mt-3 text-white bg-green-600 hover:bg-green-500 duration-200 px-4 py-2 rounded-lg font-bold flex items-center" onClick={() => { addData(table) }}>
						<svg
							role="status"
							className={loading ? "inline mr-3 w-4 h-4 text-white animate-spin" : "hidden"}
							viewBox="0 0 100 101"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
								fill="#E5E7EB"
							/>
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="currentColor"
							/>
						</svg>Save</button>
				</div>
			</div>

			<table className='table-auto w-full mt-8 flex flex-col text-white'>
				<thead className='bg-gray-500 bg-opacity-40 mb-3 rounded-lg'>
					<tr className='grid grid-cols-7 font-bold w-full justify-between p-3 text-lg'>
						<th className='m-auto'>Inward No.</th>
						<th className='m-auto'>Bill Number</th>
						<th className='m-auto'>TagNo</th>
						<th className='m-auto'>Brand</th>
						<th className='m-auto'>Equipment</th>
						<th className='m-auto'>Supplier</th>
						<th className='m-auto'>Department/Lab</th>
					</tr>
				</thead>
				<tbody className=' bg-gray-500 bg-opacity-40 rounded-lg'>
					{
						table && table.map((table, i) => {
							return (
								<tr key={i} className="text-sm text-center grid grid-cols-7 w-full justify-between p-3">
									<td className='m-auto cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap w-max' >{table.InwardNo}</td>
									<td className='m-auto cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap w-max' >{table.BillNumber}</td>
									<td className='m-auto flex items-center'>{table.TagNo}</td>
									<td className='m-auto flex items-center'>{table.Brand}</td>
									<td className='m-auto flex items-center'>{table.EquipmentName}</td>
									<td className='m-auto flex items-center'>{table.Supplier}</td>
									<td className='m-auto flex items-center'>{`${table.department} / ${table.Lab}`}</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>
		</>
	)
}

export default ImportXLXS