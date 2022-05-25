import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import PropTypes from 'prop-types';
import 'react-loading-skeleton/dist/skeleton.css';
import { getSuggestedProfiles } from '../../services/firebase';
import SuggestedProfile from './suggested-profile';

export default function Suggestion({ userId, following, loggedInUserDocId }) {
	const [ profiles, setProfiles ] = useState(null);

	useEffect(
		() => {
			async function suggestedProfiles() {
				const response = await getSuggestedProfiles(userId, following);
				setProfiles(response);
			}
			if (userId) {
				suggestedProfiles();
			}
		},
		[ userId ]
	);

	// we need to get the suggested profiles
	return !profiles ? (
		<Skeleton count={1} height={150} className="mt-5" />
	) : profiles.length > 0 ? (
		<div className="rounded flex flex-col">
			<div className="text-sm flex items-center align-item justify-between mb-2">
				<p className="font-bold text-gray-base">Suggestions for you</p>
			</div>
			<div className="mt-4 grid gap-5">
				{profiles.map((profile) => (
					<SuggestedProfile
						key={profile.docId}
						profileDocId={profile.docId}
						username={profile.username}
						profileId={profile.userId}
						userId={userId}
						loggedInUserDocId={loggedInUserDocId}
					/>
				))}
			</div>
		</div>
	) : null;
}

Suggestion.propTypes = {
	userId: PropTypes.string,
	following: PropTypes.array,
	loggedInUserDocId: PropTypes.string
};
