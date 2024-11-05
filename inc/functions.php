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
function daofactory_pro_get_html($dao_id) {
  $daoinfo = daofactory_pro_get_data( $dao_id );
  $html = '
    <div
    id="daofactory_pro_app"
    data-ens="' . esc_attr('onout.eth') . '"
    data-network="' . esc_attr(daofactory_pro_blockchains()[$daoinfo['blockchain']]['chainId']) . '"
    data-token-address="' . esc_attr($daoinfo['token']) . '"
    data-token-symbol="' . esc_attr($daoinfo['token_symbol']) . '"
    data-token-decimals="' . esc_attr($daoinfo['token_decimals']) . '"
    data-color-template="' . esc_attr($daoinfo['theme']) . '_template"
    data-hide-service-link="' . esc_attr($daoinfo['hide_service_link']) . '"
    data-required-amount-to-publish="' . esc_attr($daoinfo['required_amount_to_publish']) . '"
    data-required-amount-to-vote="' . esc_attr($daoinfo['required_amount_to_vote']) . '"
    data-strategy="' . esc_attr($daoinfo['strategy']) . '"
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
      <script src="<?php echo DAOFACTORY_PRO_URL ?>build/static/js/main.js?ver=<?php echo DAOFACTORY_PRO_VER?>"></script>
    </body>
  </html>
  <?php
}
?>