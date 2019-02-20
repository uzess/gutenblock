import './styles/style.scss';
import './styles/editor.scss';

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

import edit from './components/edit.js';
import save from './components/save.js';

registerBlockType( 'riseblock/service', {
	title : __( 'RT Service' ),
	icon: 'shield',
	category: 'common',
	attributes: {
		items: {
			type: 'number',
			default: 2,
		},
		data: {
			type: 'array',
			default: [],
		},
	},
	edit,
	save,                                                                                                                                                                                                                                                                                                                                                                                                       
});