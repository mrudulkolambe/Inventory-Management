import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase_config"
import { collection, query, onSnapshot, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useUserAuth } from "./UserAuthContext";



const userMembersContext = createContext();

export function UserMemberContextProvider({ children }) {
	const { user } = useUserAuth()
	const [members, setMembers] = useState([]);
	const [admin, setAdmin] = useState({})
	const [items, setItems] = useState([]);
	const departmentArray = ["All" , "Mechanical", "Electrical", "Computer", "CSE AIML", "CSE IOT", "Office", "Account", "First year", "Principal cabin", "Vice principal cabin", "T&P section", "EXTC"]
	const getDate = () => {
		const dateObj = new Date();
		let date = dateObj.getDate();
		if (date <= 9) {
			date = `0${date}`
		}
		let month = dateObj.getMonth();
		if (month <= 9) {
			month = `0${month}`
		}
		let year = dateObj.getFullYear();
		const dateString = `${year}-${month}-${date}`
		return dateString
	}

	const equipmentCheck = async (TagNo) => {
		const itemRef = doc(db, "EQUIPMENTS", "TAGNO");
		await updateDoc(itemRef, {
			TAGNO: arrayUnion(TagNo)
		});
	}
	useEffect(() => {
		setMembers([])
		if (user) {
			const unsub = onSnapshot(doc(db, "ADMIN", "ADMIN"), (doc) => {
				setAdmin(doc.data());
			});
			if (admin.uid === user.uid) {
				const q = query(collection(db, "USERS"));
				const unsubscribe = onSnapshot(q, (querySnapshot) => {
					let arr = [];
					querySnapshot.forEach((doc) => {
						arr.push(doc.data());
					});
					setMembers(arr)
				});
			}
			else {
				setMembers([])
			}
			onSnapshot(doc(db, "EQUIPMENTS", "TAGNO"), (doc) => {
				setItems(doc.data().TAGNO)
			});
			return () => {
				unsub()
			};
		}
	}, [user]);
	return (
		<userMembersContext.Provider value={{ members, departmentArray, equipmentCheck, items, getDate }}>
			{children}
		</userMembersContext.Provider>
	);
}

export function useUserContext() {
	return useContext(userMembersContext);
}
