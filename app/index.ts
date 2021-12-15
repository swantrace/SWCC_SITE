import "./style.scss";
import WPAPI from "./lib/wpapi";
import IconButton from "./sections/components/IconButton";
// @ts-ignore
import { component, html } from "haunted";
import TopIconButtons from "./sections/components/TopIconButtons";
import Main from "./sections/Main";
import Footer from "./sections/Footer";
import Header from "./sections/Header";

// api
//   .get("menus", { id: 15, _fields: ["title", "menu_item_parent"] })
//   .then(console.log);
// api.get("posts", { _fields: ["content", "title"] }).then(console.log);
function setup() {
  // const promises = ["swcc-main", "swcc-header", "swcc-footer"].map((name) =>
  //   customElements.whenDefined(name)
  // );
  // Promise.all(promises).then((a) => {
  //   const topButtons = document.querySelector("#top-buttons");
  //   console.log(topButtons);
  // });

  customElements.define(
    "swcc-main",
    // @ts-ignore
    component(Main, {
      useShadowDOM: false,
      // @ts-ignore
      observedAttributes: ["page-type", "page-id"],
      baseElement: HTMLElement,
    }),
    { extends: "main" }
  );

  customElements.define(
    "swcc-header",
    // @ts-ignore
    component(Header, {
      useShadowDOM: false,
      // @ts-ignore
      observedAttributes: ["menu-id"],
      baseElement: HTMLElement,
    }),
    { extends: "header" }
  );

  customElements.define(
    "swcc-footer",
    // @ts-ignore
    component(Footer, {
      useShadowDOM: false,
      // @ts-ignore
      observedAttributes: ["sidebar-id"],
      baseElement: HTMLElement,
    }),
    { extends: "footer" }
  );
}

setup();
