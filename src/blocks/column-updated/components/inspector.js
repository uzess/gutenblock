const { Component } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody, RangeControl } = wp.components;
const { __ } = wp.i18n;

export default class Inspector extends Component{

	constructor( props ){
		super( props );
	}

	render(){

		const { 
			setAttributes,
			attributes:{
				column,
			} 
		} = this.props;

		
		return(
			<InspectorControls>
				<PanelBody title={ __( 'General' ) }>
					<RangeControl
					    label="Items"
					    value={ column }
					    beforeIcon="admin-settings"
					    onChange={ ( column ) => setAttributes( { column } ) }
					    min={ 1 }
					    max={ 10 }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}