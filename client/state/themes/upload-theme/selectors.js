/**
 * External dependencies
 */
import { get } from 'lodash';

export function isUploadInProgress( state, siteId ) {
	return get( state.themes.uploadTheme.inProgress, siteId );
}

export function isUploadComplete( state, siteId ) {
	return !! get( state.themes.uploadTheme.uploadedTheme, siteId );
}

export function hasUploadFailed( state, siteId ) {
	return !! get( state.themes.uploadTheme.uploadError, siteId );
}

export function getUploadedTheme( state, siteId ) {
	return get( state.themes.uploadTheme.uploadedTheme, siteId );
}

export function getUploadError( state, siteId ) {
	return get( state.themes.uploadTheme.uploadError, siteId );
}

export function getUploadProgressTotal( state, siteId ) {
	return get( state.themes.uploadTheme.progressTotal, siteId );
}

export function getUploadProgressLoaded( state, siteId ) {
	return get( state.themes.uploadTheme.progressLoaded, siteId );
}

export function isInstallInProgress( state, siteId ) {
	return getUploadProgressTotal( state, siteId ) ===
		getUploadProgressLoaded( state, siteId );
}
