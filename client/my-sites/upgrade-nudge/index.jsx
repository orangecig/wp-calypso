/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import noop from 'lodash/noop';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import Card from 'components/card';
import Gridicon from 'components/gridicon';
import analytics from 'lib/analytics';
import { getValidFeatureKeys } from 'lib/plans';
import { isFreePlan } from 'lib/products-values';
import TrackComponentView from 'lib/analytics/track-component-view';
import { getSiteOption, getSiteSlug, isJetpackSite } from 'state/sites/selectors';
import { getCurrentPlan, hasFeature } from 'state/sites/plans/selectors';
import { getSelectedSiteId } from 'state/ui/selectors';

const UpgradeNudge = React.createClass( {

	displayName: 'UpgradeNudge',

	propTypes: {
		onClick: React.PropTypes.func,
		className: React.PropTypes.string,
		message: React.PropTypes.string,
		icon: React.PropTypes.string,
		event: React.PropTypes.string,
		href: React.PropTypes.string,
		jetpack: React.PropTypes.bool,
		compact: React.PropTypes.bool,
		feature: React.PropTypes.oneOf( [ false, ...getValidFeatureKeys() ] ),
		shouldDisplay: React.PropTypes.func
	},

	getDefaultProps() {
		return {
			onClick: noop,
			message: 'And get your own domain address.',
			icon: 'star',
			event: null,
			jetpack: false,
			feature: false,
			compact: false,
			shouldDisplay: null
		};
	},

	handleClick() {
		if ( this.props.event || this.props.feature ) {
			analytics.tracks.recordEvent( 'calypso_upgrade_nudge_cta_click', {
				cta_name: this.props.event,
				cta_feature: this.props.feature,
				cta_size: 'regular'
			} );
		}
		this.props.onClick();
	},

	shouldDisplay() {
		const {
			currentPlan,
			feature,
			hasWordads,
			isJetpackSite: isJetpack,
			jetpack,
			siteId,
			shouldDisplay
		} = this.props;

		if ( shouldDisplay ) {
			return shouldDisplay();
		}
		if ( ! siteId ) {
			return false;
		}
		if ( feature && hasFeature( siteId, feature ) ) {
			return false;
		}
		if ( ! feature && ! isFreePlan( currentPlan ) ) {
			return false;
		}
		if ( feature === 'no-adverts' && hasWordads ) {
			return false;
		}
		if ( ! jetpack && isJetpack || jetpack && ! isJetpack ) {
			return false;
		}
		return true;
	},

	render() {
		const { siteSlug } = this.props;
		const classes = classNames( this.props.className, 'upgrade-nudge' );

		let href = this.props.href;

		if ( ! this.shouldDisplay() ) {
			return null;
		}

		if ( ! this.props.href && siteSlug ) {
			if ( this.props.feature ) {
				href = `/plans/${ siteSlug }?feature=${ this.props.feature }`;
			} else {
				href = `/plans/${ siteSlug }`;
			}
		}

		if ( this.props.compact ) {
			return (
				<Button className={ classes } onClick={ this.handleClick } href={ href }>
					<Gridicon className="upgrade-nudge__icon" icon={ this.props.icon } />
					<div className="upgrade-nudge__info">
						<span className="upgrade-nudge__title">
							{ this.props.title || this.translate( 'Upgrade to Premium' ) }
						</span>
						<span className="upgrade-nudge__message" >
							{ this.props.message }
						</span>
					</div>
				</Button>
			);
		}

		return (
			<Card compact className={ classes } onClick={ this.handleClick } href={ href }>
				<Gridicon className="upgrade-nudge__icon" icon={ this.props.icon } size={ 18 } />
				<div className="upgrade-nudge__info">
					<span className="upgrade-nudge__title">
						{ this.props.title || this.translate( 'Upgrade to Premium' ) }
					</span>
					<span className="upgrade-nudge__message" >
						{ this.props.message }
					</span>
				</div>
				{ ( this.props.event || this.props.feature ) &&
					<TrackComponentView eventName={ 'calypso_upgrade_nudge_impression' } eventProperties={ {
						cta_name: this.props.event,
						cta_feature: this.props.feature,
						cta_size: 'regular'
					} } />
				}
			</Card>
		);
	}
} );

export default connect(
	( state ) => {
		const siteId = getSelectedSiteId( state );
		return {
			hasWordads: getSiteOption( state, siteId, 'wordads' ),
			isJetpackSite: isJetpackSite( state, siteId ),
			siteId,
			currentPlan: getCurrentPlan( state, siteId ),
			siteSlug: getSiteSlug( state, siteId ),
		};
	}
)( UpgradeNudge );
