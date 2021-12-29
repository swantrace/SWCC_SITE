// @ts-ignore
import { virtual, html, useEffect, useState } from "haunted";
import { VirtualRenderer } from "haunted/lib/virtual";
import useLocalStorage from "../../lib/hooks/useLocalStorage";
import WPAPI from "../../lib/wpapi";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
// @ts-ignore
import iconNext from "../../img/icon-next.png";
import Spinner from "./Spinner";

type StaticPageMainOptions = {
  wpapi: WPAPI;
  pageId: string;
};

type StaticPageInfo = {
  content: string;
  title: string;
};

const handleRowPageInfo = (rawPageInfo) => {
  let pageInfo = {
    content: rawPageInfo.content.rendered,
    title: rawPageInfo.title.rendered,
  };
  return pageInfo;
};

const StaticPageMain = virtual(((options: StaticPageMainOptions) => {
  const { pageId, wpapi } = options;
  const [pageInfo, setPageInfo] = useLocalStorage<StaticPageInfo>(
    `page_${pageId}`,
    null as any
  );

  const [previousPostName, setPreviousPostName] = useState<string>("");
  const [previousPostUrl, setPreviousPostUrl] = useState<string>("");
  const [nextPostName, setNextPostName] = useState<string>("");
  const [nextPostUrl, setNextPostUrl] = useState<string>("");

  useEffect(() => {
    // @ts-ignore
    const navigationElement = document.querySelector("#navigation").content;
    const previousPostLinkElement =
      navigationElement?.querySelector("#previous_post_link a") ?? null;
    const previousPostUrl = previousPostLinkElement?.href ?? "";
    const previousPostName = previousPostLinkElement?.innerText ?? "";
    const nextPostLinkElement =
      navigationElement?.querySelector("#next_post_link a") ?? null;
    const nextPostUrl = nextPostLinkElement?.href ?? "";
    const nextPostName = nextPostLinkElement?.innerText ?? "";

    setPreviousPostName(previousPostName);
    setPreviousPostUrl(previousPostUrl);
    setNextPostName(nextPostName);
    setNextPostUrl(nextPostUrl);

    wpapi
      .get("pages", {
        _fields: ["content", "title"],
        include: [Number(pageId)],
      })
      .then(([rawPageInfo]) => {
        const pageInfo = handleRowPageInfo(rawPageInfo);
        setPageInfo(pageInfo);
      });
  }, []);

  if (pageInfo) {
    return html`<article class="d-flex flex-column align-items-center">
        <h1 class="text-center">${unsafeHTML(pageInfo.title)}</h1>
        <div class="bg-white w-100 mb-5" style="max-width: 666px;">
          ${unsafeHTML(pageInfo.content)}
        </div>
      </article>
      <div
        id="post-pagination"
        class="container-fluid d-flex justify-content-between my-5 d-none"
      >
        <div
          id="previous_post_link_wrapper"
          class="d-flex"
          style="cursor: pointer;"
          @click=${(e) => {
            if (previousPostUrl) {
              location.href = previousPostUrl;
            }
          }}
        >
          <img
            src=${iconNext}
            style="transform: rotate(180deg); height: 47px; width: 33px;"
          />
          <div class="d-flex flex-column">
            <span class="fw-bolder fs-3">PREVIOUS PAGE</span>
            <span id="previous_post_name">${previousPostName}</span>
          </div>
        </div>
        <div
          id="next_post_link_wrapper"
          class="d-flex"
          style="cursor: pointer;"
          @click=${(e) => {
            if (nextPostUrl) {
              location.href = nextPostUrl;
            }
          }}
        >
          <div class="d-flex flex-column">
            <span class="fw-bolder fs-3 text-end">NEXT PAGE</span>
            <span id="next_post_name" class="text-end">${nextPostName}</span>
          </div>
          <img src=${iconNext} style="height: 47px; width: 33px;" />
        </div>
      </div>`;
  } else {
    return html`${Spinner()}`;
  }
}) as VirtualRenderer);

export default StaticPageMain;
