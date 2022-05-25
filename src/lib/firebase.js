import Firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Here I want to import the seed file
// import { seedDatabase } from '../seed';
const config = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// Here is where I call the seed file(only Once)
// seedDatabase(firebase);

export { firebase, FieldValue };
