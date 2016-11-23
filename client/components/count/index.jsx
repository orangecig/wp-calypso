/**
 * External dependencies
 */
import React from 'react';
import PureRenderMixin from 'react-pure-render/mixin';

export default React.createClass( {

	displayName: 'Count',

	mixins: [ PureRenderMixin ],

	propTypes: {
		count: React.PropTypes.number.isRequired,
		tooltip: React.PropTypes.string,
	},

	render() {
		return (
			<span className="count" title={ this.props.tooltip }>{ this.numberFormat( this.props.count ) }</span>
		);
	}
} );
