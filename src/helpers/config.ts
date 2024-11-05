const initAppConfig = () => {
  const appElement = document.getElementById("daofactory_pro_app")

  window.TIME_ZONE_CUSTOM = appElement?.getAttribute("data-timezone-custom") || false;
  window.TIME_ZONE = appElement?.getAttribute("data-timezone") || Intl.DateTimeFormat().resolvedOptions().timeZone;
  window.TIME_ZONE_ADD = appElement?.getAttribute("data-timezone-add") || "";
  window.TIME_ZONE_LOCALE = appElement?.getAttribute("data-timezone-locale") || "en";
  window.SNAPSHOTHUB = appElement?.getAttribute("data-snapshothub") || "http://localhost:3500" // "https://snapshothub.onout.org";
  window.ENS_DOMAIN = appElement?.getAttribute("data-ens") || "eneeseene.test"; //"onout.eth";
  window.NETWORK_ID = appElement?.getAttribute("data-network") || "1"; //"11155111";
  window.TOKEN_ADDRESS =
    appElement?.getAttribute("data-token-address") ||
    "0xe49Cb97091b5bDe1E8B7043e3D5717E64fDE825e" // "0x2f87D23cd8d788bC9a32E540cdd8253F9b1F54CF";

  window.TOKEN_SYMBOL = appElement?.getAttribute("data-token-symbol") || "KUNU" //"WEENUS";

  window.TOKEN_DECIMALS = appElement?.getAttribute("data-token-decimals") || "9" // "18";

  window.COLOR_TEMPLATE =
    appElement?.getAttribute("data-color-template") || "light_template";

  window.HIDE_SERVICE_LINK = appElement?.getAttribute("data-hide-service-link") === 'true';
  window.REQUIRED_AMOUNT_TO_PUBLISH = appElement?.getAttribute("data-required-amount-to-publish") || 5;
  window.REQUIRED_AMOUNT_TO_VOTE = appElement?.getAttribute("data-required-amount-to-vote") || 1;
  window.WCV2_PROJECT_ID = appElement?.getAttribute('data-wcv2-project-id') || 'acd63f90e358dc98bb85d42a708283fd';

  window.ALLOW_WHITE_LIST = appElement?.getAttribute('data-allow-whitelist') || 0;
  
  window.SNAPSHOTHUB = appElement?.getAttribute("data-snapshothub") || "http://localhost:3500"; //  "https://snapshothub.onout.org"; // "https://snapshothub.onout.org";
  
  window.INFURA_KEY = appElement?.getAttribute("data-infura-key") || "5ffc47f65c4042ce847ef66a3fa70d4c"

  window.WALLET_COINBASE = Number(appElement?.getAttribute('data-wallet-coinbase')) || 0;
  window.WALLET_WC2 = Number(appElement?.getAttribute('data-wallet-wc2')) || 0
  window.WALLET_GNOSIS = Number(appElement?.getAttribute('data-wallet-gnosis')) || 0

  // 0 - with power (erc20-balance-of)
  // 1 - without power (erc20-with-balance)
  window.VOTE_STRATEGY = Number(appElement?.getAttribute('data-strategy')) || 0
    
}

export default initAppConfig