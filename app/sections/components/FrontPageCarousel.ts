// @ts-ignore
import { virtual, html, useEffect } from "haunted";
import { VirtualRenderer } from "haunted/lib/virtual";
// @ts-ignore
import Carousel from "../../node_modules/bootstrap/js/src/carousel";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

type CarouselItem = {
  title: string;
  description: string;
  image: number;
};

type FrontPageCarouselOptions = {
  carousel: CarouselItem[];
};

const FrontPageCarousel = virtual(((options: FrontPageCarouselOptions) => {
  useEffect(() => {
    const topCarouselElement = document.querySelector(
      "#frontPageTopCarousel"
    ) as Element;

    if (window.matchMedia("(min-width: 992px)").matches) {
      const topCarousel = new Carousel(topCarouselElement);
    } else {
      const topCarousel = new Carousel(topCarouselElement, { interval: false });
    }
  }, []);
  const { carousel } = options;
  // console.log("carousels: ", carousel);
  return html`<div id="frontPageTopCarousel" class="carousel slide">
    <div class="carousel-indicators d-none d-lg-flex">
      ${carousel.map(
        (slide, index) => html`<button
          type="button"
          data-bs-target="#frontPageTopCarousel"
          data-bs-slide-to=${index}
          class=${index === 0 ? "active" : ""}
          aria-current=${index === 0 ? "true" : ""}
          aria-label=${slide.title}
        ></button>`
      )}
    </div>
    <div class="carousel-inner">
      ${carousel.map(
        (slide, index) => html`<div
          class="carousel-item${index === 0 ? " active" : ""}"
        >
          <img src=${slide.image} class="d-block w-100" alt="..." />
          <div class="carousel-caption d-none d-md-block">
            <h5>${slide.title}</h5>
            <p class="px-1">${unsafeHTML(slide.description)}</p>
          </div>
        </div>`
      )}
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#frontPageTopCarousel"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#frontPageTopCarousel"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>`;
}) as VirtualRenderer);

export default FrontPageCarousel;
