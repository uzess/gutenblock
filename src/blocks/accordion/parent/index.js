const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

import edit from './components/edit.js';
import save from './components/save.js';

registerBlockType( 'riseblock/accordion', {
	title : __( 'RT Accordion' ),
	icon: 'shield',
	category: 'common',
	attributes: {
		items: {
			type: 'number',
			default: 1,
		},
	},
	edit,
	save,                                                                                                                                                                                                                                                                                                                                                                                                       
});