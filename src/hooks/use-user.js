import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';

export default function useUser() {
	const [ activeUser, setActiveUser ] = useState({});
	const { user } = useContext(UserContext);

	useEffect(
		() => {
			// get user from Firestore where userId === userId(passed from the auth)
			async function getUserObjByUserId() {
				const [ response ] = await getUserByUserId(user.uid);

				setActiveUser(response); // pass the user response to the state of activeUser
			}
			if (user && user.uid) {
				getUserObjByUserId();
			}
		},
		[ user ]
	);
	return { user: activeUser }; // return activeUser as user to the hook when called
}
