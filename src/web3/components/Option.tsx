import React from 'react'
import { useEffect, useState } from "react"
import Spinner from "src/components/Spinner";

import { ConnectionType, getConnection, tryActivateConnector, tryDeactivateConnector } from '../connections'
import { getConnectorName, getWeb3Icon } from "src/helpers/utils/web3";

export const Option = ({
  isEnabled,
  isConnected,
  connectionType,
  onActivate,
  onDeactivate,
  onError,
}: {
  isEnabled: boolean
  isConnected: boolean
  connectionType: ConnectionType
  onActivate: (connectionType: ConnectionType) => void
  onDeactivate: (connectionType: null) => void
  onError: (error: any) => void
}) => {

  const [ isConnecting, setIsConnecting ] = useState(false)
  
  const onClick = async () => {
    if (isConnected) {
      const deactivation = await tryDeactivateConnector(getConnection(connectionType).connector)
      // undefined means the deactivation failed
      if (deactivation === undefined) {
        return
      }
      onDeactivate(deactivation)
      return
    }

    try {
      setIsConnecting(true)
      const activation = await tryActivateConnector(getConnection(connectionType).connector)
      setIsConnecting(false)
      if (!activation) {
        return
      }
      onActivate(activation)
      return
    } catch (err) {
      setIsConnecting(false)
      onError(err)
    }
  }

  const Web3Icon = getWeb3Icon(connectionType)

  return (
    <div>
      <button
        className="secondaryButton alingItemsCenter"
        disabled={!isEnabled || isConnecting}
        onClick={onClick}
      >
        {isConnecting && (
          <Spinner
            color={"grey"}
            style={{ height: "1rem", marginRight: "0.5rem" }}
          />
        )}
        <Web3Icon
          style={{
            width: "1.5rem",
            height: "1.5rem",
            marginRight: "0.5rem",
          }}
        />
        {getConnectorName(connectionType)}
      </button>
    </div>
  )
}
