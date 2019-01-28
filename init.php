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

        # Check compatibility (WP 5.1 or gutenberg plugin is activated)
        add_action( 'admin_init', array( $this, 'check_compatibility' ), 1 );

        # Load text domain
        add_action( 'plugins_loaded', array( $this, 'load_textdomain' ) );
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

   /**
    * Check if WP Version 5.0+ or Gutenberg Plugin to work
    *
    * @access public
    * @return void
    * @since Evision Blocks 1.0.0
    */

    public function check_compatibility() {
        global $wp_version;
        
        # Check version 5+ and RC
        if ( version_compare( $wp_version, '5.0', '>=' ) or strpos( $wp_version, '5.0-RC') !== false ) {
            return;
        }

        # WP 4.x Check if plugin is activated 
        if ( ! is_plugin_active( 'gutenberg/gutenberg.php' ) ) {
            
            deactivate_plugins( '/evisionblocks/plugin.php' );
            add_action( 'admin_notices', array( $this , 'compatibility_notice') );
        }
    }

    public function compatibility_notice() {
        ?>
        <div class="error notice is-dismissible">
            <p><?php _e( 'Evision Blocks requires WordPress 5.0 or Gutenberg plugin to be activated', 'evision-blocks' ); ?></p>
        </div>
        <?php
    }


   /**
    * Load text domain
    */

    public function load_textdomain() {
        load_plugin_textdomain( 'evision-blocks', false, plugin_dir_path( __DIR__ ) . '/languages' );
    }
}

new Evision_Blocks();