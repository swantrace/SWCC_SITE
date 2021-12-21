// @ts-ignore
import { virtual, html } from "haunted";
import { VirtualRenderer } from "haunted/lib/virtual";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

type FrontPageHoursOptions = {
  hours: {
    background_image: string;
    description: string;
  };
};

const FrontPageHours = virtual(((options: FrontPageHoursOptions) => {
  const { hours } = options;

  return html`<div
    id="hours"
    class="d-flex flex-column align-middle justify-content-center pt-5 justify-content-lg-end pt-lg-0"
    style=${`background: url(${
      hours.background_image ?? ""
    }) center / contain no-repeat; height: 337px;`}
  >
    <p
      class="fw-bolder fs-6 text-white text-center mx-auto px-2 px-md-5"
      style="line-height: 1.2;"
    >
      ${unsafeHTML(hours?.description?.replace(/\r\n/g, "<br />") ?? "")}
    </p>
  </div>`;
}) as VirtualRenderer);

export default FrontPageHours;
