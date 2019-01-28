/*----------------------------------------------------------------------------------------------------------------------------*
 *                       									                                                                  *  
 * Register Divider block 									                                                                  *  
 *          									                                                                              *  
 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/tutorials/block-tutorial/writing-your-      *
 *       first-block-type/  																								  *	
 * @since Evision Blocks 1.0.0								   																  *	
 *															   																  *			
 *----------------------------------------------------------------------------------------------------------------------------*/

import { registerBlockType, getPayload, __ } from '../../helpers';

import attributes from './attributes';
import edit from './edit';
import save from './save';

/*----------------------------------------------------------------------------------------------------------------------------*
 *																															  *	
 * Get Object for Registering Block                                                                                           *
 *                                                                                                                            *
 * @see https://developer.wordpress.org/resource/dashicons/                                                                   * 
 * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/#icon-optional  *
 * for dashicons                          																					  *	
 * @since Evision Blocks 1.0.0                                                                                                *
 *                                                                                                                            *
 *----------------------------------------------------------------------------------------------------------------------------*/

const payload = getPayload({
    title : __( 'Divider', 'evision-blocks' ),
    icon  : 'sort', 
    attributes,
    edit,
    save
});

registerBlockType( 'evision-blocks/divider', payload );
