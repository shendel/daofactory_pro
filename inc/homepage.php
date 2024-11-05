<?php
  $daoinfo = daofactory_pro_get_data(get_option( 'daofactory_pro_id_at_homepage', 'false'));

  if ($daoinfo['hide_footer_header'] === 'true') {
    daofactory_pro_default_header($daoinfo);
  } else {
    get_header();
  }

  wp_enqueue_script("daofactory-pro-app", DAOFACTORY_PRO_VER, true);
  wp_enqueue_style("daofactory-pro-app");

  $html = '
    <div
      id="daofactory_pro_app"
      data-ens="' . esc_attr('onout.eth') . '"
      data-network="' . esc_attr(daofactory_blockchains()[$daoinfo['blockchain']]['chainId']) . '"
      data-token-address="' . esc_attr($daoinfo['token']) . '"
      data-token-symbol="' . esc_attr($daoinfo['token_symbol']) . '"
      data-token-decimals="' . esc_attr($daoinfo['token_decimals']) . '"
      data-color-template="' . esc_attr($daoinfo['theme']) . '_template"
      data-hide-service-link="' . esc_attr($daoinfo['hide_service_link']) . '"
      data-required-amount-to-publish="' . esc_attr($daoinfo['required_amount_to_publish']) . '"
      data-required-amount-to-vote="' . esc_attr($daoinfo['required_amount_to_vote']) . '"
    ></div>
  ';
  echo $html;

  if ($daoinfo['hide_footer_header'] === 'true') {
    daofactory_pro_default_footer($daoinfo);
  } else {
    get_footer();
  }
?>