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
				items,
			} 
		} = this.props;

		
		return(
			<InspectorControls>
				<PanelBody title={ __( 'General' ) }>
					<RangeControl
					    label="Items"
					    value={ items }
					    beforeIcon="admin-settings"
					    onChange={ ( items ) => setAttributes( { items } ) }
					    min={ 1 }
					    max={ 10 }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}