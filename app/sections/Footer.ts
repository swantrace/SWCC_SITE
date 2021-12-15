// @ts-ignore
import { html, useEffect } from "haunted/compiled";
// @ts-ignore
import useLocalStorage from "../lib/hooks/useLocalStorage";
import WPAPI from "../lib/wpapi";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

const wpapi = WPAPI.getInstance("https://southwinnipegcc.ca");

const Footer = ({ sidebarId }) => {
  const [footerInfo, setFooterInfo] = useLocalStorage(
    `sidebar_${sidebarId}`,
    []
  );

  useEffect(() => {
    if (!footerInfo || footerInfo.length === 0) {
      wpapi
        .get("widgets", {
          sidebar: sidebarId,
          _fields: ["rendered"],
        })
        .then((footerInfo) => setFooterInfo(footerInfo));
    }
  }, []);
  return html`<div class="container-fluid bg-secondary p-4">
      <div class="row">
        ${(footerInfo ?? [])
          .map(({ rendered: widgetString }) => {
            const re =
              /^<div class="textwidget custom-html-widget">(.+)<\/div>$/ms;
            return (widgetString as any).match(re)[1];
          })
          .map((string) => {
            return html`${unsafeHTML(string)}`;
          })}
      </div>
    </div>
    <div
      id="copy-right"
      class="bg-primary text-center text-white fw-bold fs-2 px-5 py-3"
    >
      South Winnipeg Community Centre | Copyright @2022 | Powered by IDO Media
    </div>`;
};

export default Footer;
