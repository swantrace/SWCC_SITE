// @ts-ignore
import { virtual, html, useEffect } from "haunted/compiled";
import { VirtualRenderer } from "haunted/lib/virtual";
// @ts-ignore
import Carousel from "../../node_modules/bootstrap/js/src/carousel";

type MultipleItemsPerRowCarouselOptions = {
  nor: number;
  id: string;
  items: { title: string; description: string; link: string; image: string }[];
  card: boolean;
};

const MultipleItemsPerRowCarousel = virtual(((
  options: MultipleItemsPerRowCarouselOptions
) => {
  const { nor, id, items, card } = options;
  useEffect(() => {
    const sponsorsSliderElement = document.querySelector(`#${id}`) as Element;
    const sponsorsSlider = new Carousel(sponsorsSliderElement);
    sponsorsSliderElement
      .querySelectorAll(".carousel .carousel-item")
      .forEach((itemElement) => {
        const minPerSlide = nor + 1;
        let nextElement = itemElement.nextElementSibling;
        if (nextElement === null) {
          nextElement = itemElement?.parentElement?.children[0] ?? null;
        }
        console.log(nextElement);
        const cloned = (nextElement as Element).children[0].cloneNode(true);
        itemElement.appendChild(cloned);
        for (let i = 0; i < minPerSlide; i++) {
          nextElement = (nextElement as Element).nextElementSibling;
          if (!nextElement) {
            nextElement = itemElement?.parentElement?.children[0] ?? null;
          }
          const cloned = (nextElement as Element).children[0].cloneNode(true);
          itemElement.appendChild(cloned);
        }
      });
  }, []);
  // console.log(id);
  return html`<div class="container">
    <div class="row mx-auto">
      <div class="carousel slide" id=${id}>
        <div class="carousel-indicators d-none d-lg-flex">
          ${items.map(
            (item, index) => html`<button
              type="button"
              data-index=${index}
              data-bs-target=${`#${id}`}
              data-bs-slide-to=${index}
              class=${index === 0 ? "active" : ""}
              aria-current=${index === 0 ? "true" : ""}
              aria-label=${item.title}
            ></button>`
          )}
        </div>
        <div class="carousel-inner">
          ${items.map(
            (item, index) => html`<div
              data-index=${index}
              class="carousel-item${index === 0 ? " active" : ""}"
            >
              <div class=${`col-md-${12 / nor}`}>
                ${card
                  ? html`<div class="card shadow">
                      <div class="img-wrapper w-100">
                        <img
                          class="w-100"
                          src=${item.image}
                          style="height: 250px;object-position: left top;"
                        />
                      </div>
                      <div
                        class="card-body d-flex flex-column justify-content-between"
                      >
                        <h5 class="card-title text-primary mb-2 fw-bolder">
                          ${item.title}
                        </h5>
                        <p class="card-text text-justify fs-2">
                          ${item.description}
                        </p>
                        <a
                          href=${item.link}
                          class="btn border-primary bg-white fw-bolder rounded-0"
                          type="button"
                        >
                          View Details &gt;&gt;
                        </a>
                      </div>
                    </div>`
                  : html`<img
                      src=${item.image}
                      class="d-block w-100"
                      alt=${item.title}
                    />`}
              </div>
            </div>`
          )}
        </div>
        <div class="carousel-controllers">
          <a
            class="carousel-control-prev"
            href="#"
            role="button"
            data-bs-slide="prev"
            data-bs-target=${`#${id}`}
            ><span class="carousel-control-prev-icon"></span
            ><span class="visually-hidden">Previous</span></a
          >
          <a
            class="carousel-control-next"
            href="#"
            role="button"
            data-bs-slide="next"
            data-bs-target=${`#${id}`}
            ><span class="carousel-control-next-icon"></span
            ><span class="visually-hidden">Next</span></a
          >
        </div>
      </div>
    </div>
    <style>
      ${`@media (max-width: 768px) {
        #${id} .carousel-inner .carousel-item > div {
          display: none;
        }
        #${id} .carousel-inner .carousel-item > div:first-child {
          display: block;
        }
      }

      #${id} .carousel-inner .carousel-item.active,
      #${id} .carousel-inner .carousel-item-next,
      #${id} .carousel-inner .carousel-item-prev {
        display: flex;
      }

      /* display 3 */
      @media (min-width: 768px) {
        #${id} .carousel-inner .carousel-item-end.active,
        #${id} .carousel-inner .carousel-item-next {
          transform: translateX(${100 / nor}%);
        }

        #${id} .carousel-inner .carousel-item-start.active,
        #${id} .carousel-inner .carousel-item-prev {
          transform: translateX(-${100 / nor}%);
        }
      }

      #${id} .carousel-inner .carousel-item-start,
      #${id} .carousel-inner .carousel-item-end {
        transform: translateX(0);
      }
    `}
    </style>
  </div>`;
}) as VirtualRenderer);

export default MultipleItemsPerRowCarousel as (
  options: MultipleItemsPerRowCarouselOptions
) => any;
