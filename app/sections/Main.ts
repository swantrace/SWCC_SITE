// @ts-ignore
import { html, useEffect } from "haunted/compiled";
import useLocalStorage from "../lib/hooks/useLocalStorage";
import WPAPI from "../lib/wpapi";
import FrontPageMain from "./components/FrontPageMain";

const wpapi = WPAPI.getInstance("https://southwinnipegcc.ca");
const Main = ({ pageType, pageId }) => {
  const [pageInfo, setPageInfo] = useLocalStorage(`page_${pageId}`, null);

  useEffect(() => {
    // if (menuInfo.length === 0) {
    wpapi
      .get("pages", {
        _fields: ["acf", "content", "title"],
        include: [Number(pageId)],
      })
      .then(([pageInfo]) => {
        setPageInfo(pageInfo);
      });
    // }
  }, []);

  if (pageType === "frontPage" && pageInfo) {
    return html`${FrontPageMain({ pageInfo })}`;
  }
  return;
};

export default Main;
