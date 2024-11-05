import { initializeConnector } from '@web3-react/core'
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'
import initAppConfig from 'src/helpers/config'
import { Connection, ConnectionType, onConnectionError } from '../connections'

export function buildWalletConnectConnector() {
  initAppConfig()
  const prId = window.WCV2_PROJECT_ID
  const chId = window.NETWORK_ID

  const [web3WalletConnect, web3WalletConnectHooks] = initializeConnector<WalletConnectV2>(
    (actions) =>
      new WalletConnectV2({
        actions,
        options: {
          projectId: prId,
          chains: [ Number(chId) ],
          optionalChains: [],
          showQrModal: true
        },
      })
  )
  const walletConnectConnection: Connection = {
    connector: web3WalletConnect,
    hooks: web3WalletConnectHooks,
    type: ConnectionType.WALLET_CONNECT,
  }
  return walletConnectConnection
}
