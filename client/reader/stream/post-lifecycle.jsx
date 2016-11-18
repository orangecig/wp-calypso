/**
 * External Dependencies
 */
import React, { PropTypes } from 'react';
import { defer } from 'lodash';

/**
 * Internal Dependencies
 */
import PostStore from 'lib/feed-post-store';
import PostStoreActions from 'lib/feed-post-store/actions';
import PostPlaceholder from './post-placeholder';
import PostUnavailable from './post-unavailable';
import CrossPost from './x-post';
import XPostHelper from 'reader/xpost-helper';

export default class PostSelector extends React.PureComponent {
	static propTypes = {
		postKey: PropTypes.object
	}

	state = {
		post: PostStore.get( this.props.postKey )
	}

	updatePost = ( props = this.props ) => {
		const post = PostStore.get( props.postKey );
		if ( post !== ( this.state && this.state.post ) ) {
			this.setState( { post } );
		}
		if ( ! post || post._state === 'minimal' ) {
			defer( () => PostStoreActions.fetchPost( this.props.postKey ) );
		}
	}

	componentWillMount() {
		PostStore.on( 'change', this.updatePost );
	}

	componentWillUnmount() {
		PostStore.off( 'change', this.updatePost );
	}

	componentWillReceiveProps( nextProps ) {
		this.updatePost( nextProps );
	}

	render() {
		const post = this.state.post;
		let postState = post._state;

		if ( ! post || postState === 'minimal' ) {
			postState = 'pending';
		}

		switch ( postState ) {
			case 'pending':
				return <PostPlaceholder />;
			case 'error':
				return <PostUnavailable post={ post } />;
			default:
				const PostClass = this.props.cardClassForPost( post );
				if ( PostClass === CrossPost ) {
					const xMetadata = XPostHelper.getXPostMetadata( post );
					return <CrossPost
						post={ post }
						isSelected={ this.props.isSelected }
						xMetadata={ xMetadata }
						xPostedTo={ this.props.store.getSitesCrossPostedTo( xMetadata.commentURL || xMetadata.postURL ) }
						handleClick={ this.props.handleXPostClick } />;
				}

				return <PostClass
					post={ post }
					isSelected={ this.props.isSelected }
					xPostedTo={ this.props.store.getSitesCrossPostedTo( post.URL ) }
					suppressSiteNameLink={ this.props.suppressSiteNameLink }
					showPostHeader={ this.props.showPostHeader }
					showFollowInHeader={ this.props.showFollowInHeader }
					handleClick={ this.props.handleClick }
					showPrimaryFollowButtonOnCards={ this.props.showPrimaryFollowButtonOnCards }
					showSiteName={ this.props.showSiteName }
				/>;
		}
	}
}
