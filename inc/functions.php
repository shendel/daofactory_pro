<?php
function daofactory_pro_get_data($dao_id) {
  $daoinfo = array();
  foreach( array(
    'blockchain'        => 'bsc_mainnet',
    'token'             => '',
    'token_name'        => '',
    'token_symbol'      => '',
    'token_decimals'    => '',
    'hide_footer_header'=> 'true',
    'hide_service_link' => 'false',
    'theme'             => 'light',
    'strategy'          => '0',
    'required_amount_to_publish' => '5',
    'required_amount_to_vote' => '1',
  ) as $key => $default) {
    $data = get_post_meta( $dao_id, $key, true);
    if ( empty( $data ) ) $data = $default;
    $daoinfo[ $key ] = $data;
  }
  return $daoinfo;
}


function daofactory_pro_prepare_vendor() {
  $version = (DAOFACTORY_PRO_VER) ? DAOFACTORY_PRO_VER : 'no';
  $SEP = DIRECTORY_SEPARATOR;

  $cache_dir = DAOFACTORY_PRO_BASE_DIR .  $SEP . 'vendor' . $SEP . DAOFACTORY_PRO_VER . $SEP;
  $vendor_source = DAOFACTORY_PRO_BASE_DIR .  $SEP . 'vendor_source' . $SEP . 'static' . $SEP . 'js' . $SEP;

  if (!file_exists($cache_dir)) {
    $js_files = scandir($vendor_source);
    if (!file_exists($cache_dir)) mkdir($cache_dir, 0777);
    foreach ($js_files as $k => $file) {
      if (is_file($vendor_source . $file)) {
        $filename = basename($file);
        $file_ext = explode(".", $filename);
        $file_ext = strtoupper($file_ext[count($file_ext)-1]);
        if ($file_ext === 'JS') {
          $source = file_get_contents($vendor_source . $filename);
          $count_replace = 0;
          
          $rep_from = array(
            '{VENDOR_SOURCE}'
          ); 
          $rep_to = array(
            DAOFACTORY_PRO_URL . 'vendor_source/static/js/../../'
          );
          $modified = str_replace(
            $rep_from,
            $rep_to,
            $source,
            $count_replace
          );

          file_put_contents($cache_dir . $filename, $modified);
          chmod($cache_dir . $filename, 0777);
        }
      }
    }
  }
}

function daofactory_pro_get_html($dao_id) {
  daofactory_pro_prepare_vendor();
  $daoinfo = daofactory_pro_get_data( $dao_id );
  
  $daofactory_pro_backend_type = get_option('daofactory_pro_backend_type', 'DEFAULT');
  $daofactory_pro_backend = get_option('daofactory_pro_backend','');
  $daofactory_pro_space_type = get_option('daofactory_pro_space_type', 'DEFAULT');
  $daofactory_pro_space = get_option('daofactory_pro_space', '');
  $daofactory_pro_infurakey = get_option('daofactory_pro_infurakey', '');
  $daofactory_pro_wc2_enabled = get_option('daofactory_pro_wc2_enabled', 'false');
  $daofactory_pro_wc2_pr_id = get_option('daofactory_pro_wc2_pr_id', '');
  $daofactory_pro_coinbase_enabled = get_option('daofactory_pro_coinbase_enabled', 'false');
  
  
  $ens = ($daofactory_pro_space_type == 'DEFAULT')
    ? 'onout.eth'
    : $daofactory_pro_space;
      

  $html = '
    <div
    id="daofactory_pro_app"
    data-ens="' . esc_attr($ens) . '"
    data-network="' . esc_attr(daofactory_pro_blockchains()[$daoinfo['blockchain']]['chainId']) . '"
    data-token-address="' . esc_attr($daoinfo['token']) . '"
    data-token-symbol="' . esc_attr($daoinfo['token_symbol']) . '"
    data-token-decimals="' . esc_attr($daoinfo['token_decimals']) . '"
    data-color-template="' . esc_attr($daoinfo['theme']) . '_template"
    data-hide-service-link="' . esc_attr($daoinfo['hide_service_link']) . '"
    data-required-amount-to-publish="' . esc_attr($daoinfo['required_amount_to_publish']) . '"
    data-required-amount-to-vote="' . esc_attr($daoinfo['required_amount_to_vote']) . '"
    data-strategy="' . esc_attr($daoinfo['strategy']) . '"
    data-snapshothub="' .esc_attr(($daofactory_pro_backend_type == 'DEFAULT') ? 'https://snapshothub.onout.org' : $daofactory_pro_backend) . '"
    data-wallet-wc2="' . (($daofactory_pro_wc2_enabled == 'true') ? '1' : '0') . '"
    data-wcv2-project-id="' . (($daofactory_pro_wc2_enabled == 'true') ? esc_attr($daofactory_pro_wc2_pr_id) : '') . '"
    data-wallet-coinbase="' . (($daofactory_pro_coinbase_enabled == 'true') ? '1' : '0') . '"
    data-infura-key="' . esc_attr($daofactory_pro_infurakey) . '"
    ></div>
  ';
  return $html;
}


