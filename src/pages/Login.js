import React, { useState } from 'react'
import { useUserAuth } from '../context/UserAuthContext';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

const Login = ({user}) => {
	document.title = "SIGCE Inventory | Login"
	const [btnText, setbtnText] = useState("Login User");
	const { login } = useUserAuth()

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [show, setShow] = useState(true)
	const handleClick = () => {
		setbtnText("Logging In...")
		login(email, password)
		setEmail("")
		setPassword("")
		setTimeout(() => {
			setbtnText("Login User")
		}, 2000);
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
				<form className="lg:w-1/2 xl:w-6/12 p-6 sm:p-12 py-3" autoComplete="off">
					<div className="my-12 flex flex-col items-center">
						<h1 className="text-4xl font-extrabold">
							Login {user}
						</h1>
						<div className="w-3/4 flex-1 mt-8">

							<input
								className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
								type="email"
								value={email}
								onChange={(e) => { setEmail(e.target.value) }}
								placeholder="Email"
							/>
							<div className='relative'>
								<input
									className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
									type={show ? "password" : "text"}
									value={password}
									onChange={(e) => { setPassword(e.target.value) }}
									placeholder="Password"
								/>
								<div onClick={() => { show ? setShow(false) : setShow(true) }}>
									{show ? <EyeIcon className='top-9 right-4 absolute h-5 w-5 cursor-pointer' /> :
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

export default Login