<?php
/**
 * Shortcodes
 *
 * @package Dao Factory
 */

/**
 * Dao inline scripts
 *
 * @param number $id Pos id.
 */

/**
 * Main Shortcode
 */
function daofactory_pro_main_shortcode( $atts ) {

	$atts = shortcode_atts( array(
		'id' => null,
	), $atts );

	$id             = $atts['id'];
	$html           = '';

	if ( null !== $id && get_post( $id ) ) {

		wp_enqueue_script("daofactory-pro-app", DAOFACTORY_PRO_VER, true);
		wp_enqueue_style("daofactory-pro-app");

    $html = daofactory_pro_get_html( $id );
	}


	return $html;
}
add_shortcode( 'daofactory_pro', 'daofactory_pro_main_shortcode' );

