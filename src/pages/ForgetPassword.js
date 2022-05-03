import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Alert from '../components/Alert';

const ForgetPassword = ({setHideNavbar}) => {
	setHideNavbar(false)
	const [message, setMessage] = useState("");
	const [flag, setFlag] = useState(false);
	const [alertType, setAlertType] = useState("blue");
	// const [readOnly, setReadOnly] = useState(false)
	const [email, setEmail] = useState();
	const location = useLocation()
	useEffect(() => {
		const query = new URLSearchParams(location.search)
		const email2 = atob(query.get("id"))
		if (email2.length !== 0) {
			setEmail(email2)
			// setReadOnly(true)
		}
		else {
			setReadOnly(false)
			return
		}
	}, [location]);
	const sendPasswordResetEmailFunc = () => {
		const auth = getAuth();
		sendPasswordResetEmail(auth, email)
			.then(() => {
				call_alert("Password Reset Email Send! Please Check Your Email", "blue")
			})
			.catch((error) => {
				call_alert(error.message, "red")
			});
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
					<h1 className='text-center text-white font-bold text-2xl'>{"Send Password Reset Email"}</h1>
					<div className="mb-4">
						<label className="block text-white text-sm font-bold mb-2" htmlFor="Email">
							Email
						</label>
						<input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-500 border border-gray-200 placeholder-gray-200 duration-200 text-white text-sm focus:outline-none focus:border-gray-400 focus:bg-gray-400 focus:bg-opacity-40" id="Email" type="email" placeholder="Email" autoComplete='off' value={email} onChange={(e) => { setEmail(e.target.value) }} />
					</div>
					<div className="flex items-center justify-between">
						<button className="bg-blue-500 hover:bg-blue-700 m-auto duration-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={sendPasswordResetEmailFunc}>
							Send Email
						</button>
					</div>
				</form>
			</div>
		</>
	)
}

export default ForgetPassword