export {};

declare global {
  interface Window {
    TIME_ZONE_CUSTOM: any
    TIME_ZONE: any
    TIME_ZONE_ADD: any
    TIME_ZONE_LOCALE: any
    SNAPSHOTHUB: any
    ENS_DOMAIN: any
    NETWORK_ID: any
    TOKEN_ADDRESS: any
    TOKEN_SYMBOL: any
    TOKEN_DECIMALS: any
    COLOR_TEMPLATE: any
    HIDE_SERVICE_LINK: any
    REQUIRED_AMOUNT_TO_PUBLISH: any
    REQUIRED_AMOUNT_TO_VOTE: any
    ALLOW_WHITE_LIST: any
    WCV2_PROJECT_ID: any

    TRANSLATE: any
    
    INFURA_KEY: any
    
    WALLET_COINBASE: any
    WALLET_WC2: any
    WALLET_GNOSIS: any
    
    VOTE_STRATEGY: number
    
    opr: any
    opera: any
  }
  
  interface IUniversalObj {
    [key: string]: any;
  }
}
