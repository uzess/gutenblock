const { Component, Fragment } = wp.element;
const { InnerBlocks  } = wp.editor;
const { __ } = wp.i18n;

import classnames from 'classnames';
import Resizable from 're-resizable';
import { adjustWidth } from '../helper.js';

class Edit extends Component{

	constructor( props ){
		super();
	}

	componentDidMount(){
		const { 
			attributes: {
				index,
				column,
				width,
			}, 
		} = this.props;

		this.wrapper = jQuery( this.refs.box ).closest( '.rt-column-wrapper' );
		if( column - 1 != index ){
			adjustWidth( this.wrapper, JSON.parse( width ) );
		}
	}

	onResize = ()  =>{
		const { 
			attributes: {
				index, 
				column,
				width,
			}, 
			toggleSelection,
			setAttributes
		} = this.props;

		this.width = JSON.parse( width );
		return ( event, direction, elt, delta ) => {
			
			const newWidth = (parseFloat( parseFloat( this.resizable.state.width.replace( '%', '' ) ).toFixed(2) ) - 100)/column;
			const temp1 = this.width[ index ] + newWidth;
			this.width[ index ] = Math.min( Math.max( temp1, 0), 100 );

			const temp2 = this.width[index + 1 ] - newWidth;
			this.width[ index + 1 ] = Math.min( Math.max( temp2, 0), 100 );

			adjustWidth( this.wrapper, this.width );
	        toggleSelection( false );
			this.resizable.updateSize({ width: '100%' });
	    }
	}

	onResizeStop = () => {
		const { setAttributes } = this.props;

		return ( event, direction, elt, delta )=>{
			setAttributes( { width: JSON.stringify( this.width ) } );
		}
	}

	getParams = () => {
		const {
			attributes: {
				column,
				index,
			},
			toggleSelection,
		} = this.props;
		const params = {
			style: { 
				border: '1px dashed', 
				boxSizing: 'border-box',
			},
			size:{
				width: '100%'
			},
			enable:  {
		        top: false,
		        right: false,
		        bottom: false,
		        left: false,
		        topRight: false,
		        bottomRight: false,
		        bottomLeft: false,
		        topLeft: false,
		    },
		    onResize: this.onResize(), 
		    onResizeStop: this.onResizeStop(),
		};

		if( ( 2 == column && 0 == index ) || ( column > 2 && column != index+1 ) ){
			params.enable.right = true;
		} 

		return params;
	}

	render(){
		const params = this.getParams();
		
		return <div ref="box" className="rt-resizable-box" >
			<Resizable ref={c => { this.resizable = c; }} { ...params } >
				<InnerBlocks templateLock={ false } />
			</Resizable>
		</div>;
	}
}

export default Edit;