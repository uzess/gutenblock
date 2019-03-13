const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

import edit from './components/edit.js';
import save from './components/save.js';

registerBlockType( 'riseblock/single-accordion', {
	title : __( 'RT Single Accordion' ),
	icon: 'shield',
	parent: [ 'riseblock/accordion' ],
	category: 'common',
	attributes: {
		title: {
			type: 'string',
		},
		content: {
			type: 'string',
		}
	},
	supports: {
		align: true,
		inserter: false,
		reusable: false,
	},
	edit,
	save,                                                                                                                                                                                                                                                                                                                                                                                                       
});