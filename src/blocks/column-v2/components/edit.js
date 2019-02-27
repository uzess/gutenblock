const { Component, Fragment } = wp.element;
const { RichText, InnerBlocks  } = wp.editor;
const { __ } = wp.i18n;
const { ResizableBox } = wp.components;
import classnames from 'classnames';
import Inspector from './inspector.js';
import { times, isUndefined } from 'lodash';

const ALLOWED_BLOCKS = [ 'riseblock/column' ];


class Edit extends Component{

	adjustWidth = width => {
		console.log( width );
		jQuery( this.refs[ 'parent' ] ).find( '[data-type="riseblock/column"]' ).each( ( i, ele ) => {
			jQuery( ele ).css({ width: width[ i ] + '%' });
		});
	}

	componentDidUpdate = ( prevProps) =>{
		if(this.props.attributes.column){

			const {
				attributes:{
					width,
				}
			} = this.props;

			this.adjustWidth( width );
		}
	} 

	getColumnsTemplate = () => {

		const { 
			attributes: {
				column,
				width,
			},
			setAttributes
		} = this.props;

		return new Array( column ).fill( null ).map( ( v, i ) => [ 'riseblock/column', {
			index: i,
			column,
			width,
			onResize: this.onResize,
			ref: this.refs[ 'parent' ],
			parentSetAttributes: setAttributes
		}]);
	};

	onResize = ( index )  =>{
		const { 
			attributes: { 
				column,
				width,
			}, 
			toggleSelection,
			setAttributes
		} = this.props;

		var data = [ ...width ];
		console.log( 'Resize' );
		return ( event, direction, elt, delta ) => {

			const newWidth = parseFloat( parseFloat( jQuery( elt )[0].style.width.replace( '%', '' ) ).toFixed(2) ) - 100;
			const temp1 = data[ index ] + newWidth;
			data[ index ] = Math.min( Math.max( temp1, 0), 100 );

			const temp2 = data[index + 1 ] - newWidth;
			data[ index + 1 ] = Math.min( Math.max( temp2, 0), 100 );
			this.adjustWidth( data );
	        toggleSelection( true );
	    }
	}

	selector = () => {

		const {
			setAttributes,
			attributes: {
				column,
				width,
			}
		} = this.props;

		if( !isUndefined( column ) )
			return;

		const handleChange = ( column, width ) => {
			return ( e ) => {
				e.preventDefault();
				setAttributes({
					column,
					width,
				});
			}
		}

		return(
			<div>
				<button onClick={ handleChange( 1, [ 100 ] ) }>Col 1 ( 100% )</button>
				<button onClick={ handleChange( 2, [ 50, 50 ] ) }>Col 2 ( 50% | 50 % )</button>
				<button onClick={ handleChange( 2, [ 30, 70 ] ) }>Col 2 ( 30% | 70% ) </button>
				<button onClick={ handleChange( 2, [ 70, 30 ] ) }>Col 2 ( 70% | 30% ) </button>
				<button onClick={ handleChange( 3, [ 33.333333, 33.333333, 33.333333 ] ) }>Col 3 ( 33.33% | 33.33% | 33.33% ) </button>
			</div>
		);
	}

	render(){
		const { 
			className,
			attributes: {
				column,
				width,
			},
			setAttributes
		} = this.props;
		return (
			<Fragment>
				<Inspector { ...this.props } />
				{ this.selector() }
				{ column && <div ref="parent" className={ classnames( 'rt-column-wrapper' ) }>
						<InnerBlocks
							template={ this.getColumnsTemplate() }
							templateLock="all"
							allowedBlocks={ ALLOWED_BLOCKS } 
						/>
					</div> }
			</Fragment>
		);
	}
}

export default Edit;