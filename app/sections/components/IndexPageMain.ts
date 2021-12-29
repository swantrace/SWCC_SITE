// @ts-ignore
import { virtual, html, useEffect } from "haunted";
import { VirtualRenderer } from "haunted/lib/virtual";
import useLocalStorage from "../../lib/hooks/useLocalStorage";
import WPAPI from "../../lib/wpapi";
import useSessionStorage from "../../lib/hooks/useSessionStorage";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import Spinner from "./Spinner";

type IndexPageMainOptions = {
  wpapi: WPAPI;
  pageNumber: string;
};

type IndexPageInfo = {
  content: string;
  title: string;
};

type Post = {
  content: string;
  title: string;
  date: string;
};

type Posts = Post[];

const IndexPageMain = virtual(((options: IndexPageMainOptions) => {
  const { pageNumber, wpapi } = options;
  const [posts, setPosts] = useLocalStorage<Posts>(
    `index_posts_${pageNumber}`,
    []
  );

  useEffect(() => {
    wpapi
      .get("posts", {
        _fields: ["content", "title"],
        page: Number(pageNumber),
      })
      .then((rawPosts) => {
        const posts = rawPosts.map((p) => ({
          content: p.content.rendered,
          title: p.title.rendered,
        }));
        setPosts(posts);
      });
  }, []);

  if (posts.length) {
    return html`${posts.map(
      (p) => html`
        <h2>${p.title}</h2>
        <div>${unsafeHTML(p.content)}</div>
      `
    )}`;
  } else {
    return html`${Spinner()}`;
  }
}) as VirtualRenderer);

export default IndexPageMain;
