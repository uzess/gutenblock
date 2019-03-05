const { Component, Fragment } = wp.element;
const { RichText, InnerBlocks  } = wp.editor;
const { __ } = wp.i18n;
const { ResizableBox } = wp.components;
import classnames from 'classnames';
import Inspector from './inspector.js';
import { times, isUndefined } from 'lodash';

import { adjustWidth } from './helper.js';
const ALLOWED_BLOCKS = [ 'riseblock/column' ];

class Edit extends Component{

	getColumnsTemplate = () => {

		const { 
			attributes: {
				column,
			},
			setAttributes
		} = this.props;

		return new Array( column ).fill( null ).map( ( v, i ) => [ 'riseblock/column', {
			index: i,
			column: column,
		}]);
	};

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
					width: JSON.stringify( width ),
				});
			}
		}

		const btns = [ 
			{ column: 1, width: [ 100 ], name: 'Col 1 ( 100%  )' },
			{ column: 2, width: [ 50, 50 ], name: 'Col 2 ( 50% | 50 % )' },
			{ column: 2, width: [ 30, 70 ], name: 'Col 2 ( 30% | 70% )' },
			{ column: 2, width: [ 70, 30 ], name: 'Col 2 ( 70% | 30% )' },
			{ column: 3, width: [ 33.333333, 33.333333, 33.333333 ], name: 'Col 3 ( 33.33% | 33.33% | 33.33% )' },
		];
		return(
			<div>
				{ 
					btns.map( ( v, i ) =><button onClick={ handleChange( v.column, v.width ) }>
						{v.name}
					</button> )
				}
			</div>
		);
	}

	render(){

		const { 
			className,
			attributes: {
				column,
			},
			setAttributes
		} = this.props;
		return (
			<Fragment>

				<Inspector { ...this.props } />
				{ this.selector() }
				{ column && <div className={ classnames( 'rt-column-wrapper' ) }>
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