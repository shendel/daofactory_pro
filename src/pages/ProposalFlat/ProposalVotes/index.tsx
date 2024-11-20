import { shortEVMAddress } from "src/helpers/utils";
import { ProposalType } from "src/hooks/useProposals";
import { VoteWithScores } from "src/hooks/useVotes";
import "./index.scss";
import { translate } from 'src/utils/translate'

type ProposalVotesType = {
  votes: VoteWithScores[];
  choices: ProposalType["choices"];
  strategies: ProposalType["strategies"];
  totalVotes: number;
};

function ProposalVotes(props: ProposalVotesType) {
  const { votes, choices, strategies, totalVotes } = props;

  const tokenSymbol = strategies[0].params.symbol;

  return (
    <div className="proposal-last-voters">
      <h2>
        {translate('proposal_top_votes', 'Top {votes} of {totalVotes} votes', { votes: votes.length, totalVotes })}
      </h2>
      <div className="-card">
        <div className="-table">
          <div className="-header">
            <div>{`Address`}</div>
            <div>{`Choise`}</div>
            <div>{`Vote power`}</div>
          </div>
          {votes.map((voute, i) => {
            return (
              <div className="-rows" key={i}>
                <div>{shortEVMAddress(voute.voter)}</div>
                <div>{choices[voute.choice - 1]}</div>
                <div>
                  {`${voute.balance.toFixed(4)} ${tokenSymbol}`}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ProposalVotes;
