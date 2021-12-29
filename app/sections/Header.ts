// @ts-ignore
import { html, useEffect } from "haunted";
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

  return html`<div
    class="d-flex flex-column justify-content-between align-items-stretch align-items-lg-center px-3"
  >
    <div class="w-100">
      <a class="navbar-brand d-none d-lg-block w-100" href="/">
        <img src=${logoImg} id="top-desktop-logo" class="w-100" />
      </a>
    </div>
    <div class="d-flex flex-column flex-fill">${TopNavigation(menuInfo)}</div>
  </div>`;
};

export default Header;
