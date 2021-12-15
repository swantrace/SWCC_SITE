// @ts-ignore
import { virtual, html } from "haunted/compiled";
import { VirtualRenderer } from "haunted/lib/virtual";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

type FrontPageContactUsOptions = {
  contact_us_form: string;
};

const FrontPageContactUs = virtual(((options: FrontPageContactUsOptions) => {
  const { contact_us_form } = options;
  return html`<h3
      class="text-center communication-area-title bg-primary text-white"
      style="line-height: 47px;"
    >
      CONTACT US
    </h3>
    <div
      id="contact-us-form-wrapper"
      class="px-3 flex-fill"
      style="margin-top: 24px;"
    >
      ${unsafeHTML(contact_us_form)}
    </div>`;
}) as VirtualRenderer);

export default FrontPageContactUs;
