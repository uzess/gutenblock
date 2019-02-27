const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { InnerBlocks  } = wp.editor;

import edit from './edit.js';

registerBlockType( 'riseblock/column', {
	title : __( 'Custom Column' ),
	parent: [ 'riseblock/columns' ],
	icon: 'shield',
	category: 'common',
	description: __( 'A single column within a columns block.' ),
	attributes: {
		index: {
			type: 'number',
		},
		width: {
			type: 'array',
		},
		column: {
			type: 'number'
		},
		parentSetAttributes: {
			type: 'string'
		},
		onResize: {
			type: 'string'
		}
	},
	supports: {
		inserter: false,
		reusable: false,
		html: false,
	},
	edit,
	save() {
		return <div><InnerBlocks.Content /></div>;
	},                                                                                                                                                                                                                                                                                                                                                                                                       
});