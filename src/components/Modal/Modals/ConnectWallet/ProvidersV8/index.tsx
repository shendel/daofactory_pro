import { useEffect, useMemo, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Spinner from "src/components/Spinner";
import { ConnectionOptions } from '../../../../../web3/components/ConnectionOptions'
import { ConnectionType, switchNetwork } from '../../../../../web3/connections'
import { CHAIN_INFO, INPUT_CHAIN_URL } from '../../../../../web3/constants'

import "./index.scss"

type ProvidersV8Props = {
  closeModal?: () => void;
};


function getErrorMessage(error: Error) {
  /*
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile. (Use http(s) to wallet connect)";
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect
  ) {
    return "Please authorize this website to access your Ethereum account.";
  } else {
    console.error(error);
    return "An unknown error occurred. Check the console for more details. (Use http(s) to wallet connect)";
  }
  */
  console.log('>>> getErrorMessage')
  console.error(error)
  return "An unknown error occurred. Check the console for more details. (Use http(s) to wallet connect)";
}

function ProvidersV8(props: ProvidersV8Props) {
  const { closeModal } = props
  const context = useWeb3React()
  const {
    connector,
  } = context;

  const needChainId = window.NETWORK_ID;

  const { chainId, account, isActive } = useWeb3React()
  const [blockNumber, setBlockNumber] = useState<number>(0)
  const [connectionType, setConnectionType] = useState<ConnectionType | null>(null)

  const [ error, setError ] = useState<any>(false)
  return (
    <div className="connectorsButtons">
      {!!error && <h4 className="error">{getErrorMessage(error)}</h4>}
      <ConnectionOptions
        activeConnectionType={connectionType}
        isConnectionActive={isActive}
        onActivate={(v: any) => { if (closeModal) closeModal() }}
        onDeactivate={setConnectionType}
        onError={setError}
      />
    </div>
  );
}

export default ProvidersV8
