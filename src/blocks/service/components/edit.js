const { Component, Fragment } = wp.element;
const { RichText } = wp.editor;
const { __ } = wp.i18n;

import Inspector from './inspector.js';

class Edit extends Component{

	constructor( props ){
		super( props );
	}

	render(){

		const { 
			className,
			attributes:{
				data,
				items,
			},
			setAttributes, 
		} = this.props;
		
		const newData = new Array( items ).fill(null).map( ( i, index ) => {
			let temp = data[ index ];
			if( !temp ){
				temp = {
					heading: ''
				}
			}

			return temp;
		});
		
		return (
			<Fragment>
				<Inspector { ...this.props } />
				{ newData.map( ( i, index ) => {

					return(
						<div>
							Heading
							<RichText
								identifier="content"
								wrapperClassName="wp-block-heading"
								tagName="h2"
								value={i.heading}
								onChange={ ( value ) => {
									let data = [ ...newData ];
									data[index].heading = value;
									setAttributes( { data } );
								} }
								style={ { textAlign: "center" } }
								className={ className }
								placeholder={ __( 'Write heading…' ) }
							/>
						</div>
					)
				}) }

			</Fragment>
		);
	}
}

export default Edit;