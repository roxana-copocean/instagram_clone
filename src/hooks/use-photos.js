import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserByUserId, getUserFollowedPhotos } from '../services/firebase';

export default function usePhotos() {
	const [ photos, setPhotos ] = useState(null);
	const { user: { uid: userId = ' ' } } = useContext(UserContext);

	useEffect(
		() => {
			async function getTimelinePhotos() {
				const [ { following } ] = await getUserByUserId(userId);
				let followedUserPhotos = [];
				if (following.length > 0) {
					followedUserPhotos = await getUserFollowedPhotos(userId, following);
					// we need to sort the photos from newest to oldest
					followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
					setPhotos(followedUserPhotos);
				}
			}
			getTimelinePhotos();
		},
		[ userId ]
	);
	return { photos };
}
