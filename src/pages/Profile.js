import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useUserContext } from '../context/UseMembersContext';
import { useUserAuth } from '../context/UserAuthContext';
import { db } from '../firebase_config';
import { updatePassword, getAuth } from 'firebase/auth';
const Profile = () => {
	const auth = getAuth()
	const { user } = useUserAuth()
	const [btnText, setbtnText] = useState("Update User");
	const { departmentArray } = useUserContext()
	const [name, setName] = useState("");
	const [department, setDepartment] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("")
	const [update, setUpdate] = useState(false);
	const [store, setStore] = useState("")
	const handleClick = () => {

	}
	useEffect(() => {
		if (user) {
			const unsub = onSnapshot(doc(db, "USERS", user.uid), (doc) => {
				setName(doc.data().name)
				setEmail(doc.data().email)
				setDepartment(doc.data().department)
				setStore(doc.data().password)
				setPassword(doc.data().password)
			});
			return () => {
				unsub()
			};
		}
	}, [user]);
	document.title = "SIGCE Inventory | Profile"
	const updatePassword = () => {
		update ? setUpdate(false) : setUpdate(true);
		!update ? setPassword("") : setPassword(store)
	}
	const updateProfile = async () => {
		if (password === confirm) {
			// setbtnText("Updating...")
			await updatePassword(auth.currentUser, password)
			.then(() => {
				console.log(user)
			})
			// console.log("first")
			// await updateDoc(doc(db, "USERS", user.uid), {
			// 	password: password
			// });
			// setbtnText("Profile Updated")


		}
		else {

		}
	}
	return (
		<>
			<div className="m-auto sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
				<div className="flex-1 bg-indigo-100 text-center hidden lg:flex rounded-l-lg">
					<div
						className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
						style={{ backgroundImage: 'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")' }}
					></div>
				</div>
				<form className="lg:w-1/2 xl:w-6/12 p-6 sm:p-12" autoComplete="off">
					<div className="flex flex-col items-center">
						<h1 className="text-4xl font-extrabold">
							Update Account
						</h1>
						<div className="w-3/4 flex-1 mt-8">
							<input
								className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
								type="text"
								value={name}
								onChange={(e) => { setName(e.target.value) }}
								placeholder="Name"
								readOnly
							/>
							<select className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5' value={department}>
								{
									departmentArray.map((departmentName) => {
										return <option value={departmentName} key={departmentName}>{departmentName}</option>
									})
								}
							</select>
							<input
								className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
								type="email"
								value={email}
								onChange={(e) => { setEmail(e.target.value) }}
								placeholder="Email"
								readOnly
							/>
							<input
								className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
								type="text"
								value={password}
								readOnly={!update}
								onChange={(e) => { setPassword(e.target.value) }}
								placeholder="Password"
							/>
							<input
								className={update ? "w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5" : "hidden"}
								type="text"
								value={confirm}
								onChange={(e) => { setConfirm(e.target.value) }}
								placeholder="Confirm Password"
							/>
							<p className='text-right cursor-pointer underline font-semibold text-blue-600 my-3' onClick={updatePassword}>{update ? "Cancel Update" : "Update Password"}</p>
							<button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none" onClick={updateProfile} type="button">
								{btnText}
							</button>
							<div className="my-12 border-b text-center hidden">
								<div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
									Or sign up with e-mail
								</div>
							</div>
						</div>
					</div>
				</form>

			</div>
		</>
	)
}

export default Profile