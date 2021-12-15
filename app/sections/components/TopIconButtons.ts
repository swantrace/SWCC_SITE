//@ts-ignore
import { virtual, html } from "haunted";
import IconButton from "./IconButton";
//@ts-ignore
import greenDonaitionImg from "../../img/icon-donation-green.png";
//@ts-ignore
import greenTranslateImage from "../../img/icon-translate-green.png";
//@ts-ignore
import greenCalendarImg from "../../img/icon-calendar-green.png";

const TopIconButtons = () => {
  return html`<div
    id="top-buttons"
    class="d-none d-lg-flex justify-content-md-end"
  >
    ${IconButton({
      buttonClass: "btn fw-bolder bg-light text-primary rounded-0 me-lg-2 fs-1",
      iconClass: "",
      iconSrc: greenDonaitionImg,
      iconTop: -3,
      spanClass: "ms-1",
      spanContent: "DONATE NOW",
    })}
    ${IconButton({
      buttonClass: "btn fw-bolder bg-light text-primary rounded-0 me-lg-2 fs-1",
      iconClass: "",
      iconSrc: greenTranslateImage,
      iconTop: -2,
      spanClass: "ms-1",
      spanContent: "TRANSLATE",
    })}
    ${IconButton({
      buttonClass: "btn fw-bolder bg-light text-primary rounded-0 me-lg-3 fs-1",
      iconClass: "",
      iconSrc: greenCalendarImg,
      iconTop: -1,
      spanClass: "ms-1",
      spanContent: "CALENDAR",
    })}
  </div>`;
};

export default virtual(TopIconButtons);
