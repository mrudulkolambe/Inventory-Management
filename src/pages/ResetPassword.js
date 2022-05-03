import { getAuth, confirmPasswordReset } from 'firebase/auth';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';

const ResetPassword = ({setHideNavbar}) => {
	setHideNavbar(false)
	const navigate = useNavigate()
	const [message, setMessage] = useState("");
	const [flag, setFlag] = useState(false);
	const [alertType, setAlertType] = useState("blue");
	const [password, setPassword] = useState("");
	const location = useLocation()
	const ResetPass = () => {
		const auth = getAuth();
		const query = new URLSearchParams(location.search)
		const oobCode = query.get("oobCode")
		if (auth && oobCode && password) {
			confirmPasswordReset(auth, oobCode, password)
				.then(() => {
					call_alert("Password Reset Successfull! You Will Be Redirected Soon...", "blue")
					setTimeout(() => {
						navigate("/login")
					}, 7000);
				})
				.catch((error) => {
					call_alert(error.message, "red")
				});
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
	return (
		<>
			<Alert message={message} messageSetter={setMessage} flag={flag} type={alertType} />
			<div className="w-1/2 m-auto mt-32">
				<form className="bg-gray-600 bg-opacity-40 shadow-md rounded px-8 pt-6 pb-8 mb-4" autoComplete='off'>
					<h1 className='text-center text-white font-bold text-2xl'>Reset Password</h1>
					<div className="mb-4">
						<label className="block text-white text-sm font-bold mb-2" htmlFor="Password">
							New Password
						</label>
						<input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-500 border border-gray-200 placeholder-gray-200 duration-200 text-white text-sm focus:outline-none focus:border-gray-400 focus:bg-gray-400 focus:bg-opacity-40" id="Password" type="password" placeholder="New Password" autoComplete='off' value={password} onChange={(e) => { setPassword(e.target.value) }} />
					</div>
					<div className="flex items-center justify-between">
						<button className="bg-blue-500 hover:bg-blue-700 m-auto duration-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={ResetPass}>
							Reset Password
						</button>
					</div>
				</form>
			</div>
		</>
	)
}

export default ResetPassword