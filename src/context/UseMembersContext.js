import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase_config"
import { collection, query, onSnapshot, doc, updateDoc, arrayUnion, orderBy } from "firebase/firestore";
import { useUserAuth } from "./UserAuthContext";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAuth, signOut } from "firebase/auth";


const userMembersContext = createContext();

export function UserMemberContextProvider({ children }) {
	const navigate = useNavigate()
	const { user } = useUserAuth()
	const [members, setMembers] = useState([]);
	const [admin, setAdmin] = useState([])
	const [items, setItems] = useState([]);
	const [departmentArray, setdepartmentArray] = useState([]);
	const [allDepts, setAllDepts] = useState([])
	const [equipmentItem, setEquipmentItem] = useState([])
	const [userData, setUserData] = useState()
	const [allDeptArr, setAllDeptArr] = useState([])
	const [isVerified, setIsVerified] = useState()

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
		if (isVerified === undefined) {
			return
		}
		else {
			if (!isVerified) {
				navigate("/wait-for-confirmation")
			}
		}
	}, [isVerified]);
	useEffect(() => {
		if (user) {
			const unsub = onSnapshot(doc(db, "ADMIN", "ADMIN"), (doc) => {
				setAdmin(doc.data().ADMINS);
			});
			const unsub4 = onSnapshot(doc(db, "USERS", user.uid), (doc) => {
				setUserData(doc.data())
				if (doc.data()) { setIsVerified(doc.data().isVerified) }
				else {
					const auth = getAuth();
					const currentUser = auth.currentUser
					deleteUser(currentUser).then(() => {
						// User deleted.
					}).catch((error) => {
						// An error ocurred
						// ...
					});
				}
			})
			const unsub1 = onSnapshot(doc(db, "EQUIPMENTS", "TAGNO"), (doc) => {
				setItems(doc.data().TAGNO)
			});
			const unsub2 = onSnapshot(doc(db, "LABS", "LABS"), (doc) => {
				setAllDepts(doc.data().LABS)
			});
			const unsub3 = onSnapshot(doc(db, "ITEMS", "ITEMS"), (doc) => {
				setEquipmentItem(doc.data().ITEMS)
			});
			return () => {
				unsub()
				unsub1()
				unsub2()
				unsub3()
				unsub4()
			};
		}
	}, [user]);
	useEffect(() => {
		if (admin) {
			const q = query(collection(db, "USERS"), orderBy("department"));
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				let arr = [];
				querySnapshot.forEach((doc) => {
					arr.push(doc.data());
				});
				setMembers(arr)
			});
			return () => {
				unsubscribe()
			};
		}
	}, [admin])

	useEffect(() => {
		const unsub1 = onSnapshot(doc(db, "DEPARTMENTS", "DEPARTMENTS"), (doc) => {
			let newArr = []
			setAllDeptArr(doc.data().DEPARTMENTS)
			if (userData && userData.department === "ALL" || userData && userData.admin) {
				setdepartmentArray(doc.data().DEPARTMENTS)
			}
			else {
				doc.data().DEPARTMENTS.map((department) => {
					if (userData && userData.department === department) {
						newArr.push(department)
					}
					else if (department === "") {
						newArr.push(department)
					}
				})
				setdepartmentArray(newArr)
			}
		});
		return () => {
			unsub1()
		};
	}, [userData]);
	return (
		<userMembersContext.Provider value={{ isVerified, members, departmentArray, equipmentCheck, items, getDate, allDepts, admin, equipmentItem, allDeptArr }}>
			{children}
		</userMembersContext.Provider>
	);
}

export function useUserContext() {
	return useContext(userMembersContext);
}
