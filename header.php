<!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <script src="//unpkg.com/@ungap/custom-elements"></script>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<link rel="stylesheet" media="print" 
		href="<?= get_stylesheet_directory_uri() . "/style.css"?>" 
		onload="this.onload=null; this.removeAttribute('media')">
	<link rel="stylesheet" media="print" 
		href="<?= get_stylesheet_directory_uri() . "/assets/bundled.min.css"?>"  
		onload="this.onload=null; this.removeAttribute('media')">
	<script defer src="<?= get_stylesheet_directory_uri() . "/assets/bundled.min.js" ?>"></script>
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="wrapper" class="mx-auto shadow">
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'swcc' ); ?></a>
	<header menu-id="<?php global $primary_menu_ID; echo $primary_menu_ID; ?>" is="swcc-header"></header>
