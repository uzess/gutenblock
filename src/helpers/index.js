/*------------------------------------------------------------------------*
* Some helper functions                                                   *
* @since Evision Blocks 1.0.0											  *			
*-------------------------------------------------------------------------*/

/* Wrapper functions WordPress function */

export const Component = wp.element.Component;

export const Panel = wp.components.PanelBody;

export const SelectControl = wp.components.SelectControl;

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