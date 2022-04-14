import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase_config"
import { collection, query, onSnapshot, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useUserAuth } from "./UserAuthContext";
import { CSVLink, CSVDownload } from "react-csv";



const userMembersContext = createContext();

export function UserMemberContextProvider({ children }) {
	const { user } = useUserAuth()
	const [members, setMembers] = useState([]);
	const [admin, setAdmin] = useState({})
	const [items, setItems] = useState([]);
	const departmentArray = ["Mechanical", "Electrical", "Computer", "CSE AIML", "CSE IOT", "Office", "Account", "First year", "Principal cabin", "Vice principal cabin", "T&P section", "EXTC"]

	const convertJSON = (data) => {
		// console.log(data[0])
		if (data.length !== 0) {
			console.log(data)
			const headers = data && Object.keys(data[0].data)
			let arr = []
			data.forEach(({ data }) => {
				let row = data && Object.values(data)
				arr.push(row)
			})
			const csvData = {
				filename: "newFile.csv",
				headers,
				data: arr
			}
			console.log(csvData)
			return csvData
		}
	}

	const equipmentCheck = async (TagNo) => {
		const itemRef = doc(db, "EQUIPMENTS", "TAGNO");
		await updateDoc(itemRef, {
			TAGNO: arrayUnion(TagNo)
		});
	}
	useEffect(() => {
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
			onSnapshot(doc(db, "EQUIPMENTS", "TAGNO"), (doc) => {
				setItems(doc.data().TAGNO)
			});
			return () => {
				unsub()
			};
		}
	}, [user]);
	return (
		<userMembersContext.Provider value={{ members, departmentArray, equipmentCheck, items, convertJSON }}>
			{children}
		</userMembersContext.Provider>
	);
}

export function useUserContext() {
	return useContext(userMembersContext);
}
