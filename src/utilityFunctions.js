import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase_config";

const changePermission = async (uid, type) => {
	if (type === "ADMIN") {
		const docRef = doc(db, "USERS", uid);
		await updateDoc(docRef, {
			admin: true
		})
			.then(async () => {
				await updateDoc(doc(db, "ADMIN", "ADMIN"), {
					ADMINS: arrayUnion(uid)
				})
					// .then(() => {
					// 	setShowModal(false)
					// })
			})
	}
	else if (type === "USER") {
		const docRef = doc(db, "USERS", uid);
		await updateDoc(docRef, {
			admin: false
		})
			.then(async () => {
				await updateDoc(doc(db, "ADMIN", "ADMIN"), {
					ADMINS: arrayRemove(uid)
				})
					// .then(() => {
					// 	setShowModal(false)
					// })
			})
	}
}
export { changePermission }