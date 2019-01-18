const { Component } = wp.element;
const { RichText, BlockControls, AlignmentToolbar, MediaUpload, MediaUploadCheck, InspectorControls } = wp.editor;
const { __ } = wp.i18n;
const { TextControl, Button, PanelBody, ColorPicker, SelectControl } = wp.components;

import { WithSelected } from '../../helpers';

export default class EditorComponent extends Component{

	constructor( props ){
		super( props );
	}

	render(){

		const { description, alignDescription, name, img, color, template } = this.props.attributes;
		const { setAttributes, isSelected, className } = this.props;
		const cls = template ?  ( className + ' ' + template ) : className;
		return(
			<div>
				<InspectorControls>
					<PanelBody title="Options" initialOpen={ true }>
						<TextControl
					        label={ __( "Testimonial By:" ) }
					        value={ name }
					        className="testimonial"
					        onChange={ name => setAttributes( { name: name } ) }
					    />

	    			    <MediaUploadCheck>
	    				    <MediaUpload
	    	    				onSelect={ ( media ) => { console.log( media ); setAttributes( { img: media.url } ) } }
	    	    				allowedTypes={ ['image'] }
	    	    				render={ ( { open } ) => (
	    	    					<Button onClick={ open } isPrimary>
	    	    						{ img ? __( "Update Image" ) : __( "Add Image" ) }
	    	    					</Button>
	    	    				) }
	    	    			/>
	        			</MediaUploadCheck>
					</PanelBody>
					<PanelBody title="Styles" initialOpen={ false }>
						<SelectControl
					        label="Choose Template"
					        value={ template }
					        options={ [
					            { label: 'Default', value: 'default' },
					            { label: 'Template 1', value: 'template-1' },
					        ] }
					        onChange={ ( template ) => { setAttributes( { template: template } ) } }
					    />

					    <ColorPicker
			                color={ color }
			                onChangeComplete={ ( value ) => setAttributes( { color: value.hex } ) }
			                disableAlpha
			            />
					</PanelBody>
				</InspectorControls>

				<BlockControls>
                   <AlignmentToolbar
                       value={ alignDescription }
                       onChange={ align => setAttributes( { alignDescription: align } ) }
                   />
                </BlockControls>

				<div className={ cls } style={ { 'backgroundColor': color } }>

				    <div className="body row">

		                <WithSelected show={ img ? true : false }>
			                <div className="image-holder">
			               		<img src={img} className="image" alt="" />
			               	</div>
		               	</WithSelected>

		               	<div className="description">
							<RichText
								tagName="div"
								placeholder={ __( "Add text" ) }
								value={ description }
								style={ { textAlign: alignDescription } }
								onChange={ content => setAttributes( { description: content } ) }
							/>
						</div>
					</div>
					
					<div className="footer">
						<span className="name">{ name }</span>	     
					</div>
				</div>
			</div>
		);
	}
}