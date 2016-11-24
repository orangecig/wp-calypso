export function isUploadInProgress( state, siteId ) {
	const siteState = state.themes.uploadTheme[ siteId ];
	return siteState && siteState.inProgress;
}

export function isUploadComplete( state, siteId ) {
	const siteState = state.themes.uploadTheme[ siteId ];
	return siteState && !! siteState.theme;
}

export function hasUploadFailed( state, siteId ) {
	const siteState = state.themes.uploadTheme[ siteId ];
	return siteState && !! siteState.error;
}

export function getUploadedTheme( state, siteId ) {
	const siteState = state.themes.uploadTheme[ siteId ];
	return siteState && siteState.theme;
}

export function getUploadError( state, siteId ) {
	const siteState = state.themes.uploadTheme[ siteId ];
	return siteState && siteState.error;
}

export function getUploadProgressTotal( state, siteId ) {
	const siteState = state.themes.uploadTheme[ siteId ];
	return siteState && siteState.total;
}

export function getUploadProgressLoaded( state, siteId ) {
	const siteState = state.themes.uploadTheme[ siteId ];
	return siteState && siteState.loaded;
}

export function isInstallInProgress( state, siteId ) {
	const siteState = state.themes.uploadTheme[ siteId ];
	return siteState && ( siteState.loaded === siteState.total );
}
