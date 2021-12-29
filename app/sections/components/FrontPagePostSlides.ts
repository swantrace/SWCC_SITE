// @ts-ignore
import { virtual, html, useEffect } from "haunted";
import { VirtualRenderer } from "haunted/lib/virtual";
// @ts-ignore
import MultipleItemsPerRowCarousel from "./MultipleItemsPerRowCarousel";

type FrontPagePostSlidesOptions = {
  posts: {
    excerpt: string;
    content: string;
    title: string;
    slug: string;
    image: string;
  }[];
};

const FrontPagePostSlides = virtual(((options: FrontPagePostSlidesOptions) => {
  const { posts } = options;
  const items = posts.map((a) => ({
    title: a.title,
    description: a.excerpt
      ? a.excerpt.replace(/(<([^>]+)>)/gi, "")?.substring(0, 100)
      : a.content?.replace(/(<([^>]+)>)/gi, "")?.substring(0, 100) ?? "",
    link: `/${a.slug}`,
    image: a.image,
  }));
  return html`${MultipleItemsPerRowCarousel({
    id: "frontPagePostSlider",
    items,
    nor: 3,
    card: true,
    customCarouselInnerClass: "pb-3",
  })}`;
}) as VirtualRenderer);

export default FrontPagePostSlides;
