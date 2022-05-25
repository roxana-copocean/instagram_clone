import PropTypes from 'prop-types';
import Header from './header';
import { useReducer, useEffect } from 'react';
import { getUserPhotosByUserName } from '../../services/firebase';
import Photos from './photos';

const reducer = (state, newState) => ({...state, ...newState})
const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0
}

export default function UserProfile({user}){
const [{profile, photosCollection, followerCount} , dispatch] = useReducer(reducer, initialState)

useEffect(()=> {
async function getProfileInfoAndPhotos(){

     const photos = await getUserPhotosByUserName(user.username)
      dispatch({profile: user, photosCollection: photos, followerCount: user.followers.length})
}
getProfileInfoAndPhotos()
}, [user.username])

return (
    <>
        <Header photosCount={photosCollection? photosCollection.length : 0}  profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch} />
        <Photos photos={photosCollection}/>
       
    </>
)
}




UserProfile.propTypes = {
    user:  PropTypes.shape({
		emailAddress: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired,
		userId: PropTypes.string.isRequired,
		fullName: PropTypes.string.isRequired,
		followers: PropTypes.array.isRequired,
		following: PropTypes.array.isRequired,
		dateCreated: PropTypes.number.isRequired
	}).isRequired
};
		

