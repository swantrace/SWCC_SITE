// @ts-ignore
import { virtual, html, useEffect } from "haunted/compiled";
import { VirtualRenderer } from "haunted/lib/virtual";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

type FrontPageTweetsOptions = {
  tweets: string;
};

const FrontPageTweets = virtual(((options: FrontPageTweetsOptions) => {
  useEffect(() => {
    const scriptElement = document.querySelector(
      "#recent-tweets-wrapper script"
    );
    const scriptSrc =
      scriptElement?.getAttribute("src") ??
      "https://platform.twitter.com/widgets.js";
    const newScriptElement = document.createElement("script");
    newScriptElement.src = scriptSrc;
    document.body.appendChild(newScriptElement);
  }, []);
  const { tweets } = options;
  return html`<h3
      class="text-center communication-area-title bg-primary text-white"
      style="line-height: 47px"
    >
      RECENT TWEETS
    </h3>
    <div style="overflow-y: scroll; height:530px;">${unsafeHTML(tweets)}</div>`;
}) as VirtualRenderer);

export default FrontPageTweets;
