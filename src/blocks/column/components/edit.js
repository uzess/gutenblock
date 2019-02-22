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
				column 
			}, 
			toggleSelection ,
			setAttributes
		} = this.props;

		return ( event, direction, elt, delta ) => {
			
	        // setAttributes( {
	        //     width: parseInt( width + delta.width, 10 ),
	        // } );
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

		const { attributes: { column }, toggleSelection } = this.props;

		const wrapProps = {
			style: {

				width: 50,
			}
		}

		return new Array( column ).fill(null).map( ( v, i ) => {
			const props = {
				style: { 
					padding: 5 + 'px', 
					display: 'flex',
					float: 'left',
					border: '1px dashed', 
				},
				size:{
					width: 50 + '%'
				},
				enable:  {
			        top: false,
			        right: true,
			        bottom: false,
			        left: true,
			        topRight: false,
			        bottomRight: false,
			        bottomLeft: false,
			        topLeft: false,
			    },
			    onResize: this.onResize( i ), 
			    onResizeStop: ( event, direction, elt, delta )=>{ console.log( elt, delta ); },
			    onResizeStart: () => {
			        toggleSelection( false );
			    }
			};

			if( 1 == column ){
				props.enable.right = false;
				props.enable.left = false;
			}else if( 2 == column && 1 == i ){
				// When there is only two column and is the last one
				props.enable.right = false;
				props.enable.left = false;
			}else{
				if( 0 == i ){
					//For First Block
					props.enable.left = false;
				}else if( column - 1 == i ){
					// For Last Block
					props.enable.right = false;

				}else{
					// For Middle blocks
					props.enable.right = false;
					props.enable.left = false;
				}
			}

			return <ResizableBox { ...props }>
					{ this.inner() }
				</ResizableBox>
		});
	}

	render(){
		const { className } = this.props;
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