function daofactory_pro_blockchains() {
  return array(
    'bsc_testnet' => array(
      'chainId'   => 97,
      'rpc'       => 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      'title'     => 'Binance Block Chain - Testnet',
      'etherscan' => 'https://testnet.bscscan.com'
    ),
    'bsc_mainnet' => array(
      'chainId'   => 56,
      'rpc'       => 'https://bsc-dataseed.binance.org/',
      'title'     => 'Binance Smart Chain',
      'etherscan' => 'https://bscscan.com'
    ),
    'matic_testnet' => array(
      'chainId'   => 80001,
      'rpc'       => 'https://rpc-mumbai.maticvigil.com',
      'title'     => 'Polygon Matic - Testnet (mumbai)',
      'etherscan' => 'https://mumbai.polygonscan.com'
    ),
    'matic_mainnet' => array(
      'chainId'   => 137,
      'rpc'       => 'https://rpc-mainnet.maticvigil.com',
      'title'     => 'Polygon Matic',
      'etherscan' => 'https://polygonscan.com'
    ),
    'eth_rinkeby'   => array(
      'chainId'   => 4,
      'rpc'       => 'https://rinkeby.infura.io/v3/5ffc47f65c4042ce847ef66a3fa70d4c',
      'title'     => 'Ethereum - Testnet (Rinkeby)',
      'etherscan' => 'https://rinkeby.etherscan.io'
    ),
    'eth_goerli'   => array(
      'chainId'   => 5,
      'rpc'       => 'https://goerli.infura.io/v3/5ffc47f65c4042ce847ef66a3fa70d4c',
      'title'     => 'Ethereum - Testnet (goerli)',
      'etherscan' => 'https://goerli.etherscan.io'
    ),
    'eth_mainnet'   => array(
      'chainId'   => 1,
      'rpc'       => 'https://mainnet.infura.io/v3/5ffc47f65c4042ce847ef66a3fa70d4c',
      'title'     => 'Ethereum',
      'etherscan' => 'https://etherscan.io'
    ),
    'arbeth_testnet' => array(
      'chainId'   => 421611,
      'rpc'       => 'https://rinkeby.arbitrum.io/rpc',
      'title'     => 'Arbitrum Testnet (Rinkeby)',
      'etherscan' => 'https://testnet.arbiscan.io'
    ),
    'arbeth_mainnet' => array(
      'chainId'   => 42161,
      'rpc'       => 'https://arb1.arbitrum.io/rpc',
      'title'     => 'Arbitrum',
      'etherscan' => 'https://arbiscan.io'
    ),
    'xdai_testnet' => array(
      'chainId'   => 77,
      'rpc'       => 'https://sokol.poa.network',
      'title'     => 'DAI Testnet (Sokol)',
      'etherscan' => 'https://blockscout.com/poa/sokol'
    ),
    'xdai_mainnet' => array(
      'chainId'   => 100,
      'rpc'       => 'https://rpc.gnosischain.com',
      'title'     => 'Gnosis (xDai)',
      'etherscan' => 'https://blockscout.com/xdai/mainnet'
    )
  );
}

