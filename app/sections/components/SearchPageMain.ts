// @ts-ignore
import { virtual, html, useEffect } from "haunted";
import { VirtualRenderer } from "haunted/lib/virtual";
import useLocalStorage from "../../lib/hooks/useLocalStorage";
import WPAPI from "../../lib/wpapi";
import useSessionStorage from "../../lib/hooks/useSessionStorage";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { useState } from "haunted";
import Spinner from "./Spinner";

type SearchPageMainOptions = {
  wpapi: WPAPI;
  pageNumber: string;
  pageTermName: string;
};

type Result = {
  title: string;
  url: string;
};

type Results = Result[];

const SearchPageMain = virtual(((options: SearchPageMainOptions) => {
  const { pageNumber, wpapi, pageTermName } = options;
  const [results, setResults] = useState<Results>([]);

  useEffect(() => {
    wpapi
      // @ts-ignore
      .get("search", {
        _fields: ["url", "title"],
        page: Number(pageNumber),
        search: pageTermName,
      })
      .then((results) => {
        setResults(results);
      });
  }, []);

  if (results.length) {
    return html`${results.map(
      (r) => html`
        <h2>${r.url}</h2>
        <div>${r.title}</div>
      `
    )}`;
  } else {
    return html`${Spinner()}`;
  }
}) as VirtualRenderer);

export default SearchPageMain;
