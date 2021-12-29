//@ts-ignore
import { virtual, html, useEffect, useCallback } from "haunted";
import { VirtualRenderer } from "haunted/lib/virtual";
// @ts-ignore
import Collapse from "../../node_modules/bootstrap/js/src/collapse";
// @ts-ignore
import logoImg from "../../img/swcc-logo.png";
// @ts-ignore
import iconSearch from "../../img/icon-search.png";
// @ts-ignore
import iconTranslate from "../../img/icon-translate.png";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import TopNavigationIcons from "./TopNavigationIcons";

type MenuItem = {
  ID: number;
  menu_item_parent: string;
  menu_order: number;
  title: string;
  url: string;
  submenu?: MenuItem[];
};

type MenuInfo = MenuItem[];

const TopNavigation = virtual(((menuInfo: MenuInfo) => {
  const hasDropdown = useCallback(
    (menuItem: MenuItem) => menuItem?.submenu?.length ?? 0,
    []
  );
  const currentMenuItemIsActive = useCallback(
    (menuItem: MenuItem) =>
      menuItem.url
        .replace("https://southwinnipegcc.ca", "")
        .includes(location.pathname) && !(location.pathname === "/"),
    []
  );
  const handleFirstLevelMenuItemMouseEnter = useCallback((e) => {
    const target = e.target;
    if (target.classList.contains("dropdown")) {
      const dropMenu = e.target.querySelector(".dropdown-menu");
      dropMenu.classList.remove("d-lg-none");
      dropMenu.classList.add("show");
    }
  }, []);

  const handleFirstLevelMenuItemMouseLeave = useCallback((e) => {
    const target = e.target;
    if (target.classList.contains("dropdown")) {
      const dropMenu = e.target.querySelector(".dropdown-menu");
      dropMenu.classList.remove("show");
      dropMenu.classList.add("d-lg-none");
    }
  }, []);
  useEffect(() => {
    const mainNav = document.querySelector("#main_nav") as Element;
    const mainNavCollapse = new Collapse(mainNav, { toggle: false });
  }, []);

  return html`<nav
    id="top-navigation"
    class="navbar navbar-expand-lg navbar-light bg-white"
  >
    <div class="container-fluid">
      <a class="navbar-brand d-block d-lg-none" href="/">
        <img src=${logoImg} id="top-mobile-logo" />
      </a>
      <button
        class="navbar-toggler collapsed border-primary rounded-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#main_nav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="main_nav">
        <ul class="navbar-nav ps-3 ps-lg-0">
          ${menuInfo.map(
            (menuItem) =>
              html`<li
                class=${`nav-item${hasDropdown(menuItem) ? " dropdown" : ""}`}
                @mouseenter=${handleFirstLevelMenuItemMouseEnter}
                @mouseleave=${handleFirstLevelMenuItemMouseLeave}
              >
                <a
                  class=${`nav-link fw-bolder text-uppercase fs-2${
                    currentMenuItemIsActive(menuItem)
                      ? " active text-primary text-decoration-underline"
                      : " text-info"
                  }${hasDropdown(menuItem) ? " dropdown-toggle" : ""}`}
                  href=${menuItem.url}
                  >${unsafeHTML(menuItem.title)}</a
                >${hasDropdown(menuItem)
                  ? html`
                      <ul class="dropdown-menu d-block d-lg-none">
                        ${menuItem.submenu?.map(
                          (menuItem) => html`
                            <li>
                              <a class="dropdown-item" href=${menuItem.url}
                                >${unsafeHTML(menuItem.title)}</a
                              >
                            </li>
                          `
                        )}
                      </ul>
                    `
                  : html``}
              </li>`
          )}
          ${TopNavigationIcons()}
        </ul>
      </div>
    </div>
  </nav>`;
}) as VirtualRenderer);

export default TopNavigation as (menuInfo: MenuInfo) => any;
