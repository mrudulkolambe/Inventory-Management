import React, { createContext, useContext, useEffect, useState } from "react";
import {
	onAuthStateChanged,
	signOut,
	createUserWithEmailAndPassword,
	deleteUser,
	updateProfile,
	signInWithEmailAndPassword
} from "firebase/auth";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase_config";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
	const navigate = useNavigate();
	const [user, setUser] = useState();

	const logOut = () => {
		signOut(auth)
			.then(() => {
				window.location.reload()
			})
	}
	const sendEmail = () => {

	}
	const createAccount = (email, password, name, admin, department, call_alert) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				setUser(user)
				updateProfile(auth.currentUser, {
					displayName: name
				}).then(async () => {
					await setDoc(doc(db, "USERS", user.uid), {
						name: user.displayName,
						email: user.email,
						admin: false,
						password: btoa(password),
						department: department,
						uid: user.uid,
						isVerified: false,
						authorizedBy: null
					})
				}).catch((error) => {
					console.log(error)
				});

			})
			.catch((error) => {
				call_alert("Invalid Credentials!!", "red")
				deleteUser(user).then(() => {
					console.log("User Deleted")
				}).catch((error) => {
					console.log(error)
				});
			});
	}

	const login = (email, password, call_alert) => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log(user)
				setUser(user)
				navigate("/")
			})
			.catch((error) => {
				call_alert("Invalid Credentials!!", "red")
				return error
			});
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
			setUser(currentuser);
			if (!currentuser) {
				navigate(`/login`);
			} else {
				return
			}
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<userAuthContext.Provider value={{ user, logOut, createAccount, login }}>
			{children}
		</userAuthContext.Provider>
	);
}

export function useUserAuth() {
	return useContext(userAuthContext);
}
