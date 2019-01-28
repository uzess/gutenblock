<?php
/**
 * Plugin Name: Evision Blocks
 * Plugin URI: #
 * Description: A simple blocks for gutenberg themes
 * Author: evision
 * Author URI: https://evisionthemes.com/
 * Version: 1.0.0
 * License: GPL2+
 * Text Domain: evision-blocks
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 */

# Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


# Declare Plugin mode. Possible values 'development' or 'production'
define( 'EVISION_BLOCKS_MODE', 'development' );

define( 'EVISION_BLOCKS_VERSION', '1.0.0' );

define( 'EVISION_BLOCKS_PLUGIN', __FILE__ );

define( 'EVISION_BLOCKS_PLUGIN_DIR', untrailingslashit( dirname( EVISION_BLOCKS_PLUGIN ) ) );

define( 'EVISION_BLOCKS_PLUGIN_ASSETS_DIR', EVISION_BLOCKS_PLUGIN_DIR . '/dist' );

define( 'EVISION_BLOCKS_PLUGIN_ASSETS_URL', plugins_url( '/dist/', EVISION_BLOCKS_PLUGIN_ASSETS_DIR ) );

require_once EVISION_BLOCKS_PLUGIN_DIR . '/helper.php';
require_once EVISION_BLOCKS_PLUGIN_DIR . '/init.php';