// @ts-ignore
import { html } from "haunted";
import WPAPI from "../lib/wpapi";
import FrontPageMain from "./components/FrontPageMain";
import StaticPageMain from "./components/StaticPageMain";
import SinglePostPageMain from "./components/SinglePostPageMain";
import IndexPageMain from "./components/IndexPageMain";
import SearchPageMain from "./components/SearchPageMain";
import CategoryPageMain from "./components/CategoryPageMain";
import TagPageMain from "./components/TagPageMain";

const wpapi = WPAPI.getInstance("https://southwinnipegcc.ca");
const Main = ({ pageType, pageId, pageNumber, pageTermId, pageTermName }) => {
  if (pageType === "frontPage" && pageId) {
    return html`${FrontPageMain({ pageId, wpapi })}`;
  }
  if (pageType === "staticPage" && pageId) {
    return html`<div class="w-100 bg-primary my-3" style="height: 15px;"></div>
      ${StaticPageMain({ pageId, wpapi })}`;
  }
  if (pageType === "singlePostPage" && pageId) {
    return html`<div class="w-100 bg-primary my-3" style="height: 15px;"></div>
      ${SinglePostPageMain({ pageId, wpapi })}`;
  }
  if (pageType === "indexPage" && pageNumber) {
    return html`<div class="w-100 bg-primary my-3" style="height: 15px;"></div>
      ${IndexPageMain({ pageNumber, wpapi })}`;
  }
  if (pageType === "categoryPage" && pageNumber && pageTermId && pageTermName) {
    return html`<div class="w-100 bg-primary my-3" style="height: 15px;"></div>
      ${CategoryPageMain({
        pageNumber,
        pageTermId,
        pageTermName,
        wpapi,
      })}`;
  }
  if (pageType === "tagPage" && pageNumber && pageTermId && pageTermName) {
    return html`<div class="w-100 bg-primary my-3" style="height: 15px;"></div>
      ${TagPageMain({
        pageNumber,
        pageTermId,
        pageTermName,
        wpapi,
      })}`;
  }
  if (pageType === "searchPage" && pageNumber && pageTermName) {
    return html`<div class="w-100 bg-primary my-3" style="height: 15px;"></div>
      ${SearchPageMain({ pageNumber, pageTermName, wpapi })}`;
  }
  return;
};

export default Main;
