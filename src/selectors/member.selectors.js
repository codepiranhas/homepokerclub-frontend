import { createSelector } from 'reselect'

const getMembersFilter = state => state.app.membersFilter;

const getMembers = state => state.club.current.members;

export const makeGetFilteredMembers = () => {
	return createSelector(
		[getMembersFilter, getMembers],
		(membersFilter, members) => {
			if (!membersFilter) {
				return members;
			} else {
				return members.filter(member => member.name.toLowerCase().includes(membersFilter.toLowerCase()));
			}
		}
	)
};
