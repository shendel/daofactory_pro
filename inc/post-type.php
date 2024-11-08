<?php
/**
 * Post Type
 *
 * @package Dao Factory
 */

/**
 * Register Post Type daofactory
 */
function daofactory_pro_post_type() {

	$labels = array(
		'name'                  => esc_html__( 'Dao Factory', 'daofactory_pro' ),
		'singular_name'         => esc_html__( 'Dao Factory', 'daofactory_pro' ),
		'menu_name'             => esc_html__( 'Dao Factory', 'daofactory_pro' ),
		'name_admin_bar'        => esc_html__( 'Dao Factory', 'daofactory_pro' ),
		'all_items'             => esc_html__( 'All DAOs', 'daofactory_pro' ),
		'add_new_item'          => esc_html__( 'Add New Dao', 'daofactory_pro' ),
		'add_new'               => esc_html__( 'Add New', 'daofactory_pro' ),
		'new_item'              => esc_html__( 'New Dao Factory', 'daofactory_pro' ),
		'edit_item'             => esc_html__( 'Edit Dao Factory', 'daofactory_pro' ),
    'view_item'             => esc_html__( 'View Dao Factory', 'daofactory_pro' ),
		'update_item'           => esc_html__( 'Update Dao Factory', 'daofactory_pro' ),
		'search_items'          => esc_html__( 'Search Dao Factory', 'daofactory_pro' ),
		'not_found'             => esc_html__( 'Not found', 'daofactory_pro' ),
		'not_found_in_trash'    => esc_html__( 'Not found in Trash', 'daofactory_pro' ),
	);
	$args   = array(
		'labels'             => $labels,
		'supports'           => array( 'title' ),
		'hierarchical'       => false,
		'public'             => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'show_in_admin_bar'  => false,
		'show_in_nav_menus'  => false,
		'can_export'         => true,
		'publicly_queryable' => true,
		'capability_type'    => 'post',
		'menu_icon'          => 'dashicons-admin-site-alt3',
	);
	register_post_type( 'daofactory_pro', $args );
  flush_rewrite_rules( false );
}
add_action( 'init', 'daofactory_pro_post_type' );
add_action('admin_menu', 'daofactory_pro_settings_page');

function daofactory_pro_settings_page() {
  add_submenu_page(
    'edit.php?post_type=daofactory_pro',
    'DAO Settings',
    'Global Settings',
    'manage_options',
    'daofactory_pro',
    'daofactory_pro_settings_page_callback'
  );
}

function daofactory_pro_settings_page_callback() {
  wp_enqueue_style( 'daofactory-pro-admin', DAOFACTORY_PRO_URL . 'assets/css/daofactory-admin.css', false, DAOFACTORY_PRO_VER );
  wp_enqueue_script( 'daofactory-pro-settings', DAOFACTORY_PRO_URL . 'assets/js/daofactory-settings.js', array(), DAOFACTORY_PRO_VER );
      
  include DAOFACTORY_PRO_BASE_DIR . DIRECTORY_SEPARATOR . 'inc' . DIRECTORY_SEPARATOR . 'settings.php';
}
function daofactory_pro_custom_template($single) {
    global $post;


    if ( $post->post_type == 'daofactory_pro' ) {
      return DAOFACTORY_PRO_BASE_DIR . DIRECTORY_SEPARATOR . 'inc' . DIRECTORY_SEPARATOR . 'post-template.php';
    }

    return $single;
}

add_filter('single_template', 'daofactory_pro_custom_template');

function daofactory_pro_frontpage_template($template) {
  if (is_front_page()) {
    $dao_at_homepage = get_option( 'daofactory_pro_id_at_homepage', 'false');

    if (($dao_at_homepage !== 'false') and is_numeric($dao_at_homepage)) {
      return DAOFACTORY_PRO_BASE_DIR . DIRECTORY_SEPARATOR . 'inc' . DIRECTORY_SEPARATOR . 'homepage.php';
    }
  }
  return $template;
}
add_filter('frontpage_template', 'daofactory_pro_frontpage_template');
/**
 * Remove date from posts column
 *
 * @param array $columns Columns.
 */
function daofactory_pro_remove_date_column( $columns ) {
	unset( $columns['date'] );
	return $columns;
}
add_filter( 'manage_daofactory_pro_posts_columns', 'daofactory_pro_remove_date_column' );

/**
 * Remove quick edit
 *
 * @param array  $actions Actions.
 * @param object $post Post.
 */
function daofactory_pro_remove_quick_edit( $actions, $post ) {
	if ( 'daofactory_pro' === $post->post_type ) {
		unset( $actions['inline hide-if-no-js'] );
	}
	return $actions;
}
add_filter( 'post_row_actions', 'daofactory_pro_remove_quick_edit', 10, 2 );
