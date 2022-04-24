import React, { createContext, useContext, useEffect, useState } from "react";
import {
	onAuthStateChanged,
	signOut,
	createUserWithEmailAndPassword,
	deleteUser,
	updateProfile,
	signInWithEmailAndPassword
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase_config";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
	const navigate = useNavigate();
	const [user, setUser] = useState({});

	function logOut() {
		return signOut(auth)
		.then(() => {
			window.location.reload()
		})
	}

	const createAccount = (email, password, name, isUser, department) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				setUser(user)
				updateProfile(auth.currentUser, {
					displayName: name
				}).then(async () => {
					if (isUser) {
						await setDoc(doc(db, "USERS", user.uid), {
							name: user.displayName,
							email: user.email,
							admin: false,
							password: btoa(password),
							department: department,
							uid: user.uid,
						});
					}
				}).catch((error) => {
					console.log(error)
				});

			})
			.catch((error) => {
				console.log(error)
				deleteUser(user).then(() => {
					console.log("User Deleted")
				}).catch((error) => {
					console.log(error)
				});
			});
	}

	const login = (email, password) => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log(user)
				setUser(user)
				navigate("/")
			})
			.catch((error) => {
				console.log(error)
				return error
			});
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
			setUser(currentuser);
			if (!currentuser) {
				navigate(`/login`);
			}
			else{
				// navigate('/')
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
