<?php
/**
* A final class to setting up the things
*
* @see https://wordpress.org/gutenberg/handbook/
* @uses Evision_Blocks_Helper class
* @since Evision Blocks 1.0.0
*/
 
final class Evision_Blocks extends Evision_Blocks_Helper{

    protected $category_slug  = 'evision-blocks';

    protected $category_title = '';

    protected $handler = array(
        'editor_script' => 'evision-blocks',
        'editor_style'  => 'evision-block-editor-css',
        'common_style'  => 'evision-block-common-css',
    );

    /**
    * Register necessarry styles and scripts for plugin
    * Register custom category
    *
    * @access public
    * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/tutorials/javascript/loading-javascript/
    * @uses register_scripts()
    * @return void
    * @since Evision Blocks 1.0.0
    */
    
    public function __construct(){

        $this->category_title = esc_html__( 'Evision Blocks', 'evision-blocks' );

        $this->register_scripts();
        
        add_action( 'enqueue_block_assets', array( $this, 'common_scripts' ) );
        add_action( 'enqueue_block_editor_assets', array( $this, 'editor_scripts' ) );
        add_filter( 'block_categories', array( $this, 'register_category' ), 10, 2 );
    }

    /**
    * Register category
    *
    * @access public
    * @uses array_merge
    * @return array
    * @since Evision Blocks 1.0.0
    */

    public function register_category( $categories, $post ) {
        return array_merge( $categories, array(
                array(
                    'slug'  => $this->category_slug,
                    'title' => $this->category_title,
                ),
            )
        );
    }
    
    /**
    * Register all the necessary scripts & styles
    *
    * @access public
    * @uses wp_register_script
    * @uses wp_register_style
    * @uses get_assets_url
    * @uses get_rand_asssets_file_version
    * @return void
    * @since Evision Blocks 1.0.0
    */

    public function register_scripts(){
        
        /*---------------------------------------------------------------*
         * Register scripts for backend editor                           *
         * dependencies { wp-blocks, wp-i18n, wp-element, wp-editor }    *
         *---------------------------------------------------------------*/

        wp_register_script( $this->handler[ 'editor_script' ], 
            $this->get_assets_url( 'blocks.build.js' ),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
            $this->get_rand_asssets_file_version( 'blocks.build.js' )
        );

        /*---------------------------------------------*
         * Register Style for banckend and frontend    *
         * dependencies { wp-editor }                  *
         *---------------------------------------------*/

        wp_register_style( $this->handler[ 'common_style' ],
            $this->get_assets_url( 'blocks.style.build.css' ),
            array( 'wp-editor' ),
            $this->get_rand_asssets_file_version( 'blocks.style.build.css' )
        );

        /*-------------------------------------------*
         * Register style for banckend editor        *
         * dependencies { wp-edit-blocks }           *
         *-------------------------------------------*/

        wp_register_style( $this->handler[ 'editor_style' ],
            $this->get_assets_url( 'blocks.editor.build.css' ),
            array( 'wp-edit-blocks' ),
            $this->get_rand_asssets_file_version( 'blocks.editor.build.css' )
        );
    }

    /**
    * Enqueue styles & scripts for frontend & backend
    *
    * @access public
    * @uses wp_enqueue_style
    * @return void
    * @since Evision Blocks 1.0.0
    */

    public function common_scripts(){
        wp_enqueue_style( $this->handler[ 'common_style' ] );
    }

    /**
    * Enqueue style for backend editor
    *
    * @access public
    * @uses wp_enqueue_script
    * @uses wp_enqueue_script
    * @return void
    * @since Evision Blocks 1.0.0
    */

    public function editor_scripts(){
        wp_enqueue_script( $this->handler[ 'editor_script' ] );
        wp_enqueue_style( $this->handler[ 'editor_style' ] );
    }
}

new Evision_Blocks();
