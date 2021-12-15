//@ts-ignore
import { virtual, html, useEffect } from "haunted";
import { VirtualRenderer } from "haunted/lib/virtual";
// @ts-ignore
import Collapse from "../../node_modules/bootstrap/js/src/collapse";
// @ts-ignore
import logoImg from "../../img/swcc-logo.png";

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
  const menuInfoFake = [
    {
      ID: 4407,
      menu_order: 1,
      menu_item_parent: "0",
      url: "https://southwinnipegcc.ca/",
      title: "SWCC",
    },
    {
      ID: 4410,
      menu_order: 3,
      menu_item_parent: "0",
      url: "https://southwinnipegcc.ca/about-us/",
      title: "Activities",
    },
    {
      ID: 4409,
      menu_order: 5,
      menu_item_parent: "0",
      url: "https://southwinnipegcc.ca/sports/",
      title: "Children & Youth",
    },
    {
      ID: 4408,
      menu_order: 6,
      menu_item_parent: "0",
      url: "https://southwinnipegcc.ca/activities/",
      title: "Seniors",
    },
    {
      ID: 4408,
      menu_order: 6,
      menu_item_parent: "0",
      url: "https://southwinnipegcc.ca/activities/",
      title: "Adults",
    },
    {
      ID: 4411,
      menu_order: 7,
      menu_item_parent: "0",
      url: "https://southwinnipegcc.ca/events/",
      title: "News & Events",
    },
    {
      ID: 4412,
      menu_order: 8,
      menu_item_parent: "0",
      url: "https://southwinnipegcc.ca/swcc-contacts/",
      title: "Rental",
    },
  ];
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
          ${menuInfoFake.map(
            (menuItem) =>
              html`<li class="nav-item">
                <a
                  class="nav-link fw-bolder text-uppercase fs-2
                  ${menuItem.url.replace("https://southwinnipegcc.ca", "") ===
                  location.pathname
                    ? "active text-primary text-decoration-underline"
                    : "text-info"}"
                  href=${menuItem.url}
                  >${menuItem.title}</a
                >
              </li>`
          )}
          <li class="nav-item">
            <a
              class="nav-link fw-bolder d-block d-lg-none text-uppercase fs-2 ${"".replace(
                "https://southwinnipegcc.ca",
                ""
              ) === location.pathname
                ? "active text-primary text-decoration-underline"
                : "text-info"}"
              href="#"
              >DONATE NOW</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link fw-bolder d-block d-lg-none text-uppercase fs-2 ${"".replace(
                "https://southwinnipegcc.ca",
                ""
              ) === location.pathname
                ? "active text-primary text-decoration-underline"
                : "text-info"}"
              href="#"
              >TRANSLATE</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link fw-bolder d-block d-lg-none text-uppercase fs-2 ${"".replace(
                "https://southwinnipegcc.ca",
                ""
              ) === location.pathname
                ? "active text-primary text-decoration-underline"
                : "text-info"}"
              href="#"
              >CALENDAR</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link fw-bolder d-block d-lg-none text-uppercase fs-2 ${"".replace(
                "https://southwinnipegcc.ca",
                ""
              ) === location.pathname
                ? "active text-primary text-decoration-underline"
                : "text-info"}"
              href="#"
              >REGISTER</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>`;
}) as VirtualRenderer);

export default TopNavigation as (menuInfo: MenuInfo) => any;
