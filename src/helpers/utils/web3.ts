import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { AbiItem } from "web3-utils";

import networksSettings from "src/assets/json/networksSettings.json";
import ABI_ERC20 from 'src/assets/json/abi-erc20.json';


import { ReactComponent as iconMetamask } from "src/assets/svg/metamask.svg";
import { ReactComponent as iconWalletConnect } from "src/assets/svg/walletconnect.svg";
import { ReactComponent as iconTrustWallet } from "src/assets/svg/trust.svg";
import { ReactComponent as iconOpera } from "src/assets/svg/opera.svg";
import { ReactComponent as iconDefault } from "src/assets/svg/unknown.svg";
import { ReactComponent as iconCoinBase } from "src/assets/svg/coinbase.svg";
import { ReactComponent as iconGnosisSafe } from "src/assets/svg/gnosissafe.svg";

import { ConnectionType } from "src/web3/connections"

const ERC20ABI = ABI_ERC20 as AbiItem[];


const INJECTED_TYPE = {
  NONE: 'NONE',
  UNKNOWN: 'UNKNOWN',
  OPERA: 'OPERA',
  METAMASK: 'METAMASK',
  TRUST: 'TRUST',
};

type INJECTED_STRING = 'NONE' | 'UNKNOWN' | 'OPERA' | 'METAMASK' | 'TRUST';


type NetworkSettings = {
  key: string;
  name: string;
  chainId: number;
  network: string;
  multicall: string;
  rpc: string[];
  explorer: string;
  ensResolver?: string;
  ws?: string[];
  shortName?: string;
  testnet?: boolean;
};

type NetworksSettings = {
  [key: string]: NetworkSettings;
};

type Providers = {
  [key: string]: StaticJsonRpcProvider;
};

const networks = networksSettings as NetworksSettings;
const providers = {} as Providers;

export async function getBlockNumber(provider: StaticJsonRpcProvider) {
  try {
    const blockNumber = await provider.getBlockNumber();
    return blockNumber;
  } catch (e) {
    return Promise.reject();
  }
}

export function getProvider(network: string) {
  const url: string = networks[network].rpc[0];
  if (!providers[network]) providers[network] = new StaticJsonRpcProvider(url);

  return providers[network];
}

export function getERC20Contract(tokenAddress: string, from: string, web3: any) {
  return web3 && from
    ? new web3.eth.Contract(ERC20ABI, tokenAddress, {
        from,
      })
    : null
}


export function getInjectedType() {
  if (window?.ethereum) {
    if (window.ethereum.isTrust) return INJECTED_TYPE.TRUST
    if (window.ethereum.isMetaMask) return INJECTED_TYPE.METAMASK
    if (!!window.opr?.addons || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) return INJECTED_TYPE.OPERA

    return INJECTED_TYPE.UNKNOWN
  }
  return INJECTED_TYPE.NONE

}

export function getInjectedTitle() {
  switch (getInjectedType()) {
    case INJECTED_TYPE.NONE: return 'Not installed'
    case INJECTED_TYPE.UNKNOWN: return 'Injected Web3'
    case INJECTED_TYPE.OPERA: return 'Opera Crypto Wallet'
    case INJECTED_TYPE.METAMASK: return 'MetaMask'
    case INJECTED_TYPE.TRUST: return 'Trust Wallet'
    default: return 'Not installed'
  }
}

export function getConnectorName(connectorType: ConnectionType) {
  switch (connectorType) {
    case 'INJECTED':
      return getInjectedTitle()
    case 'WALLET_CONNECT':
      return `WalletConnect`
    case 'COINBASE_WALLET':
      return 'Coin Base'
    case 'GNOSIS_SAFE':
      return 'Gnosis Safe'
    default:
      return `Unknown WEB3 Provider`
  }
}

const web3Icons = {
  METAMASK: iconMetamask,
  TRUST: iconTrustWallet,
  OPERA: iconOpera,
  NONE: iconDefault,
  UNKNOWN: iconDefault,
  WALLET_CONNECT: iconWalletConnect,
  COINBASE_WALLET: iconCoinBase,
  GNOSIS_SAFE: iconGnosisSafe,
}

export type ConnectorNames = "Injected" // | "WalletConnect";

export enum EConnectorNames {
  Injected = "Injected",
  //WalletConnect = "WalletConnect",
}

export const getConnectorsByName = (chainId?: number) => ({
  [EConnectorNames.Injected]: null, //injected,
  // [EConnectorNames.WalletConnect]: getWalletconnectConnector(chainId),
});

export function getWeb3Icon(connectorName: ConnectionType): any {
  if (connectorName == 'INJECTED') {
    // @ts-ignore
    return web3Icons[getInjectedType()]
  } else {
    switch (connectorName) {
      case 'WALLET_CONNECT':
        return web3Icons.WALLET_CONNECT
      case 'COINBASE_WALLET':
        return web3Icons.COINBASE_WALLET
      case 'GNOSIS_SAFE':
        return web3Icons.GNOSIS_SAFE
      default:
        return web3Icons.UNKNOWN
    }
  }
}


export default {
  getBlockNumber,
  getProvider,
  getInjectedType,
  getInjectedTitle,
  getERC20Contract,
};
