// @ts-ignore
import { virtual, html } from "haunted";
import { VirtualRenderer } from "haunted/lib/virtual";

type FrontPageWelcomeMessageOptions = {
  welcome_message: {
    title: string;
    description: string;
  };
};

const FrontPageWelcomeMessage = virtual(((
  options: FrontPageWelcomeMessageOptions
) => {
  const { welcome_message } = options;
  return html`<h1
      id="welcome-message-title"
      class="title pt-md-4_5 fw-bolder text-center text-lg-start text-primary mt-5"
      style="line-height: 1.2; letter-spacing: -0.1px;"
    >
      ${welcome_message.title}
    </h1>
    <p
      id="welcome-message-description"
      class="px-1 ps-md-2 fs-2 tex-center text-lg-start"
      style="line-height: 1.9"
    >
      ${welcome_message.description}
    </p>`;
}) as VirtualRenderer);

export default FrontPageWelcomeMessage;
