import {
  NETWORK_RPC_URLS,
  NETWORK_EXPLORER_URLS,
  NETWORK_NATIVE_CURRENCY,
  NETWORK_NAME,
} from '../helpers/constants'

import initConfig from '../helpers/config'


initConfig()

export const INPUT_CHAIN_ID = window.NETWORK_ID
// @ts-ignore
export const INPUT_CHAIN_URL = NETWORK_RPC_URLS[window.NETWORK_ID]

export const CHAIN_TO_URL_MAP = {
  // @ts-ignore
  [window.NETWORK_ID]: NETWORK_RPC_URLS[window.NETWORK_ID],
}

type ChainInfo = {
  explorer: string
  label: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: 18
  }
  rpcUrl: string
}

export const CHAIN_INFO: { [key: string]: ChainInfo } = {
  [`${window.NETWORK_ID}`]: {
    // @ts-ignore
    explorer: NETWORK_EXPLORER_URLS[window.NETWORK_ID],
    // @ts-ignore
    label: NETWORK_NAME[window.NETWORK_ID],
    // @ts-ignore
    nativeCurrency: NETWORK_NATIVE_CURRENCY[window.NETWORK_ID],
    // @ts-ignore
    rpcUrl: NETWORK_RPC_URLS[window.NETWORK_ID],
  }
}

// URLs
export const METAMASK_URL = 'https://metamask.io/'
