/**
 * Internal dependencies
 */
import {
	THEME_UPLOAD_START,
	THEME_UPLOAD_SUCCESS,
	THEME_UPLOAD_FAILURE,
	THEME_UPLOAD_CLEAR,
} from 'state/action-types';

export default function( state = {}, action ) {
	const { siteId } = action;
	switch ( action.type ) {
		case THEME_UPLOAD_START:
			state[ siteId ] = {};
			state[ siteId ].inProgress = true;
			return state;

		case THEME_UPLOAD_SUCCESS:
			state[ siteId ] = {};
			state[ siteId ].theme = action.theme;
			return state;

		case THEME_UPLOAD_FAILURE:
			state[ siteId ] = {};
			state[ siteId ].error = action.error;
			return state;

		case THEME_UPLOAD_CLEAR:
			state[ siteId ] = {};
			return state;
	}
	return state;
}
