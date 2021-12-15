<?php
if ( ! function_exists( 'get_menu' )):
	function get_menu($data) {
		$menuID = $data->get_param( 'id' );
		if($menuID != NULL){
			$menu_object = wp_get_nav_menu_items($menuID);
			$menu_associative_array = json_decode(json_encode($menu_object), true);
			return $menu_associative_array;
		} else {
			return get_nav_menu_locations();
		}
	}
endif;

if ( ! function_exists( 'swcc_setup' ) ) :
	function swcc_setup() {
		add_theme_support( 'automatic-feed-links' );
		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );

		register_nav_menus(
			array(
				'menu-1' => esc_html__( 'Primary', 'swcc' ),
			)
		);

		
		add_action('rest_api_init', function() {
			register_rest_route( 'wp/v2', '/menus', array(
				'methods' => 'GET',
				'callback' => 'get_menu'
			));
		});
		
		
		
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
				)
			);
			
			function swcc_widgets_init() {
				
				register_sidebar(
					array(
						'name'          => esc_html__( 'Footer', 'swcc' ),
						'id'            => 'sidebar-1',
						'description'   => esc_html__( 'Add widgets here to appear in your footer.', 'swcc' ),
						'before_widget' => '',
						'after_widget'  => '',
						'before_title'  => '',
						'after_title'   => '',
						'show_in_rest' =>  true,
						)
					);
				}
				add_action( 'widgets_init', 'swcc_widgets_init' );
				$menuLocations = get_nav_menu_locations(); 
				global $primary_menu_ID;
				$primary_menu_ID = $menuLocations['menu-1']; 
				global $footer_sidebar_ID;
				$footer_sidebar_ID = 'sidebar-1';
			}
endif;
add_action( 'after_setup_theme', 'swcc_setup' );


