import './styles/style.scss';
import './styles/editor.scss';

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

import edit from './components/edit.js';
import save from './components/save.js';

registerBlockType( 'riseblock/column', {
	title : __( 'Custom Column' ),
	icon: 'shield',
	category: 'common',
	attributes: {
		column: {
			type: 'number',
			default: 2,
		},
	},
	edit,
	save,                                                                                                                                                                                                                                                                                                                                                                                                       
});