import { HashRouter, Routes, Route } from "react-router-dom";

import WithModal from "src/components/WithModal";

import Proposal from "./Proposal"
import ProposalFlat from "./ProposalFlat"
import Proposals from "./Proposals"
import About from "./About"
import CreateProposal from "./CreateProposal"
import NotFound from "./NotFound"
import ServiceLink from "src/components/ServiceLink"
import Header from "src/components/Header"
import LeftMenu from "src/components/LeftMenu"
import MDPage from "src/pages/MDPage"

import "./App.scss";

function App() {
  const showServiceLink = !window?.HIDE_SERVICE_LINK;
  const colorTemplate =
    window.COLOR_TEMPLATE === "dark_template" ? "dark" : "light";
  return (
    <HashRouter>
      <div className={(window.FLAT_DESIGN) ? 'App-flat' : 'App'} data-color-theme={colorTemplate}>
        <WithModal>
          {(window.FLAT_DESIGN) ? <LeftMenu /> : null}
          <Header />
          <div className={(window.FLAT_DESIGN) ? 'content-wrapper-flat' : 'content-wrapper'}>
            <Routes>
              <Route path="/" element={<Proposals />} />
              <Route path="/proposals" element={<Proposals />} />
              <Route path="/proposals/my" element={<Proposals onlyMy={true} />} />
              <Route path="/proposal">
                <Route path="create" element={<CreateProposal />} />
                <Route path=":proposalId" element={(window.FLAT_DESIGN) ? <ProposalFlat /> : <Proposal />} />
              </Route>
              <Route path="/about" element={<MDPage title={`About`} source={`about.md`} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          {showServiceLink && <ServiceLink />}
        </WithModal>
      </div>
    </HashRouter>
  );
}

export default App;
