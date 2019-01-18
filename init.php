<?php
/**
* A final class to setting up the things
* @since Evision Blocks 1.0.0
*/

final class Evision_Blocks{

    public function __construct(){
        $this->register_scripts();
        add_action( 'enqueue_block_assets', array( $this, 'common_scripts' ) );
        add_action( 'enqueue_block_editor_assets', array( $this, 'editor_scripts' ) );
    }

    public function get_rand_asssets_file_version( $file_name = false ){

        $version = false;
        if( $file_name && 'development' === EVISION_BLOCKS_MODE ){ 
            $version = filemtime( EVISION_BLOCKS_PLUGIN_ASSETS_DIR . '/' . $file_name );
        }

        return $version;
    }

    public function get_assets_url( $file_name = '' ){
        return EVISION_BLOCKS_PLUGIN_ASSETS_URL . $file_name;        
    }
    
    public function register_scripts(){
        
        /**************************************************************
        *                                                             *
        * Register scripts for backend editor                         *
        * dependencies { wp-blocks, wp-i18n, wp-element, wp-editor }  *
        *                                                             * 
        ***************************************************************/

        wp_register_script( 'evision-blocks', 
            $this->get_assets_url( 'blocks.build.js' ),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
            $this->get_rand_asssets_file_version( 'blocks.build.js' )
        );

        /* ******************************************
         *  Register Style for banckend and frontend
         * ****************************************** 
         */

        wp_register_style(
            'evision-block-common-css',
            $this->get_assets_url( 'blocks.style.build.css' ),
            array( 'wp-editor' ),
            $this->get_rand_asssets_file_version( 'blocks.style.build.css' )
        );

        /* ******************************************
         *  Register style for banckend editor
         * ****************************************** 
         */

        wp_register_style(
            'evision-block-editor-css',
            $this->get_assets_url( 'blocks.editor.build.css' ),
            array( 'wp-edit-blocks' ),
            $this->get_rand_asssets_file_version( 'blocks.editor.build.css' )
        );
    }

    public function common_scripts(){
        wp_enqueue_script( 'evision-blocks' );
        wp_enqueue_style( 'evision-block-common-css' );
    }

    public function editor_scripts(){
        wp_enqueue_style( 'evision-block-editor-css' );
    }
}

new Evision_Blocks();
