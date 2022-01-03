<!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <script src="//unpkg.com/@ungap/custom-elements"></script>
	<style>
		.skiptranslate{
			display: none;
		}
	</style>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<link rel="stylesheet" media="print" 
		href="<?= get_stylesheet_directory_uri() . "/style.css"?>" 
		onload="this.onload=null; this.removeAttribute('media')">
	<link rel="stylesheet" media="print" 
		href="<?= get_stylesheet_directory_uri() . "/assets/bundled.min.css"?>"  
		onload="this.onload=null; this.removeAttribute('media')">
	<script defer src="<?= get_stylesheet_directory_uri() . "/assets/bundled.min.js?v=" . date("Y-m-d") ?>"></script>
	<script type="text/javascript">
		function googleTranslateElementInit2() {
			new google.translate.TranslateElement(
				{ pageLanguage: "en", autoDisplay: false },
				"google_translate_element2"
			);
		}
	</script>
	<script type="text/javascript">
		function GTranslateGetCurrentLang() {
				var keyValue = document['cookie'].match('(^|;) ?googtrans=([^;]*)(;|$)');
				return keyValue ? keyValue[2].split('/')[2] : null;
		}
		function GTranslateFireEvent(element, event) {
				try {
						if (document.createEventObject) {
								var evt = document.createEventObject();
								element.fireEvent('on' + event, evt)
						} else {
								var evt = document.createEvent('HTMLEvents');
								evt.initEvent(event, true, true);
								element.dispatchEvent(evt)
						}
				} catch (e) {}
		}
		function doGTranslate(lang_pair) {
				if (lang_pair.value)
						lang_pair = lang_pair.value;
				if (lang_pair == '')
						return;
				var lang = lang_pair.split('|')[1];
				if (GTranslateGetCurrentLang() == null && lang == lang_pair.split('|')[0])
						return;
				if (typeof ga != 'undefined') {
						ga('send', 'event', 'GTranslate', lang, location.hostname + location.pathname + location.search);
				} else {
						if (typeof _gaq != 'undefined')
								_gaq.push(['_trackEvent', 'GTranslate', lang, location.hostname + location.pathname + location.search]);
				}
				var teCombo;
				var sel = document.getElementsByTagName('select');
				for (var i = 0; i < sel.length; i++)
						if (/goog-te-combo/.test(sel[i].className)) {
								teCombo = sel[i];
								break;
						}
				if (document.getElementById('google_translate_element2') == null || document.getElementById('google_translate_element2').innerHTML.length == 0 || teCombo.length == 0 || teCombo.innerHTML.length == 0) {
						setTimeout(function() {
								doGTranslate(lang_pair)
						}, 500)
				} else {
						teCombo.value = lang;
						GTranslateFireEvent(teCombo, 'change');
						GTranslateFireEvent(teCombo, 'change')
				}
		}
	</script>
	<?php wp_head(); ?>
</head>

<body id="page-body" <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="wrapper" class="mx-auto shadow">
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'swcc' ); ?></a>
	<header menu-id="<?php global $primary_menu_ID; echo $primary_menu_ID; ?>" is="swcc-header"></header>
