<?php get_header(); ?>
<template id="navigation">
  <?php the_posts_pagination( array(
    'mid_size'  => 2,
    'prev_text' => __( 'Back', 'swcc_setup' ),
    'next_text' => __( 'Onward', 'swcc_setup' ),
) ); ?>
</template>
<main 
  class="archive-page"
  is="swcc-main"
  page-type="<?php if ((get_queried_object()->taxonomy) == "category"){ echo "categoryPage"; } elseif ((get_queried_object()->taxonomy) == "post_tag") { echo "tagPage"; } else { echo "archivePage"; } ?>"
  page-id="<?= the_ID(); ?>"
  page-number="<?= $paged ?>"
  page-term-id="<?=  get_queried_object()->term_id ?>"
  page-term-name="<?=  get_queried_object()->name ?>"  
>
</main>
<?php get_footer(); ?>
