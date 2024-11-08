import fetch from "cross-fetch";
import { Web3Provider } from "@ethersproject/providers";
import { Wallet } from "@ethersproject/wallet";
import { OFFCHAIN_HUB_LINK, NAME, VERSION } from "../constants";
import { _TypedDataEncoder } from "@ethersproject/hash";
import * as ethUtil from 'ethereumjs-util';

import {
  Space,
  Proposal,
  CancelProposal,
  Vote,
  Follow,
  Unfollow,
  Subscribe,
  Unsubscribe,
  Alias,
  Message,
  spaceTypes,
  proposalTypes,
  cancelProposalTypes,
  cancelProposal2Types,
  voteTypes,
  voteArrayTypes,
  voteStringTypes,
  vote2Types,
  voteArray2Types,
  voteString2Types,
  followTypes,
  subscribeTypes,
  unfollowTypes,
  unsubscribeTypes,
  aliasTypes,
  Types,
  Envelop,
} from "./types";

export const domain = {
  name: NAME,
  version: VERSION,
};

export class Client {
  readonly address: string;

  constructor(address: string = OFFCHAIN_HUB_LINK) {
    this.address = address;
  }

  async signPersonal(
    web3: Web3Provider | Wallet,
    address: string,
    domain: any,
    types: any,
    message: any
  ) {
    
  }
  
  async sign(
    web3: Web3Provider | Wallet,
    address: string,
    message: Message,
    types: Types
  ) {
    let signer;
    if (web3 instanceof Wallet) {
      signer = web3;
      console.log('>>>> web3 is Wallet')
    }
    if (web3 instanceof Web3Provider) {
      console.log('>>>> web3 id Web3Provider')
      signer = web3.getSigner();
    }
    if (!message.from) message.from = address;
    if (!message.timestamp)
      message.timestamp = parseInt((Date.now() / 1e3).toFixed());
    const data = { domain, types, message };

    console.log('>>>> signer', signer)
    if (signer) {
      try {
        const sig = await signer._signTypedData(domain, data.types, message);
        console.log("Sign", { address, sig, data });
        return await this.send({ address, sig, data });
        
      } catch (err) {
        // @ts-ignore
        if (/eth_signTypedData_v4 does not/gm.test(err.message)) {
          // This is WalletConnect - do via signMessage
          const payload = _TypedDataEncoder.getPayload(domain, data.types, message)
          const sourceData = {
            domain, 
            types: data.types,
            value: message
          }
          const sig = await signer.signMessage(JSON.stringify(sourceData))
          return await this.send({ address, sig, data });
        } else {
          return err
        }
      }
    }
  }

  async send(envelop: Envelop) {
    console.log('>>> envelop', envelop)
    const url = `${this.address}/api/msg`;
    const init = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(envelop),
    };
    return new Promise((resolve, reject) => {
      fetch(url, init)
        .then((res) => {
          if (res.ok) return resolve(res.json());
          throw res;
        })
        .catch((e) => e.json().then((json: string) => reject(json)));
    });
  }

  async space(web3: Web3Provider | Wallet, address: string, message: Space) {
    return await this.sign(web3, address, message, spaceTypes);
  }

  async proposal(
    web3: Web3Provider | Wallet,
    address: string,
    message: Proposal
  ) {
    console.log('>>> client proposal', message)
    return await this.sign(web3, address, message, proposalTypes);
  }

  async cancelProposal(
    web3: Web3Provider | Wallet,
    address: string,
    message: CancelProposal
  ) {
    const type2 = message.proposal.startsWith("0x");
    return await this.sign(
      web3,
      address,
      message,
      type2 ? cancelProposal2Types : cancelProposalTypes
    );
  }

  async vote(web3: Web3Provider | Wallet, address: string, message: Vote) {
    const type2 = message.proposal.startsWith("0x");
    let type = type2 ? vote2Types : voteTypes;
    if (["approval", "ranked-choice"].includes(message.type))
      type = type2 ? voteArray2Types : voteArrayTypes;
    if (["quadratic", "weighted"].includes(message.type)) {
      type = type2 ? voteString2Types : voteStringTypes;
      message.choice = JSON.stringify(message.choice);
    }
    // @ts-ignore
    delete message.type;
    return await this.sign(web3, address, message, type);
  }

  async follow(web3: Web3Provider | Wallet, address: string, message: Follow) {
    return await this.sign(web3, address, message, followTypes);
  }

  async unfollow(
    web3: Web3Provider | Wallet,
    address: string,
    message: Unfollow
  ) {
    return await this.sign(web3, address, message, unfollowTypes);
  }

  async subscribe(
    web3: Web3Provider | Wallet,
    address: string,
    message: Subscribe
  ) {
    return await this.sign(web3, address, message, subscribeTypes);
  }

  async unsubscribe(
    web3: Web3Provider | Wallet,
    address: string,
    message: Unsubscribe
  ) {
    return await this.sign(web3, address, message, unsubscribeTypes);
  }

  async alias(web3: Web3Provider | Wallet, address: string, message: Alias) {
    return await this.sign(web3, address, message, aliasTypes);
  }
}
