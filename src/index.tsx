import { Buffer } from 'buffer';


import React from "react"
import ReactDOM from "react-dom"
import "./index.scss"
import App from "./pages/App"

import initAppConfig from './helpers/config'
import { Web3ContextProvider } from './web3/components/Web3ContextProvider'

// @ts-ignore
window.Buffer = Buffer;
initAppConfig()

/*
window.TRANSLATE = {
  "navbar_proposals": "asdasdProposals",
  "navbar_newproposal": "New proposal"
}
*/

const appElement = document.getElementById("daofactory_app")

ReactDOM.render(
  <React.StrictMode>
    <Web3ContextProvider>
      <App />
    </Web3ContextProvider>
  </React.StrictMode>,
  appElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
