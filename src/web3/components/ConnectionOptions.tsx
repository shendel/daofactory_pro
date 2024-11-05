import React from 'react'

import { ConnectionType, getHasMetaMaskExtensionInstalled } from '../connections'
import { METAMASK_URL } from '../constants'
import { Option } from './Option'

type ConnectOptionsParams = {
  activeConnectionType: ConnectionType | null
  isConnectionActive: boolean
  onActivate: (connectionType: ConnectionType) => void
  onDeactivate: (connectionType: null) => void
  onError: (error: any) => void
}

export const ConnectionOptions = ({
  activeConnectionType,
  isConnectionActive,
  onActivate,
  onDeactivate,
  onError,
}: ConnectOptionsParams) => {
  function getOptions(isActive: boolean) {
    const hasMetaMaskExtension = getHasMetaMaskExtensionInstalled()

    const isNoOptionActive = !isActive || (isActive && activeConnectionType === null)

    const metaMaskOption = hasMetaMaskExtension ? (
      <Option
        isEnabled={isNoOptionActive || activeConnectionType === ConnectionType.INJECTED}
        isConnected={activeConnectionType === ConnectionType.INJECTED}
        connectionType={ConnectionType.INJECTED}
        onActivate={onActivate}
        onError={onError}
        onDeactivate={onDeactivate}
      />
    ) : (
      <a href={METAMASK_URL}>
        <button className="secondaryButton alingItemsCenter">Install Metamask</button>
      </a>
    )

    const coinbaseWalletOption = (
      <Option
        isEnabled={isNoOptionActive || activeConnectionType === ConnectionType.COINBASE_WALLET}
        isConnected={activeConnectionType === ConnectionType.COINBASE_WALLET}
        connectionType={ConnectionType.COINBASE_WALLET}
        onActivate={onActivate}
        onError={onError}
        onDeactivate={onDeactivate}
      />
    )

    const walletConnectOption = (
      <Option
        isEnabled={isNoOptionActive || activeConnectionType === ConnectionType.WALLET_CONNECT}
        isConnected={activeConnectionType === ConnectionType.WALLET_CONNECT}
        connectionType={ConnectionType.WALLET_CONNECT}
        onActivate={onActivate}
        onError={onError}
        onDeactivate={onDeactivate}
      />
    )
    
    const gnosissafeConnectOption = (
      <Option
        isEnabled={isNoOptionActive || activeConnectionType === ConnectionType.GNOSIS_SAFE}
        isConnected={activeConnectionType === ConnectionType.GNOSIS_SAFE}
        connectionType={ConnectionType.GNOSIS_SAFE}
        onActivate={onActivate}
        onError={onError}
        onDeactivate={onDeactivate}
      />
    )


    return (
      <>
        {metaMaskOption}
        {window.WALLET_COINBASE == 1 && coinbaseWalletOption}
        {window.WALLET_WC2 == 1 && walletConnectOption}
        {window.WALLET_GNOSIS == 1 && gnosissafeConnectOption}
      </>
    )
  }

  return <div className="connectors">{getOptions(isConnectionActive)}</div>
}
