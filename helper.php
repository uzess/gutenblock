<?php
/**
* A helper class for plugin
*
* @since Evision Blocks 1.0.0
*/
class Evision_Blocks_Helper{

	/**
	* Provides the last change time as a Unix timestamp on success, 
	* FALSE on failure for given file name.
	*
	* @uses filemtime()
	* @see https://www.w3schools.com/php/func_filesystem_filemtime.asp
	* @param string | Name of a file from assets directory { $file_name }
	* @return string | bool Whether the plugin is in production mode. True on success.
	* @since Evision Blocks 1.0.0
	*/

	public function get_rand_asssets_file_version( $file_name = false ){

	    $version = false;
	    if( $file_name && 'development' === EVISION_BLOCKS_MODE ){ 
	        $version = filemtime( EVISION_BLOCKS_PLUGIN_ASSETS_DIR . '/' . $file_name );
	    }

	    return $version;
	}

	/**
	* Provides absolute url / path for given filename
	*
	* @param string | $file_name
	* @return string
	* @since Evision Blocks 1.0.0
	*/

	public function get_assets_url( $file_name = '' ){
	    return EVISION_BLOCKS_PLUGIN_ASSETS_URL . $file_name;        
	}
}