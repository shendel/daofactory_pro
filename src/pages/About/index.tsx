import { useSpaceList } from "src/hooks/useSpaces";
import { shortenText } from "src/helpers/utils";

import ExternalLink from "src/components/ExternalLink";

import "./index.scss";
import FollowButton from "./FollowButton";

function About() {
  const { spacesData, isLoading } = useSpaceList([
    window.ENS_DOMAIN || "onout.eth",
  ]);

  const spaceData = spacesData[0];

  console.groupCollapsed("useSpaceList states");
  console.log("isLoading", isLoading);
  console.log("spaceData", spaceData);
  console.groupEnd();

  if (isLoading && !spaceData) {
    return (
      <div className="app-page about">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!isLoading && spacesData.length === 0) {
    return (
      <div className="app-page about">
        <h1>Have not any space data.</h1>
      </div>
    );
  }

  if (!spaceData) {
    return (
      <div className="app-page about">
        <h1>Please, try use another space or try reloar.</h1>
      </div>
    );
  }

  const {
    name,
    about,
    domain,
    symbol,
    network,
    terms,
    strategies,
    admins,
    members,
  } = spaceData;

  return (
    <div className="app-page about">
      <h1 style={{ textAlign: "center" }}>About Page</h1>
      <FollowButton spaceObj={spaceData} />
      <div>
        {name && (
          <>
            <h3>Name</h3>
            <p>
              {name} {symbol && `(${symbol})`}
            </p>
          </>
        )}
        {about && (
          <>
            <h3>About</h3>
            <p>{about}</p>
          </>
        )}
        {domain && (
          <>
            <h3>Domain</h3>
            <ExternalLink link={`https://${domain}`} children={domain} />
          </>
        )}
        {network && (
          <>
            <h3>Chain id</h3>
            <p>{network}</p>
          </>
        )}
        {terms && (
          <>
            <h3>Terms</h3>
            <ExternalLink link={terms} children={shortenText(terms, 35)} />
          </>
        )}
        {!!strategies.length && (
          <>
            <h3>Strategie(s)</h3>
            {strategies.map((strategy, index) => (
              <p key={index}>{strategy.name}</p>
            ))}
          </>
        )}
      </div>
      {!!admins.length && (
        <div>
          <h3>Admins</h3>
          {admins.map((admin, index) => (
            <p key={index}>{admin}</p>
          ))}
        </div>
      )}

      {!!members.length && (
        <div>
          <h3>Authors</h3>
          {members.map((members, index) => (
            <p key={index}>{members}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default About;
