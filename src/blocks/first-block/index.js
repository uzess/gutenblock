const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;
import EditorComponent from './editor-component.js';

registerBlockType( 'evision-blocks/first-block', {
    title: 'First Block',

    icon: 'universal-access-alt',

    category: 'layout',

    attributes: {
    	description: {
    		type     : 'string',
    		source   : 'html',
    		selector : '.description'
    	},
    	alignDescription: {
    		type : 'string'
    	},
    	name: {
    		type    : 'string',
    		source  : 'html',
    		selector: '.name'
    	},
    	img: {
    		type : 'string',
    		source: 'attribute',
    		selector: '.image',
    		attribute: 'src'
    	},
    	color: {
    		type: 'string'
    	},
    	template: {
    		type: 'string'
    	},
    },

    edit: EditorComponent,

    save( { className, attributes } ){

    	const { description, alignDescription, name, img, color, template } = attributes;
    	const cls = template ?  ( className + ' ' + template ) : className;

        return(
        	<div className={ cls } style={ { 'backgroundColor' : color } }>
        		<div className="body row">
	        		<div className="image-holder">
	    				<img src={img} className="image" alt="" />
	    			</div>
		        	<RichText.Content
		        		className="description"
		                style={ { textAlign: alignDescription } }
		                value={ description }
		                tagName="div"
		            />
	            </div>
	            <div className="footer">
	            	<span className="name">{ name }</span>	     
	            </div>
        	</div>
        );
    },
} );
