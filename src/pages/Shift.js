import React, { useRef, useState, useEffect } from 'react'
import { useUserContext } from '../context/UseMembersContext'
import { collection, query, where, onSnapshot } from "firebase/firestore"
import { db } from '../firebase_config'
import { Link } from 'react-router-dom'
import { CSVLink } from 'react-csv'
import { json2csv } from 'json-2-csv'

const Shift = ({nav}) => {
	nav(true)
	document.title = "SIGCE Inventory | Scrap"
	const [searchBtnText, setSearchBtnText] = useState("Search");
	const [results, setResults] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const searchBtn = useRef()

	useEffect(() => {
		const q = query(collection(db, "INVENTORY"), where("Shifted", "==", true));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			let arr = []
			querySnapshot.forEach((doc) => {
				arr.push({
					id: doc.id,
					data: doc.data()
				})
			});
			setResults(arr)
			setSearchResults(arr)
			setSearchBtnText("Search")
		});
		return () => {
			unsubscribe()
		};
	}, []);

	useEffect(() => {
		setSearchResults(results.filter((result) => {
			if (searchText === "") {
				return result;
			} else if (result.data.Specifications.toLowerCase().includes(searchText.toLowerCase()) || result.data.EquipmentName.toLowerCase().includes(searchText.toLowerCase()) || result.data.Lab.toLowerCase().includes(searchText.toLowerCase()) || result.data.department.toLowerCase().includes(searchText.toLowerCase()) || result.data.TagNo.toLowerCase().includes(searchText.toLowerCase())) {
				return result;
			}
		}))
	}, [searchText]);
	const [json, setJson] = useState([{ "id": "123456789" }]);
	useEffect(() => {
		let row = []
		results.forEach(({ data }) => {
			row.push(data)
		})
		json2csv(row, (err, csv) => {
			if (err) {
				console.log(err)
			}
			else {
				setJson(csv)
			}
		})
	}, [searchResults]);
	const [showDropdown, setShowDropdown] = useState(false)
	return (
		<>
			<form className='w-full my-2 flex justify-center'>
				<input placeholder='Search...' value={searchText} onChange={(e) => { setSearchText(e.target.value) }} type="text" className='w-3/12 px-8 py-3 rounded-l-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white' />
				<button ref={searchBtn} name='search' className="flex tracking-wide font-semibold bg-indigo-500 text-gray-100 w-40 py-3 rounded-r-lg hover:bg-indigo-700 transition-all duration-500 ease-in-out items-center justify-center focus:shadow-outline focus:outline-none"
					type="button">
					<svg role="status" className={searchBtnText === "Searching..." ? "inline w-4 h-4 mr-3 text-white animate-spin" : "hidden"} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
						<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
					</svg>
					<p>{searchBtnText}</p>
				</button>
			</form>

			<div className="dropdown relative">
				<button
					className="m-6 my-3 ml-auto tracking-wide font-semibold bg-green-600 text-gray-100 w-40 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
					type="button"
					onClick={() => {
						setShowDropdown(showDropdown ? false : true)
					}}
				>
					Export As
					<svg
						aria-hidden="true"
						focusable="false"
						data-prefix="fas"
						data-icon="caret-down"
						className="w-2 ml-2"
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 320 512"
					>
						<path
							fill="currentColor"
							d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
						></path>
					</svg>
				</button>
				<ul
					className={showDropdown ? "w-36 right-6 text-center dropdown-menu min-w-max absolute text-base z-50 float-left py-2 list-none rounded-lg shadow-2xl m-0 bg-clip-padding border-none bg-gray-800 bg-opacity-95" : "hidden"}
					aria-labelledby="dropdownMenuButton2"
				>
					<span
						className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300"
					>
						<li className='rounded overflow-hidden cursor-pointer'>
							<CSVLink data={json} filename={`Shift-Inventory.csv`}>
								<a
									className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700 active:bg-blue-600"
								>
									CSV
								</a>
							</CSVLink>
						</li>
						<li className='rounded overflow-hidden cursor-pointer'
							onClick={() => {
								setShowDropdown(false)
								setTimeout(() => {
									window.print()
								}, 1000);
							}}
						>
							<a
								className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700 active:bg-blue-600"
							>
								PDF
							</a>
						</li>
					</span>
				</ul>
			</div>

			<div className='text-white mt-8'>
				<table className='w-11/12 m-auto text-center'>
					<tr className='grid grid-cols-6 font-bold justify-items-center p-3 border-b bg-gray-500 bg-opacity-30 rounded-lg overflow-hidden mb-6'>
						<th>Tag No.</th>
						<th>Inward No.</th>
						<th>Lab</th>
						<th>Equipment</th>
						<th>Specifications</th>
						<th>Department</th>
					</tr>
					<div className='rounded-lg overflow-hidden'>
						{
							searchResults.length === 0 ? <div className='text-lg font-bold'>No Shifted Item Found!</div> :
							searchResults && searchResults.map(({ data, id }, i) => {
								return <tr key={id} className={i === results.length - 1 ? 'grid grid-cols-6  justify-items-center p-3 bg-gray-500 bg-opacity-30 ' : 'grid grid-cols-6 justify-items-center p-3 border-b bg-gray-500 bg-opacity-30 '}>
									<td><Link className='text-blue-500 underline cursor-pointer' to={`/equipment/${id}`}>{data.TagNo}</Link></td>
									<td>{data.InwardNo}</td>
									<td>{data.Lab}</td>
									<td>{data.EquipmentName}</td>
									<td>{data.Specifications}</td>
									<td>{data.department}</td>
								</tr>
							})
						}
					</div>
				</table>
			</div>

		</>
	)
}

export default Shift