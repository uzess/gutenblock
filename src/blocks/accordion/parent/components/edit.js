const { Component, Fragment } = wp.element;
const { InnerBlocks  } = wp.editor;
const { __ } = wp.i18n;
import classnames from 'classnames';
import { times, isUndefined } from 'lodash';
const { createBlock } = wp.blocks;

const ALLOWED_BLOCKS = [ 'riseblock/single-accordion' ];

const getCount =( count ) => times( count, () => [ ALLOWED_BLOCKS[ 0 ] ] );


class Edit extends Component{

	getTemplate = () => {
		const {
			attributes:{
				items
			}
		} = this.props;
		const ar = new Array( items ).fill( null ).map( ( v, i ) => [ ALLOWED_BLOCKS[ 0 ] ] );
		console.log( ar );
		return ar;
	};

	handleClick = () => {

		const {
			clientId
		} = this.props;

		let copyAttributes = {};
		let created = createBlock( 'riseblock/single-accordion', copyAttributes );
		wp.data.dispatch( 'core/editor' ).insertBlock( created , undefined, clientId );

	}

	render(){

		const { 
			className,
			attributes: {
				items,
			},
			setAttributes
		} = this.props;
		return (
			<Fragment>
				<div className={ classnames( className ) }>
					<InnerBlocks
						template={ getCount( items ) }
						templateLock={false}
						allowedBlocks={ ALLOWED_BLOCKS } 
					/>
					<button onClick={this.handleClick}>Add</button>
				</div>
			</Fragment>
		);
	}
}

export default Edit;