/*------------------------------------------------------------------------*
* Some helper functions                                                   *
* @since Evision Blocks 1.0.0											  *			
*-------------------------------------------------------------------------*/

/* Wrapper functions WordPress function */

export const Component = wp.element.Component;

export const Panel = wp.components.PanelBody;

export const SelectControl = wp.components.SelectControl;

export const ResizableBox  = wp.components.ResizableBox;

export const RangeControl  = wp.components.RangeControl;

export const Fragment = wp.element.Fragment;

export const Inspector = wp.editor.InspectorControls;

export const __ = ( ...args ) => wp.i18n.__( ...args );

export const registerBlockType = ( ...args ) => wp.blocks.registerBlockType( ...args );

/* Wrapper component for rendering child component on certain condition */
export const If = ( { condition, children } ) =>  condition ? <Fragment>{ children }</Fragment> : false;

/*------------------------------------------------------------*
 * Make object compatible for registering Block Type          *
 * Adds default values for icon and category if not provided  *
 *                                                            *
 * @param object                                              *
 * @since Evision Blocks 1.0.0                                *
 *------------------------------------------------------------*/
export const getPayload = ( { icon, category, ...rest } ) => ({ 
	...rest,
	icon     : icon ? icon : 'universal-access-alt',
	category : category ? category : 'evision-blocks',
});

export const HeightResizer = ( { cb, height, defaultHeight, toggleSelection } ) => {

	const style = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		border: 'solid 1px #ddd',
		background: '#f0f0f0',
	};

	const config = {
	   top: false,
	   right: false,
	   bottom: true,
	   left: false,
	   topRight: false,
	   bottomRight: false,
	   bottomLeft: false,
	   topLeft: false,
	}; 

	return (<ResizableBox
		style={style}
		size={{height}}
		defaultSize={{height: defaultHeight}}
		enable={config}
		onResizeStop={ ( event, direction, elt, delta ) => {
		   cb( { height: parseInt( height + delta.height, 10 ) } );
		   toggleSelection( true );
		} }
		onResizeStart={ () => { toggleSelection( false ); } }
		>
		Spacer
	</ResizableBox>);
};