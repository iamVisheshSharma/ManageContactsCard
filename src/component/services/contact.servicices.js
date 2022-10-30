import { db } from "../../firebase";

import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc, query, where } from 'firebase/firestore/lite';

const contactCollectionRef = collection(db, "contacts")

class ContactService {
	addContact = (newContact) => {
		return addDoc(contactCollectionRef, newContact)
	}

	updateContact = (id, updateCont) => {
		const contactDoc = doc(db, "contacts", id);
		return updateDoc(contactDoc, updateCont)
	}

	deleteContact = (id) => {
		const contactDoc = doc(db, "contacts", id);
		return deleteDoc(contactDoc)
	}

	getAllContacts = (user_id) => {
		const q = query(contactCollectionRef, where("user_id", "==", `${user_id}`))
		return getDocs(q)
	}

	getContact = (id) => {
		const contactDoc = doc(db, "contacts", id)
		return getDoc(contactDoc)
	}
}

export default new ContactService();