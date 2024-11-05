import { HashRouter, Routes, Route } from "react-router-dom";

import WithModal from "src/components/WithModal";

import Proposal from "./Proposal"
import Proposals from "./Proposals"
import About from "./About"
import CreateProposal from "./CreateProposal"
import NotFound from "./NotFound"
import ServiceLink from "src/components/ServiceLink"
import Header from "src/components/Header"

import "./App.scss";

function App() {
  const showServiceLink = !window?.HIDE_SERVICE_LINK;
  const colorTemplate =
    window.COLOR_TEMPLATE === "dark_template" ? "dark" : "light";
  return (
    <HashRouter>
      <div className="App" data-color-theme={colorTemplate}>
        <WithModal>
          <Header />
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<Proposals />} />
              <Route path="/about" element={<About />} />
              <Route path="proposal">
                <Route path="create" element={<CreateProposal />} />
                <Route path=":proposalId" element={<Proposal />} />
              </Route>
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
