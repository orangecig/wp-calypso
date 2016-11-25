/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import { createReducer } from 'state/utils';
import {
	THEME_UPLOAD_START,
	THEME_UPLOAD_SUCCESS,
	THEME_UPLOAD_FAILURE,
	THEME_UPLOAD_CLEAR,
	THEME_UPLOAD_PROGRESS,
} from 'state/action-types';

const clearState = function( state, { siteId } ) {
	const newState = Object.assign( {}, state );
	delete newState[ siteId ];
	return newState;
};

const uploadedTheme = createReducer( {}, {
	[ THEME_UPLOAD_SUCCESS ]: ( state, { siteId, theme } ) => ( {
		...state,
		[ siteId ]: theme
	} ),
	[ THEME_UPLOAD_CLEAR ]: clearState,
	[ THEME_UPLOAD_START ]: clearState,
} );

const uploadError = createReducer( {}, {
	[ THEME_UPLOAD_FAILURE ]: ( state, { siteId, error } ) => ( {
		...state,
		[ siteId ]: error
	} ),
	[ THEME_UPLOAD_CLEAR ]: clearState,
	[ THEME_UPLOAD_START ]: clearState,
} );

const progressLoaded = createReducer( {}, {
	[ THEME_UPLOAD_PROGRESS ]: ( state, { siteId, loaded } ) => ( {
		...state,
		[ siteId ]: loaded
	} ),
	[ THEME_UPLOAD_CLEAR ]: clearState,
	[ THEME_UPLOAD_START ]: clearState,
} );

const progressTotal = createReducer( {}, {
	[ THEME_UPLOAD_PROGRESS ]: ( state, { siteId, total } ) => ( {
		...state,
		[ siteId ]: total
	} ),
	[ THEME_UPLOAD_CLEAR ]: clearState,
	[ THEME_UPLOAD_START ]: clearState,
} );

const inProgress = createReducer( {}, {
	[ THEME_UPLOAD_START ]: ( state, { siteId } ) => ( {
		...state,
		[ siteId ]: true
	} ),
	[ THEME_UPLOAD_CLEAR ]: clearState,
	[ THEME_UPLOAD_SUCCESS ]: clearState,
	[ THEME_UPLOAD_FAILURE ]: clearState,
} );

export default combineReducers( {
	uploadedTheme,
	uploadError,
	progressLoaded,
	progressTotal,
	inProgress,
} );
