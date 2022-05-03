import React, { useEffect, useRef, useState } from 'react'
import { useUserAuth } from '../context/UserAuthContext';
import { useUserContext } from '../context/UseMembersContext';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import Alert from "../components/Alert"
import emailjs from "@emailjs/browser"


const CreateUser = ({nav}) => {
	nav(true)
	document.title = "SIGCE Inventory | Create User"
	const form = useRef()
	const [btnText, setbtnText] = useState("Create User");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [department, setDepartment] = useState("");
	const [password, setPassword] = useState("");
	// const [confpassword, setConfPassword] = useState("");
	const { departmentArray } = useUserContext()
	const [admin, setAdmin] = useState(false);
	const [flag, setFlag] = useState(false);
	const [message, setMessage] = useState("");
	const [alertType, setAlertType] = useState("blue");
	const [template, setTemplate] = useState({
		name: name,
		email: btoa(email),
		sender: email
	});
	const handleClick = () => {
		if (admin !== null) {
			console.log(department)
			setbtnText("Loading...")
			createAccount(email, password, name, admin, department)
			setbtnText("User Created")
			setName("")
			setEmail("")
			setPassword("")
			setAdmin("")
			sendEmail()
		} else {
			call_alert("Set The User Type", "red")
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
	const [show1, setShow1] = useState(true)
	const { createAccount } = useUserAuth()
	useEffect(() => {
		setTemplate({
			name: name,
			email: btoa(email),
			sender: email,
			password: btoa(password),
		})
	}, [name, email, password]);
	const sendEmail = () => {
		emailjs.send(process.env.REACT_APP_EMAIL_SERVICE_ID, process.env.REACT_APP_EMAIL_TEMPLATE_ID, template, process.env.REACT_APP_EMAIL_PUBLIC_KEY)
			.then((result) => {
				console.log(result.text);
			}, (error) => {
				console.log(error.text);
			});
	}

	return (
		<>
			<Alert message={message} messageSetter={setMessage} flag={flag} type={alertType} />
			<div className="m-auto sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
				<div className="flex-1 bg-indigo-100 text-center hidden lg:flex rounded-l-lg">
					<div
						className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
						style={{ backgroundImage: 'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")' }}
					></div>
				</div>
				<form ref={form} className="lg:w-1/2 xl:w-6/12 p-6 sm:p-12" autoComplete="off">
					<div className="flex flex-col items-center">
						<h1 className="text-4xl font-extrabold">
							Create User
						</h1>
						<div className="w-3/4 flex-1 mt-8">
							<input
								className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
								type="text"
								value={name}
								name={"name"}
								onChange={(e) => { setName(e.target.value) }}
								placeholder="Name"
							/>
							<input
								className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
								type="email"
								value={email}
								name={"sender-email"}
								onChange={(e) => { setEmail(e.target.value) }}
								placeholder="Email"
							/>
							<select
								className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
								value={department}
								onChange={(e) => { setDepartment(e.target.value.toUpperCase()) }}
							>
								{
									departmentArray && departmentArray.map((department) => {
										return <option value={department} key={department}>{department.length === 0 ? "---choose option---" : department}</option>
									})
								}
							</select>
							<select
								className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
								value={admin === null ? "" : admin ? "ADMIN" : "USER"}
								onChange={(e) => { setAdmin(e.target.value === "" ? null : e.target.value === "ADMIN" ? true : false) }}
							>
								<option value={""} key={""}>{"---Choose User Type---"}</option>
								<option value={"ADMIN"} key={"ADMIN"}>{"ADMIN"}</option>
								<option value={"USER"} key={"USER"}>{"USER"}</option>
							</select>
							<div className='relative'>
								<input
									className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
									type={show1 ? "password" : "text"}
									value={password}
									onChange={(e) => { setPassword(e.target.value) }}
									placeholder="Password"
								/>
								<div onClick={() => { show1 ? setShow1(false) : setShow1(true) }}>
									{show1 ? <EyeIcon className='top-9 right-4 absolute h-5 w-5 cursor-pointer' /> :
										<EyeOffIcon className='top-9 right-4 absolute h-5 w-5 cursor-pointer' />}
								</div>
							</div>
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