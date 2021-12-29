<?php get_header(); ?>
<template id="navigation">
<?php while(have_posts()): the_post(); ?>
<span id="previous_post_link"><?php previous_post_link(); ?></span>
<span id="next_post_link"><?php next_post_link(); ?></span>
<?php endwhile; ?>
</template>
<main 
  class="static-page"
  is="swcc-main" 
  page-type="staticPage" 
  page-id="<?= the_ID(); ?>"
></main>
<?php get_footer(); ?>
