const { Component, Fragment } = wp.element;
const { InnerBlocks  } = wp.editor;
const { __ } = wp.i18n;
const { ResizableBox } = wp.components;
import classnames from 'classnames';

class Edit extends Component{

	constructor( props ){
		super();
	}	

	// onResize = () => {

	// 	const { 
	// 		attributes: { 
	// 			column,
	// 			width,
	// 			index,
	// 			ref,
	// 			parentSetAttributes, 
	// 		}, 
	// 		toggleSelection,
	// 		setAttributes
	// 	} = this.props;

	// 	return ( event, direction, elt, delta ) => {
	// 		const newWidth = parseFloat( jQuery( elt )[0].style.width.replace( '%', '' ) ) - 100;
	// 		let data = [ ...width ];
	// 		data[ index ] = data[ index ] + newWidth;
	// 		data[ index + 1 ] = data[index + 1 ] - newWidth;
	// 		// console.log( data );
	// 		jQuery( ref ).find( '[data-type="riseblock/column"]' ).each( ( i, ele ) => {
	// 			jQuery( ele ).css({ width: data[ i ] + '%' });
	// 		});

	// 		change( width );
	//         toggleSelection( true );
	//     }
	// }

	render(){
		const {
			attributes: {
				index,
				width,
				column,
				onResize,
			},
			toggleSelection,
		} = this.props;
		
		const params = {
			style: { 
				padding: 5 + 'px', 
				border: '1px dashed', 
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
		    onResize: onResize( index ), 
		    onResizeStop: ( event, direction, elt, delta )=>{  },
		    onResizeStart: () => {
		        toggleSelection( false );
		    }
		};

		if( ( 2 == column && 0 == index ) || ( column > 2 && column != index+1 ) ){
			params.enable.right = true;
		}
		return <ResizableBox { ...params }>
			<InnerBlocks templateLock={ false } />
		</ResizableBox>;
	}
}

export default Edit;