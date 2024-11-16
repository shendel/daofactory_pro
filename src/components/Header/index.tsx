import Navbar from "./Navbar"
import ConnectWallet from "../Modal/Modals/ConnectWallet"

import "./index.scss";

function Header() {
  return (
    <div className={(window.FLAT_DESIGN) ? 'header-flat' : 'header'}>
      <Navbar />
      <ConnectWallet />
    </div>
  );
}

export default Header;
