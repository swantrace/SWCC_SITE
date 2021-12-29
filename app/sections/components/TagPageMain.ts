// @ts-ignore
import { virtual, html, useEffect } from "haunted";
import { VirtualRenderer } from "haunted/lib/virtual";
import WPAPI from "../../lib/wpapi";
import useSessionStorage from "../../lib/hooks/useSessionStorage";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import Spinner from "./Spinner";

type TagPageMainOptions = {
  wpapi: WPAPI;
  pageNumber: string;
  pageTermId: string;
  pageTermName: string;
};

type Post = {
  content: string;
  title: string;
  date: string;
};

type Posts = Post[];

const TagPageMain = virtual(((options: TagPageMainOptions) => {
  const { pageNumber, wpapi, pageTermId, pageTermName } = options;
  const [posts, setPosts] = useSessionStorage<Posts>(
    `${pageTermId}_posts_${pageNumber}`,
    []
  );

  useEffect(() => {
    wpapi
      .get("posts", {
        _fields: ["content", "title", "date"],
        page: Number(pageNumber) === 0 ? 1 : Number(pageNumber),
        tags: [pageTermId],
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

export default TagPageMain;
