import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase_config"
import { collection, query, onSnapshot, doc } from "firebase/firestore";
import { useUserAuth } from "./UserAuthContext";


const userMembersContext = createContext();

export function UserMemberContextProvider({ children }) {
	const { user } = useUserAuth()
	const [members, setMembers] = useState([]);
	const [admin, setAdmin] = useState({})
	const departmentArray = ["Mechanical", "Electrical", "Computer", "CSE AIML", "CSE IOT", "Office", "Account", "First year", "Principal cabin", "Vice principal cabin", "T&P section", "EXTC"]


	useEffect(() => {
		if (user) {
			const unsub = onSnapshot(doc(db, "ADMIN", "ADMIN"), (doc) => {
				setAdmin(doc.data());
				console.log(doc.data())
			});
			if (admin.uid === user.uid) {
				const q = query(collection(db, "USERS"));
				const unsubscribe = onSnapshot(q, (querySnapshot) => {
					let arr = [];
					querySnapshot.forEach((doc) => {
						arr.push(doc.data());
						if (doc.data().admin) {
							setAdmin(doc.data())
						}
					});
					setMembers(arr)
					console.log(members)
				});
				return () => {
					unsubscribe()
				};
			}

			return () => {
				unsub()
			};
		}
	}, [user]);
	return (
		<userMembersContext.Provider value={{ members,departmentArray }}>
			{children}
		</userMembersContext.Provider>
	);
}

export function useUserContext() {
	return useContext(userMembersContext);
}
