import { useContext, useEffect, useState } from "react";
import { shortEVMAddress } from "src/helpers/utils";
import { useWeb3React } from "@web3-react/core"
import { ModalUpdaterContext } from "src/components/WithModal";
import ProvidersV8 from './ProvidersV8'
import { NETWORK_EXPLORER_URLS, SupportedChainId } from "src/helpers/constants";
import ExternalLink from "src/components/ExternalLink";
import { translate } from "src/utils/translate"
import Spinner from "src/components/Spinner";
import "./index.scss"

import {
  ConnectionType,
  getConnection,
  tryActivateConnector,
  tryDeactivateConnector,
  switchConnectorNetwork
} from 'src/web3/connections'

function ConnectWallet() {
  const {
    account,
    // deactivate,
    chainId,
    // library,
    connector
  } = useWeb3React();

  const web3 = useWeb3React()
  const needChainId = window.NETWORK_ID;

  console.log('>>>> WEB3', web3)
  const setModalOptions = useContext(ModalUpdaterContext);

  const connectWalletModalProps = {
    headerContent: translate("wallet_connect", "Connect wallet"),
    bodyContent: (
      <ProvidersV8 closeModal={() => setModalOptions({ isOpen: false })} />
    ),
    footerContent: "",
    onCancel: () => setModalOptions({ isOpen: false }),
  };

  const disconectButton = (
    <div
      style={{
        display: "flex",
        padding: "1rem",
      }}
    >
      <button
        className="secondaryButton"
        onClick={async () => {
          const deactivation = await tryDeactivateConnector(connector)
          // undefined means the deactivation failed
          if (deactivation === undefined) {
            return
          }
          setModalOptions({ isOpen: false });
        }}
      >
        {translate('wallet_disconnect', 'Disconnect')}
      </button>
    </div>
  );

  const [ isSwitchNetwork, setIsSwitchNetwork ] = useState(false)
  
  useEffect(() => {
    if (chainId && account && (parseInt(`${chainId}`) !== parseInt(`${needChainId}`))) {
      tryChangeNetwork()
    }
  }, [ chainId, account ])
  
  const tryChangeNetwork = async () => {
    try {
      setIsSwitchNetwork(true)
      await switchConnectorNetwork(parseInt(needChainId), connector)
      setIsSwitchNetwork(false)
    } catch (err) {}
      setIsSwitchNetwork(false)
  }
  const needChangeNetwork = (chainId && account && (parseInt(`${chainId}`) !== parseInt(`${needChainId}`)))
  /*
  useEffect(() => {
    const isMetamask = !!library?.library?.provider?.isMetaMask;
    const windowChainId = window.NETWORK_ID && parseInt(window.NETWORK_ID)

    if (isMetamask && chainId !== windowChainId) {
      switchNetworkByChainId(windowChainId);
    }

  }, [chainId, account, library])
  */
  
  const networkId = (chainId || 1) as SupportedChainId;

  const accountContent = (
    <div
      style={{
        display: "flex",
        padding: "1rem",
      }}
    >
      <span style={{ marginRight: "0.5rem" }}>
        {translate('wallet_account_text', 'Account')}
      </span>
      <ExternalLink
        link={`${NETWORK_EXPLORER_URLS[networkId]}address/${account}`}
        children={shortEVMAddress(account || "")}
      />
    </div>
  );

  const accountModalProps = {
    headerContent: translate("wallet_account", "Account"),
    bodyContent: accountContent,
    footerContent: disconectButton,
    onCancel: () => setModalOptions({ isOpen: false }),
  };

  if (needChangeNetwork) {
    return (
      <button
        id="connect-button"
        className="secondaryButton connectButton"
        onClick={tryChangeNetwork}
        style={{ width: "auto" }}
      >
        {isSwitchNetwork && (<Spinner />)}
        {`Switch network`}
      </button>
    )
  }
  return (
    <button
      id="connect-button"
      className="secondaryButton"
      onClick={() =>
        setModalOptions({
          isOpen: true,
          modalProps: account ? accountModalProps : connectWalletModalProps,
        })
      }
      style={{ width: "auto" }}
    >
      {account ? shortEVMAddress(account) : translate('wallet_connect', "Connect Wallet")}
    </button>
  );
}

export default ConnectWallet;
