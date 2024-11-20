import { ProposalType } from "src/hooks/useProposals";
import { ResultData } from "src/hooks/useVotes";
import { translate } from 'src/utils/translate'
import { useWeb3React } from "@web3-react/core"
import { ReactComponent as ICON_DoVote } from 'src/assets/svg/flat/icon-do-vote.svg'
import VotingModalButton from "src/components/Modal/Modals/Voting/index";
import ConnectWallet from 'src/components/Modal/Modals/ConnectWallet'


type ProposalResultsProps = {
  choices: ProposalType["choices"];
  results: ResultData | any;
  strategies: ProposalType["strategies"];
  state: string;
  proposalData: any
  isLoading: boolean
  
};

function ProposalResults(props: ProposalResultsProps) {
  const { account } = useWeb3React()
  
  const { choices, results, strategies, state, proposalData } = props;
  
  if (!choices && !strategies) return null

  const tokenSymbol = strategies[0].params.symbol;
  const hasResults = (results && results.resultsByVoteBalance) ? true : false
  const choicesByVotes = hasResults
    ? choices.map(
    (choice, i) => {
      const resultByVoteBalance = results.resultsByVoteBalance[i];
      return {
        choice,
        result: resultByVoteBalance,
      }
    }) : []
  const winner = choicesByVotes.sort((a, b) => {
    return (a.result > b.result) ? -1 : 1
  })

  const hasChoices = winner.length && winner[0].result > 0
  return (
    <div className="proposal-do-vote -card">
      {state == 'closed' && winner.length && (
        <h2>
          Winner
          <span>:</span>
          {winner[0].choice}
        </h2>
      )}
      {state === 'active' && (
        <span>
          {`Select who want to give to him your voice and sign your voice with wallet`}
        </span>
      )}
      {state === 'pending' && (
        <span className="-pending">
          {`Wait for voting start`}
        </span>
      )}
      <div className={`proposal-choices -count-${choices.length}`}>
        {choices.map((choice, i) => {
          const resultByVoteBalance = (hasChoices) ? results.resultsByVoteBalance[i] : 0;
          const persentsOfChoice = (hasChoices)
            ? (resultByVoteBalance / results.sumOfResultsBalance) * 100
            : 0
          return (
            <div className={(state !== 'active') ? '-not-active' : ''}>
              {state !== 'pending' && (
                <>
                  <span>{persentsOfChoice.toFixed(2)}%</span>
                  <u>{resultByVoteBalance.toFixed(4)} {tokenSymbol}</u>
                </>
              )}
              <em>{choice}</em>
              {state === 'active' && (
                <>
                  {!account ? (
                    <ConnectWallet
                      className="do-vote"
                      connectTitle={`Connect`}
                    />
                  ) : (
                    <>
                      <VotingModalButton
                        checkedChoice={i}
                        proposal={proposalData}
                        flat={true}
                        className="do-vote"
                      >
                        <>
                          <ICON_DoVote />
                          {`Vote`}
                        </>
                      </VotingModalButton>
                    </>
                  )}
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProposalResults;
