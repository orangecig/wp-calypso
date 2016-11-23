/**
 * External dependencies
 */
import React from 'react';
import PureRenderMixin from 'react-pure-render/mixin';
import noop from 'lodash/noop';
import isUndefined from 'lodash/isUndefined';

/**
 * Internal dependencies
 */
import Tooltip from 'components/tooltip';

export default React.createClass( {

	displayName: 'Count',

	mixins: [ PureRenderMixin ],

	propTypes: {
		count: React.PropTypes.number.isRequired,
		tooltip: React.PropTypes.string,
		tooltipPosition: React.PropTypes.string
	},

	getInitialState() {
		return {
			showTooltip: false
		};
	},

	showTooltip() {
		this.setState( { showTooltip: true } );
	},

	hideTooltip() {
		this.setState( { showTooltip: false } );
	},

	render() {
		return (
			<span>
				<span
					className="count"
					ref="count"
					onMouseEnter={ ! isUndefined( this.props.tooltip ) && this.showTooltip }
					onMouseLeave={ ! isUndefined( this.props.tooltip ) && this.hideTooltip }
				>
					{ this.numberFormat( this.props.count ) }
				</span>
				<Tooltip
					context={ this.refs && this.refs.count }
					isVisible={ this.state.showTooltip }
					position={ this.props.tooltipPosition }
					onClose={ noop }
				>
					{ this.props.tooltip }
				</Tooltip>
			</span>
		);
	}
} );