function daofactory_pro_admin_scripts( $hook ) {

	global $typenow;

	if ( 'post-new.php' === $hook || 'post.php' === $hook || 'toplevel_page_DAOFACTORY_PRO' === $hook ) {
		if ( 'toplevel_page_DAOFACTORY_PRO' === $hook || 'daofactory_pro' === $typenow ) {

			wp_enqueue_style( 'daofactory-pro-admin', DAOFACTORY_PRO_URL . 'assets/css/daofactory-admin.css', false, DAOFACTORY_PRO_VER );
      wp_enqueue_script( 'daofactory-pro-tokeninfo', DAOFACTORY_PRO_URL . 'assets/js/tokenInfo.js', array(), DAOFACTORY_PRO_VER );
      wp_enqueue_script( 'daofactory-pro-admin', DAOFACTORY_PRO_URL . 'assets/js/daofactory-admin.js', array(), DAOFACTORY_PRO_VER, true );

			$ver = wp_rand( 1, 2222222 );

      wp_localize_script('daofactory-pro-admin', 'daofactory_pro',
        array(
          'ajaxurl' => admin_url( 'admin-ajax.php' ),
          'nonce'   => wp_create_nonce( 'daofactory-pro-nonce' ),
        )
      );
		}
	}

}
add_action( 'admin_enqueue_scripts', 'daofactory_pro_admin_scripts' );

function daofactory_pro_save_settings() {
	/* Check nonce */
	check_ajax_referer( 'daofactory_pro_settings_action', 'daofactory_pro_settings_action_nonce' );
  // backend
  if ($_POST['daofactory_pro_backend_type'] == 'DEFAULT') {
    update_option('daofactory_pro_backend_type', 'DEFAULT');
  } else {
    update_option('daofactory_pro_backend_type', 'CUSTOM');
    update_option('daofactory_pro_backend', sanitize_text_field($_POST['daofactory_pro_backend']));
  }
  // space
  if ($_POST['daofactory_pro_space_type'] == 'DEFAULT') {
    update_option('daofactory_pro_space_type', 'DEFAULT');
  } else {
    update_option('daofactory_pro_space_type', 'CUSTOM');
    update_option('daofactory_pro_space', sanitize_text_field($_POST['daofactory_pro_space']));
  }
  
  update_option('daofactory_pro_infurakey', sanitize_text_field($_POST['daofactory_pro_infurakey']));
  
  if ($_POST['daofactory_pro_wc2_enabled'] == 'true') {
    update_option('daofactory_pro_wc2_enabled', 'true');
    update_option('daofactory_pro_wc2_pr_id', sanitize_text_field($_POST['daofactory_pro_wc2_pr_id']));
  } else {
    update_option('daofactory_pro_wc2_enabled', 'false');
  }
  
  if ($_POST['daofactory_pro_coinbase_enabled'] == 'true') {
    update_option('daofactory_pro_coinbase_enabled', 'true');
  } else {
    update_option('daofactory_pro_coinbase_enabled', 'false');
  }
}

add_action( 'wp_ajax_daofactory_pro_save_settings', 'daofactory_pro_save_settings' );

function daofactory_pro_default_header($daoinfo) {
  ?>
  <!DOCTYPE html>
  <html class="no-js" <?php language_attributes(); ?>>
    <head>
      <meta charset="<?php bloginfo( 'charset' ); ?>">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" >
      <link rel="profile" href="https://gmpg.org/xfn/11">
      <title><?php echo wp_get_document_title(); ?></title>
      <?php
        if (function_exists( 'wp_robots_sensitive_page' )) {
          // wp_robots_sensitive_page(); // @To-Do need params
        } else {
          wp_sensitive_page_meta();
        }
      ?>
      <style type="text/css">
        HTML, BODY {
          margin: 0;
          padding: 0;
          <?php if ($daoinfo['theme'] === 'dark' ) { ?>
          background: #282c34;
          <?php } ?>
        }
      </style>
    </head>
    <body>
  <?php
}

function daofactory_pro_default_footer($daoinfo) {
  ?>
      <link media="all" rel="stylesheet" href="<?php echo DAOFACTORY_PRO_URL ?>build/static/css/main.css?ver=<?php echo DAOFACTORY_PRO_VER?>" />
      <!--<script src="<?php echo DAOFACTORY_PRO_URL ?>build/static/js/main.js?ver=<?php echo DAOFACTORY_PRO_VER?>"></script>-->
      <script src="<?php echo DAOFACTORY_PRO_URL ?>vendor/<?php echo DAOFACTORY_PRO_VER ?>/main.js?ver=<?php echo DAOFACTORY_PRO_VER?>"></script>
    </body>
  </html>
  <?php
}
?>