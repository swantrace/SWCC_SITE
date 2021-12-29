// @ts-ignore
import { virtual, html } from "haunted";
import { VirtualRenderer } from "haunted/lib/virtual";

type FrontPageNewsletterFormOptions = {
  newsletter_form: {
    title: string;
    description: string;
    form_action: string;
    hidden_input_name: string;
    background_image: string;
  };
};

const FrontPageNewsletterForm = virtual(((
  options: FrontPageNewsletterFormOptions
) => {
  const { newsletter_form } = options;
  return html`<div class="card px-0">
    <img
      class="card-img w-100 d-block"
      id="newsletter-bg-img"
      src=${newsletter_form.background_image}
    />
    <div
      class="card-img-overlay d-flex flex-wrap px-1 px-md-5"
      id="newsletter-wrapper"
    >
      <div
        id="newsletter-text"
        class="d-flex flex-column justify-content-center pe-5"
      >
        <h1 class="text-white">${newsletter_form.title}</h1>
        <p class="text-white fs-1">${newsletter_form.description}</p>
      </div>
      <div class="flex-fill d-flex align-items-center" id="newsletter-form">
        <form
          action=${newsletter_form.form_action}
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          class="validate w-100"
          target="_blank"
          novalidate
        >
          <div class="input-group">
            <input
              required
              class="form-control"
              type="email"
              value=""
              name="EMAIL"
              placeholder="Your Email Address ..."
            />
            <div style="position: absolute; left: -5000px;" aria-hidden="true">
              <input
                type="text"
                name=${newsletter_form.hidden_input_name}
                tabindex="-1"
                value=""
              />
            </div>
            <button
              class="btn bg-secondary rounded-0 text-white fs-6 fw-bolder"
              type="submit"
              value="Subscribe"
              name="subscribe"
              id="mc-embedded-subscribe"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>`;
}) as VirtualRenderer);

export default FrontPageNewsletterForm;
