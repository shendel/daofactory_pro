import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ProposalType, useProposal } from "src/hooks/useProposals";
import { useVotes } from "src/hooks/useVotes";
import { useWeb3React } from "@web3-react/core"

import "./index.scss";

import ProposalBody from "./ProposalBody";
import ProposalInfo from "./ProposalInfo";
import ProposalResults from "./ProposalResults";
import ProposalVotes from "./ProposalVotes";
import ProposalVoting from "./ProposalVoting";


import { formatDate } from "src/utils/formatDate"
import { translate } from 'src/utils/translate'

import { ReactComponent as ICON_VotesCount } from 'src/assets/svg/flat/icon-votes.svg'
import { ReactComponent as ICON_Date } from 'src/assets/svg/flat/icon-date.svg'
import { ReactComponent as ICON_Reqs } from 'src/assets/svg/flat/icon-reqs.svg'
import { ReactComponent as ICON_DoVote } from 'src/assets/svg/flat/icon-do-vote.svg'
import { ReactComponent as ICON_Link } from "src/assets/svg/flat/icon-link.svg";
import { ReactComponent as ICON_Snapshot } from "src/assets/svg/flat/icon-snapshot.svg";
import { ReactComponent as ICON_Ipfs } from "src/assets/svg/flat/icon-ipfs.svg"

import { NETWORK_EXPLORER_URLS, SupportedChainId } from "src/helpers/constants";
import { shortEVMAddress, shortIPFS } from "src/helpers/utils";

import CountDown from "src/components/CountDown"

type ParamsProps = {
  proposalId?: string;
};



const getDateTime = (inDate: number): string => {
  return (window.TIME_ZONE_CUSTOM) ? (
    formatDate(inDate * 10 ** 3)
  ) : (
    new Date(inDate * 10 ** 3).toUTCString()
  )
}

function ProposalFlat() {
  const { proposalId = "" } = useParams() as ParamsProps;
  
  const { account } = useWeb3React();

  const { proposalData, isLoading, setNeedRefresh } = useProposal(proposalId, account);

  const {
    id,
    space,
    snapshot,
    network,
    strategies,
    author,
    title,
    body,
    ipfs,
    start,
    end,
    state,
  } = proposalData

  const networkId = +network as SupportedChainId
  
  let tokenSymbol = "",
    tokenAddress = "";

  if (strategies?.length) {
    tokenSymbol = strategies[0].params.symbol;
    tokenAddress = strategies[0].params.address;
  }

  useEffect(() => {
    if (account) setNeedRefresh(account)
  }, [ account ])

  const haveDataForRenderOtherElements = !!(
    id &&
    space?.id &&
    snapshot &&
    network &&
    strategies?.length &&
    state
  );

  return (
    <div className="proposal-flat">
      {!isLoading && (
        <>
          <div className="proposal-header -card">
            <div className="proposal-title">
              <h1>{title}</h1>
              <span>{`Proposal title`}</span>
            </div>
            <div className="proposal-owner">
              {`Author: `}
              <a
                href={`${NETWORK_EXPLORER_URLS[networkId]}address/${proposalData?.author}}`}
                target="_blank"
              >
                <ICON_Link />
                {proposalData?.author}
              </a>
            </div>
          </div>
          {body && body != '' && (
            <div className="proposal-desc -card">
              <span>{`Description`}</span>
              <div>
                {body}
              </div>
            </div>
          )}
          <div className="proposal-summary -card">
            <div>
              <ICON_Date />
              <div>
                <p>{getDateTime(start)}</p>
                <span>{`Start date`}</span>
              </div>
            </div>
            <div>
              <ICON_Date />
              <div>
                <p>{getDateTime(end)}</p>
                <span>{`End date`}</span>
              </div>
            </div>
            <div>
              <ICON_Reqs />
              <div>
                <a
                  href={`${NETWORK_EXPLORER_URLS[networkId]}address/${tokenAddress}}`}
                  target="_blank"
                >
                  {window.REQUIRED_AMOUNT_TO_VOTE}
                  {` `}
                  {tokenSymbol}
                  <ICON_Link />
                </a>
                <span>{`Vote requirements`}</span>
              </div>
            </div>
            {ipfs && (
              <div>
                <ICON_Ipfs />
                <div>
                  <a href={`https://cloudflare-ipfs.com/ipfs/${ipfs}`} target="_blank">
                    {shortIPFS(ipfs)}
                    <ICON_Link />
                  </a>
                  <span>{`IPFS`}</span>
                </div>
              </div>
            )}
            <div>
              <ICON_Snapshot />
              <div>
                <a
                  href={`${NETWORK_EXPLORER_URLS[networkId]}block/${snapshot}`}
                  target="_blank"
                >
                   {snapshot}
                  <ICON_Link />
                </a>
                <span>{`Snapshot`}</span>
              </div>
            </div>
            <div>
              <ICON_VotesCount />
              <div>
                <p>
                  <ProposalTotalVotes  proposalData={proposalData} />
                </p>
                <span>Number of voters</span>
              </div>
            </div>
          </div>
          {proposalData
            &&
            (
              proposalData.state == 'pending'
              || proposalData.state == 'active'
            )
            && (
            <div className="proposal-time-remaing">
              <p>Time Remaing</p>
              <span>
                <CountDown target={new Date((proposalData.state == 'pending' ? proposalData.start : proposalData.end) * 10 **3 )} />
              </span>
            </div>
          )}
          <ProposalVotesContent proposalData={proposalData} />
        </>
      )}
    </div>
  )
}

type ProposalVotesContentProps = {
  proposalData: ProposalType;
};

function ProposalTotalVotes(props: ProposalVotesContentProps) {
  const { proposalData } = props;

  const { votesData, resultData, isLoading } = useVotes(proposalData);
  
  return (
    <>
      {isLoading ? (`0`) : votesData.length}
    </>
  )
}

function ProposalVotesContent(props: ProposalVotesContentProps) {
  const { proposalData } = props;

  const { votesData, resultData, isLoading } = useVotes(proposalData);

  return (
    <>
      <ProposalResults
        isLoading={true}
        strategies={proposalData.strategies}
        choices={proposalData.choices}
        results={resultData}
        state={proposalData.state}
        proposalData={proposalData}
      />
      {!!votesData.length && (
        <ProposalVotes
          choices={proposalData.choices}
          votes={votesData.slice(0, 10)}
          strategies={proposalData.strategies}
          totalVotes={votesData.length}
        />
      )}
    </>
  );
  return (
    <>
      {!isLoading && (
        <>
          <ProposalResults
            strategies={proposalData.strategies}
            choices={proposalData.choices}
            results={resultData}
            state={proposalData.state}
            proposalData={proposalData}
            isLoading={isLoading}
          />
          {!!votesData.length && (
            <ProposalVotes
              choices={proposalData.choices}
              votes={votesData.slice(0, 10)}
              strategies={proposalData.strategies}
              totalVotes={votesData.length}
            />
          )}
        </>
      )}
    </>
  );
}

export default ProposalFlat;
