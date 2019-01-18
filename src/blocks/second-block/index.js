const { registerBlockType } = wp.blocks;
const blockStyle = { backgroundColor: '#900', color: '#fff', padding: '20px' };

registerBlockType( 'evision-blocks/second-block', {
    title: 'Second Block',

    icon: 'universal-access-alt',

    category: 'layout',

    edit() {
        return <p style={ blockStyle }>Hello editor.</p>;
    },

    save() {
        return <p style={ blockStyle }>Hello saved content.</p>;
    },
} );