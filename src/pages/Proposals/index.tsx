import { useProposalList } from "src/hooks/useProposals";
import { Link } from "react-router-dom";
import removeMD from "remove-markdown";

import { shortenText, shortEVMAddress } from "src/helpers/utils";
import { useWeb3React } from "@web3-react/core";
import "./index.scss";
import { translate } from 'src/utils/translate'
import { formatDate } from "src/utils/formatDate"
import ConnectWallet from 'src/components/Modal/Modals/ConnectWallet'

function Proposals(props: any) {
  const { onlyMy } = props
  const { isActive: active, account = false } = useWeb3React();

  const { offChainProposalList: proposals, isLoading } = useProposalList({
    space_in: [window.ENS_DOMAIN || "onout.eth"],
    tokenAddress: window.TOKEN_ADDRESS,
    ...((onlyMy && account) ? {
      author_in: [ account ]
    } : {})
  });

  const renderedProposalListFlat = proposals.map(
    (proposal, index) => {
      const {
        author,
        body,
        title,
        state,
        id,
        end,
        start,
        choices,
      } = proposal

      const preparedBody = shortenText(removeMD(body), 140);

      return (
        <div key={index} className="proposal-row-flat">
          <Link to={`/proposal/${id}`}>
            <div className="proposal-header">
              <h2>{title}</h2>
              <span>
                {translate('proposal_created_by', "Created by {author}", { author: shortEVMAddress(author)})}
              </span>
            </div>
            <div className="proposal-status">
              <div className="status-row">
                <p>Status</p>
                <span>{translate(`proposal_state_${state}`, state)}</span>
              </div>
              {state == 'pending' && (
                <div className="date-row">
                  <p>{translate('proposal_start_date', "Start date")}</p>
                  <span>
                    {window.TIME_ZONE_CUSTOM ? (
                      <>{formatDate(start * 10 ** 3)}</>
                    ) : (
                      <>{`${new Date(start * 10 ** 3).toUTCString()}`}</>
                    )}
                  </span>
                </div>
              )}
              {state == 'active' && (
                <div className="date-row">
                  <p>{translate('proposal_end_date', "End date")}</p>
                  <span>
                    {window.TIME_ZONE_CUSTOM ? (
                      <>{formatDate(end * 10 ** 3)}</>
                    ) : (
                      <>{`${new Date(end * 10 ** 3).toUTCString()}`}</>
                    )}
                  </span>
                </div>
              )}
            </div>
            <div className="proposal-choises">
              <div>Choises</div>
              {choices.map((choise, i) => {
                return (
                  <span key={i}>#{choise}</span>
                )
              })}
            </div>
          </Link>
        </div>
      );
    }
  );
  
  const renderedProposalList = proposals.map(
    ({ author, body, title, state, id }, index) => {
      const preparedBody = shortenText(removeMD(body), 140);

      return (
        <div key={index} className="proposal-row">
          <Link to={`/proposal/${id}`}>
            <div className="proposal-header">
              <span>
                {translate('proposal_created_by', "Created by {author}", { author: shortEVMAddress(author)})}
              </span>
              <span className="proposal-state">
                {translate(`proposal_state_${state}`, state)}
              </span>
            </div>
            <div className="proposal-body">
              <h2>{title}</h2>
              <p className="body-description">{preparedBody}</p>
            </div>
          </Link>
        </div>
      );
    }
  );

  return (
    <div className="app-page">
      <div className="proposals-header">
        <h1>
          {onlyMy ? (
            <>
              {translate('page_my_proposals_title', "My Proposals")}
            </>
          ) : (
            <>
              {translate('page_proposals_title', "Proposals")}
            </>
          )}
        </h1>
      </div>
      {!account && onlyMy ? (
        <ConnectWallet
          isPrimary={true}
          isActive={true}
          connectTitle={translate('page_my_proposals_connect_wallet', 'Connect your wallet to see your proposals')}
        />
      ) : (
        <div className={(window.FLAT_DESIGN) ? 'proposals-flat' : 'proposals'}>
          {isLoading ? (
            <h3>
              {translate('page_proposals_loading', "Loading...")}
            </h3>
          ) : !!proposals.length ? (
            (window.FLAT_DESIGN) ? renderedProposalListFlat : renderedProposalList
          ) : (
            <>
              <h3>
                {translate('page_proposals_lets_create', "Let's create your first proposal")}
              </h3>
              <Link to="proposal/create">
                <button className="secondaryButton active">
                  {translate('page_proposals_createbutton', "Create proposal")}
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Proposals;
