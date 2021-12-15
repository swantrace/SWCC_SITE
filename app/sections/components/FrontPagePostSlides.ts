// @ts-ignore
import { virtual, html, useEffect } from "haunted";
import { VirtualRenderer } from "haunted/lib/virtual";
// @ts-ignore
import MultipleItemsPerRowCarousel from "./MultipleItemsPerRowCarousel";

type FrontPagePostSlidesOptions = {
  post_slides: {
    default_image: string;
    post_and_image: {
      post: {
        post_content: string;
        post_excerpt: string;
        post_title: string;
        post_name: string;
      };
      image: string;
    }[];
  };
};

const FrontPagePostSlides = virtual(((options: FrontPagePostSlidesOptions) => {
  const { post_slides } = options;
  const items = post_slides.post_and_image.map((a) => ({
    title: a.post.post_title,
    description: a.post.post_excerpt
      ? a.post.post_excerpt
      : a.post.post_content?.replace(/(<([^>]+)>)/gi, "")?.substring(0, 100) ??
        "",
    link: `/${a.post.post_name}`,
    image: a.image,
  }));
  return html`${MultipleItemsPerRowCarousel({
    id: "frontPagePostSlider",
    items,
    nor: 3,
    card: true,
  })}`;
}) as VirtualRenderer);

export default FrontPagePostSlides;
