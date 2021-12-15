// @ts-ignore
import { html, useEffect } from "haunted/compiled";
import WPAPI from "../lib/wpapi";
import TopIconButtons from "./components/TopIconButtons";
import arrayToTree from "array-to-tree";
import useLocalStorage from "../lib/hooks/useLocalStorage";
import TopNavigation from "./components/TopNavigation";
// @ts-ignore
import logoImg from "../img/swcc-logo.png";
// @ts-ignore
import register from "../img/register.png";

const wpapi = WPAPI.getInstance("https://southwinnipegcc.ca");

const Header = ({ menuId }) => {
  const [menuInfo, setMenuInfo] = useLocalStorage(`menu_${menuId}`, []);
  useEffect(() => {
    // if (menuInfo.length === 0) {
    wpapi
      .get("menus", {
        id: menuId,
        _fields: ["ID", "menu_order", "menu_item_parent", "title", "url"],
      })
      .then((rawMenuInfo) =>
        setMenuInfo(
          arrayToTree(rawMenuInfo, {
            parentProperty: "menu_item_parent",
            childrenProperty: "submenu",
            customID: "ID",
          })
        )
      );
    // }
  }, []);

  return html`<div class="d-flex justify-content-between align-items-end px-3">
    <a class="navbar-brand d-none d-lg-block" href="/">
      <img src=${logoImg} id="top-desktop-logo" />
    </a>
    <div class="d-flex flex-column flex-fill">
      ${TopIconButtons()}${TopNavigation(menuInfo)}
    </div>
    <a class="d-none d-lg-block"
      ><img src=${register} id="top-desktop-register"
    /></a>
  </div>`;
};

export default Header;
