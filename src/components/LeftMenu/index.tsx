import "./index.scss";
import { ReactComponent as ICON_Home } from 'src/assets/svg/icon-home.svg'
import { ReactComponent as ICON_MyPools } from 'src/assets/svg/icon-my-pools.svg'
import { ReactComponent as ICON_CreatePool } from 'src/assets/svg/icon-create-pool.svg'
import { NavLink } from "react-router-dom";


function LeftMenu() {
  const getClassNames = ({ isActive }: { isActive: boolean }) =>
    `${isActive ? "active" : ""}`;

  return (
    <>
      <input className="leftMenuToggle" type="checkbox" id="leftMenuToggle" />
      <div className="asideHolder">
        <label htmlFor="leftMenuToggle" className="leftMenuBg"></label>
        <aside className="leftMenu">
          <div className="bg"></div>
          <div className="menuHolder" id="leftMenuItemsHolder">
            <NavLink className={getClassNames} id={`proposals-nav-link`} to={"/"}>
              <ICON_Home />
              <span>{`All proposals`}</span>
            </NavLink>
            <NavLink
              className={getClassNames}
              id={`proposals-my`}
              to={`/proposals/my`}
            >
              <ICON_MyPools />
              <span>{`My proposals`}</span>
            </NavLink>
            <NavLink
              className={getClassNames}
              id={`create-proposal-nav-link`}
              to={"/proposal/create"}
            >
              <ICON_CreatePool />
              <span>Create new</span>
            </NavLink>
          </div>
        </aside>
      </div>
    </>
  );
}

export default LeftMenu;
