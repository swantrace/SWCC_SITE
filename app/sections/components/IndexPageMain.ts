// @ts-ignore
import { virtual, html, useEffect } from "haunted";
import { VirtualRenderer } from "haunted/lib/virtual";
import useSessionStorage from "../../lib/hooks/useSessionStorage";
import WPAPI from "../../lib/wpapi";
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
  link: string;
};

type Posts = Post[];

const IndexPageMain = virtual(((options: IndexPageMainOptions) => {
  const { pageNumber, wpapi } = options;
  const [posts, setPosts] = useSessionStorage<Posts>(
    `index_posts_${pageNumber}`,
    []
  );

  useEffect(() => {
    wpapi
      .get("posts", {
        _fields: ["content", "title", "link"],
        page: Number(pageNumber),
      })
      .then((rawPosts) => {
        const posts = rawPosts.map((p) => ({
          content: p.content.rendered,
          title: p.title.rendered,
          link: p.link,
        }));
        setPosts(posts);
      });
  }, []);

  if (posts.length) {
    return html`${posts.map(
      (p) => html`
        <h2><a href=${p.link}>${p.title}</a></h2>
        <div>${unsafeHTML(p.content)}</div>
      `
    )}`;
  } else {
    return html`${Spinner()}`;
  }
}) as VirtualRenderer);

export default IndexPageMain;
