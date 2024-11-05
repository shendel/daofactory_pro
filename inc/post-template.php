<?php
  $daoinfo = daofactory_pro_get_data(get_the_ID());

  if ($daoinfo['hide_footer_header'] === 'true') {
    daofactory_pro_default_header($daoinfo);
  } else {
    get_header();
  }

  wp_enqueue_script("daofactory-pro-app", DAOFACTORY_PRO_VER, true);
  wp_enqueue_style("daofactory-pro-app");

  $html = daofactory_pro_get_html( get_the_ID() );

  echo $html;

  if ($daoinfo['hide_footer_header'] === 'true') {
    daofactory_pro_default_footer($daoinfo);
  } else {
    get_footer();
  }
?>