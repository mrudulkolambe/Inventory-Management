import React, { useState } from 'react'
import { useUserAuth } from '../context/UserAuthContext';
import Modal from '../components/Modal';
import { useUserContext } from '../context/UseMembersContext';

const CreateUser = () => {
	const [btnText, setbtnText] = useState("Create User");
	const { departmentArray } = useUserContext()
	const [name, setName] = useState("");
	const [department, setDepartment] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleClick = () => {
		setModal(true);
		setbtnText("Loading...")
		const admin = true
		createAccount(email, password, name, admin, department)
		setbtnText("User Created")
		setName("")
		setDepartment("")
		setEmail("")
		setPassword("")
	}
	const [modal, setModal] = useState(false)

	const { createAccount } = useUserAuth()
	return (
		<>
		<Modal flag={modal} setFlag={setModal} modalHeader={"Created Used Successfully"} modalBody={"Email: mrudulKolambe02@gmail.com"} btnText={"Copy"}/>
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
							Create User
						</h1>
						<div className="w-3/4 flex-1 mt-8">
							<input
								className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
								type="text"
								value={name}
								onChange={(e) => {setName(e.target.value)}}
								placeholder="Name"
							/>
							<select className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5' value={department} onChange={(e) => {setDepartment(e.target.value)}}>
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
								onChange={(e) => {setEmail(e.target.value)}}
								placeholder="Email"
							/>
							<input
								className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
								type="password"
								value={password}
								onChange={(e) => {setPassword(e.target.value)}}
								placeholder="Password"
							/>
							<button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none" onClick={handleClick} type="button">
								<svg
									className="w-6 h-6 -ml-2"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
									<circle cx="8.5" cy="7" r="4" />
									<path d="M20 8v6M23 11h-6" />
								</svg>
								<span className="ml-3">{btnText}</span>
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
	);
}

export default CreateUser