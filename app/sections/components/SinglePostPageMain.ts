import moment from "moment";
// @ts-ignore
import { virtual, html, useEffect, useState } from "haunted";
import { VirtualRenderer } from "haunted/lib/virtual";
import WPAPI from "../../lib/wpapi";
import useSessionStorage from "../../lib/hooks/useSessionStorage";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
// @ts-ignore
import iconClock from "../../img/icon-clock.png";
// @ts-ignore
import iconUser from "../../img/icon-user.png";
// @ts-ignore
import iconNext from "../../img/icon-next.png";
import Spinner from "./Spinner";

type SinglePostPageMainOptions = {
  wpapi: WPAPI;
  pageId: string;
};

type SinglePostPageInfo = {
  content: string;
  title: string;
  author: string;
  date: string;
  categories: {
    link: string;
    name: string;
  }[];
  tags: {
    link: string;
    name: string;
  };
};

const handleRowPageInfo = (rawPageInfo) => {
  let pageInfo = {
    content: rawPageInfo.content.rendered,
    title: rawPageInfo.title.rendered,
    author: rawPageInfo._embedded.author[0].name,
    date: moment(new Date(rawPageInfo.date)).format("MMMM DD, YYYY"),
    categories:
      rawPageInfo._embedded["wp:term"].find(
        (t) => t?.[0]?.taxonomy === "category"
      ) ?? [],
    tags: rawPageInfo._embedded["wp:term"].find(
      (t) => t?.[0]?.taxonomy === "post_tag"
    ),
  };
  return pageInfo;
};

const SinglePostPageMain = virtual(((options: SinglePostPageMainOptions) => {
  const { pageId, wpapi } = options;
  const [pageInfo, setPageInfo] = useSessionStorage<SinglePostPageInfo>(
    `post_${pageId}`,
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
      .get("posts", {
        _fields: [],
        include: [Number(pageId)],
        _embed: true,
      })
      .then(([rawPageInfo]) => {
        const pageInfo = handleRowPageInfo(rawPageInfo);
        setPageInfo(pageInfo);
      });
  }, []);

  if (pageInfo) {
    return html`<article class="d-flex flex-column align-items-center">
        <h1 class="text-center">${unsafeHTML(pageInfo.title)}</h1>
        <div
          id="date-author-wrapper"
          class="d-flex justify-content-center mt-4 mb-5"
          style="min-width: 250px;"
        >
          <div class="me-4">
            <img src=${iconClock} style="width: 20px;" />
            <span
              class="post-info post-info-date text-uppercase align-middle d-inline-block h-100 fs-3 fw-bolder"
              >${pageInfo.date}</span
            >
          </div>
          <div>
            <img src=${iconUser} style="width: 20px;" />
            <span
              class="post-info post-info-author text-uppercase align-middle d-inline-block h-100 fs-3 fw-bolder"
              >${pageInfo.author}</span
            >
          </div>
        </div>
        <div class="bg-white w-100 mb-5" style="max-width: 666px;">
          ${unsafeHTML(pageInfo.content)}
        </div>
      </article>
      <div
        id="post-pagination"
        class="container-fluid d-flex justify-content-between my-5"
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
            <span class="fw-bolder fs-3">PREVIOUS POST</span>
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
            <span class="fw-bolder fs-3 text-end">NEXT POST</span>
            <span id="next_post_name" class="text-end">${nextPostName}</span>
          </div>
          <img src=${iconNext} style="height: 47px; width: 33px;" />
        </div>
      </div>`;
  } else {
    return html`${Spinner()}`;
  }
}) as VirtualRenderer);

export default SinglePostPageMain;
