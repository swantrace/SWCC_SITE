<?php get_header(); ?>
<template id="navigation">
  <?php the_posts_pagination( array(
    'mid_size'  => 2,
    'prev_text' => __( 'Back', 'swcc_setup' ),
    'next_text' => __( 'Onward', 'swcc_setup' ),
) ); ?>
</template>
<main 
  class="search-result-page"
  is="swcc-main" 
  page-type="searchPage" 
  page-id="<?= the_ID(); ?>"
  page-number="<?= $paged ?>"
  page-term-name="<?= $s ?>" 
></main>
<?php get_footer(); ?>
