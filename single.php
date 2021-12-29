<?php get_header(); ?>
<template id="navigation">
<?php while(have_posts()): the_post(); ?>
<span id="previous_post_link"><?php previous_post_link(); ?></span>
<span id="next_post_link"><?php next_post_link(); ?></span>
<?php endwhile; ?>
</template>
<main 
  class="single-post-page" 
  is="swcc-main" 
  page-type="singlePostPage" 
  page-id="<?= the_ID(); ?>"
></main>
<?php get_footer(); ?>
