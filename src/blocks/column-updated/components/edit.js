const { Component, Fragment } = wp.element;
const { RichText } = wp.editor;
const { __ } = wp.i18n;
const { ResizableBox } = wp.components;
import classnames from 'classnames';
import Inspector from './inspector.js';

class Edit extends Component{

	constructor( props ){
		super( props );
	}

	onResize = ( index ) => {

		const { 
			attributes: { 
				column,
				width, 
			}, 
			toggleSelection ,
			setAttributes
		} = this.props;

		return ( event, direction, elt, delta ) => {
			const newWidth = jQuery( elt )[0].style.width;

			let data = [ ...width ];

			let diff = parseFloat( data[ index ].replace( '%', '' ) ) - parseFloat( newWidth.replace( '%', '' ) );

			data[ index + 1 ] = (parseFloat( data[index + 1 ].replace( '%', '' ) ) + diff ) + '%';

			data[ index ] = newWidth;
			setAttributes( { width: data } );
	        toggleSelection( true );
	    }
	}

	inner = () => {

		const props = {
			style: {
 				border: 'solid 1px #ddd',
				background: '#f0f0f0',
				alignItems: 'center',
				justifyContent: 'center',
			}
		}
		return <div { ...props }>
			Eaque mus distinctio soluta totam consectetuer exercitation, ab. Curae qui mollitia est sem! Architecto penatibus nonummy? Posuere augue. Quaerat aliquam do sit, eaque class. Sagittis eleifend habitant adipiscing sunt porttitor, commodi praesentium beatae nihil, cumque blandit sollicitudin nostrud aliquip cumque.
		</div>;
	}

	column = () => {

		const { attributes: { column, width }, toggleSelection } = this.props;


		return new Array( column ).fill(null).map( ( v, i ) => {
			const props = {
				style: { 
					padding: 5 + 'px', 
					display: 'flex',
					float: 'left',
					border: '1px dashed', 
				},
				size:{
					width: width[ i ]
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
			    onResize: this.onResize( i ), 
			    onResizeStop: ( event, direction, elt, delta )=>{  },
			    onResizeStart: () => {
			        toggleSelection( false );
			    }
			};

			if( ( 2 == column && 0 == i ) || ( column > 2 && column.length != i+1 ) ){
				props.enable.right = true;
			}

			return <ResizableBox { ...props }>
				{ this.inner() }
			</ResizableBox>
		});
	}

	render(){
		const { 
			className,
			attributes: {
				width
			} 
		} = this.props;
		return (
			<Fragment>
				<Inspector { ...this.props } />
				<div className={ classnames( 'rt-row', className ) }>
					{ this.column() }
				</div>
			</Fragment>
		);
	}
}

export default Edit;