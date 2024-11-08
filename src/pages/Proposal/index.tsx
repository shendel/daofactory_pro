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

import { translate } from 'src/utils/translate'

type ParamsProps = {
  proposalId?: string;
};

function ProposalDetail() {
  const { proposalId = "" } = useParams() as ParamsProps;
  
  const { account } = useWeb3React();

  const { proposalData, isLoading, setNeedRefresh } = useProposal(proposalId, account);

  useEffect(() => {
    console.log('>>> DO REFRESH ON CHANGE ACCOUNT', account)
    setNeedRefresh(account)
  }, [ account ])
  const { id, space, snapshot, network, strategies, state, choices } =
    proposalData;

  const haveDataForRenderOtherElements = !!(
    id &&
    space?.id &&
    snapshot &&
    network &&
    strategies?.length &&
    state
  );

  return (
    <div className="app-page proposal">
      {isLoading && <h1 className="textCenter">{translate('proposal_loading', 'Loading...')}</h1>}
      {haveDataForRenderOtherElements && (
        <ProposalBody proposal={proposalData} />
      )}
      {choices && state !== "closed" && (
        <ProposalVoting proposal={proposalData} />
      )}
      <ProposalInfo proposalData={proposalData} />
      {haveDataForRenderOtherElements && (
        <ProposalVotesContent proposalData={proposalData} />
      )}
    </div>
  );
}

type ProposalVotesContentProps = {
  proposalData: ProposalType;
};

function ProposalVotesContent(props: ProposalVotesContentProps) {
  const { proposalData } = props;

  const { votesData, resultData, isLoading } = useVotes(proposalData);

  return (
    <>
      {isLoading ? (
        <h3>
          {translate('proposal_loading_votes', 'Loading votes...')}
        </h3>
      ) : (
        !!votesData.length && (
          <>
            {resultData && (
              <ProposalResults
                strategies={proposalData.strategies}
                choices={proposalData.choices}
                results={resultData}
              />
            )}
            <ProposalVotes
              choices={proposalData.choices}
              votes={votesData.slice(0, 10)}
              strategies={proposalData.strategies}
              totalVotes={votesData.length}
            />
          </>
        )
      )}
    </>
  );
}

export default ProposalDetail;
