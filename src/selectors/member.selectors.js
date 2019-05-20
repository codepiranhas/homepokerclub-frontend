import { createSelector } from 'reselect'

const getMembersFilter = state => state.member.membersFilter;

/**
 * We filter out the members that have been deleted by the user.
 * 
 * This is needed as we don't really delete members from the database,
 * but only mark them as removed. In this way, if a user accidentally
 * delets a member and then asks for help, we can easier restore it.
 */
const getMembers = state => {
	// if (!state.club.current) { return []; }

	return state.member.all.filter(member => !member.isRemoved)
};

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
