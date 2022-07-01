import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDZmKZNm-BsyM00tBsTbryyl-J2gI8zgp0',
	authDomain: 'carpediem-2.firebaseapp.com',
	projectId: 'carpediem-2',
	storageBucket: 'carpediem-2.appspot.com',
	messagingSenderId: '908672954664',
	appId: '1:908672954664:web:66082a98eb6f3cf0cde01d',
	measurementId: 'G-FBHJDHKVWW',
};

// Init App
initializeApp(firebaseConfig);

// Init Services
const auth = getAuth();
const db = getFirestore();

export { auth, db };
