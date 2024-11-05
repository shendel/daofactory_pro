import { Web3ReactProvider } from '@web3-react/core'
import { Connector } from '@web3-react/types'
import React, { ReactNode, useEffect } from 'react'

import { ConnectionType, getConnection, PRIORITIZED_CONNECTORS } from '../connections'

async function connect(connector: Connector) {
  try {
    if (connector.connectEagerly) {
      await connector.connectEagerly()
    } else {
      await connector.activate()
    }
  } catch (error) {
    console.debug(`web3-react eager connection error: ${error}`)
  }
}

const tryConnectEagerly = async (connectionType: ConnectionType) => {
  try {
    await connect(getConnection(connectionType).connector)
  } catch (err) {
    console.log('>>> Fail eageryl connect', connectionType)
  }
}
const connectEagerly = async () => {
  await tryConnectEagerly(ConnectionType.INJECTED)
  await tryConnectEagerly(ConnectionType.COINBASE_WALLET)
  //await tryConnectEagerly(ConnectionType.GNOSIS_SAFE)
  await tryConnectEagerly(ConnectionType.WALLET_CONNECT)
}

export const Web3ContextProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    connectEagerly()
  }, [])

  return (
    <Web3ReactProvider
      connectors={Object.values(PRIORITIZED_CONNECTORS).map((connector) => [connector.connector, connector.hooks])}
    >
      {children}
    </Web3ReactProvider>
  )
}
