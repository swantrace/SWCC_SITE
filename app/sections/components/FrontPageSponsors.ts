// @ts-ignore
import { virtual, html, useEffect } from "haunted";
import { VirtualRenderer } from "haunted/lib/virtual";
// @ts-ignore
import Carousel from "../../node_modules/bootstrap/js/src/carousel";
import MultipleItemsPerRowCarousel from "./MultipleItemsPerRowCarousel";

type FrontPageSponsorsOptions = {
  sponsors: { title: string; url: string }[];
};

const FrontPageSponsors = virtual(((options: FrontPageSponsorsOptions) => {
  const { sponsors } = options;
  const items = sponsors.map((a) => ({
    title: a.title,
    image: a.url,
    link: "",
    description: "",
  }));
  return html`<h1 class="text-center bg-primary text-white">OUR SPONSORS</h1>
    <div
      id="sponsor-carousel-wrapper"
      class="mx-auto"
      style="max-width: 1000px;"
    >
      ${MultipleItemsPerRowCarousel({
        items,
        id: "frontPageSponsorsSlider",
        nor: 4,
        card: false,
      })}
    </div>`;
}) as VirtualRenderer);

export default FrontPageSponsors;
