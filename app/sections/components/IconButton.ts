// @ts-ignore
import { virtual, html } from "haunted";
import { VirtualRenderer } from "haunted/lib/virtual";

type IconButtonOptions = {
  buttonClass: string;
  iconClass: string;
  iconSrc: string;
  iconTop: number;
  spanClass: string;
  spanContent: string;
};

const IconButton = virtual(((options: IconButtonOptions) => {
  const { buttonClass, iconSrc, iconTop, iconClass, spanClass, spanContent } =
    options;
  return html`<button class=${buttonClass}>
    <img
      src=${iconSrc}
      class=${iconClass}
      style="position: relative; top: ${iconTop}px;"
    />
    <span class=${spanClass}>${spanContent}</span>
  </button>`;
}) as VirtualRenderer);

export default IconButton as (options: IconButtonOptions) => any;
