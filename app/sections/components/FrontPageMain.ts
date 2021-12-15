// @ts-ignore
import { virtual, html } from "haunted/compiled";
import { VirtualRenderer } from "haunted/lib/virtual";
import FrontPageCarousel from "./FrontPageCarousel";
import FrontPageHours from "./FrontPageHours";
import FrontPageWelcomeMessage from "./FrontPageWelcomeMessage";
import FrontPagePostSlides from "./FrontPagePostSlides";
import FrontPageNewsletterForm from "./FrontPageNewsletterForm";
import FrontPageAnnouncement from "./FrontPageAnnouncement";
import FrontPageTweets from "./FrontPageTweets";
import FrontPageContactUs from "./FrontPageContactUs";
import FrontPageSponsors from "./FrontPageSponsors";
type Carousel = {
  link: string;
  title: string;
  description: string;
  image: string;
};

type FrontPageInfo = {
  acf: {
    carousel: Carousel[];
    hours: {
      background_image: string;
      description: string;
    };
    welcome_message: {
      title: string;
      description: string;
    };
    post_slides: {
      default_image: string;
      post_and_image: {
        post: {
          post_content: string;
          post_title: string;
        };
        image: string;
      };
    }[];
    newsletter_form: {
      title: string;
      description: string;
      form_action: string;
      hidden_input_name: string;
      background_image: string;
    };
    announcement: {
      text: string;
      image: string;
    };
    tweets: string;
    contact_us_form: string;
    sponsors: string[];
  };
  content: {
    rendered: string;
  };
  title: {
    rendered: string;
  };
};

type FrontPageMainOptions = {
  pageInfo: FrontPageInfo;
};

const FrontPageMain = virtual(((options: FrontPageMainOptions) => {
  const {
    pageInfo: { acf },
  } = options;

  const {
    carousel,
    hours,
    welcome_message,
    post_slides,
    newsletter_form,
    announcement,
    tweets,
    contact_us_form,
    sponsors,
  } = acf;

  return html`${FrontPageCarousel({ carousel })}
    <div
      class="bg-white py-3 px-lg-5 container-fluid"
      id="hours-welcome-wrapper"
    >
      <div class="row justify-content-center">
        <div
          class="col-12 col-lg-4"
          style="flex-basis: 371px; max-width: 100%;"
        >
          ${FrontPageHours({ hours })}
        </div>
        <div class="col-12 col-lg-8 px-2 py-2 px-lg-0">
          ${FrontPageWelcomeMessage({ welcome_message })}
        </div>
      </div>
    </div>
    <div
      class="bg-white py-3 px-2 px-lg-5 container-fluid"
      id="blog-carousel-wrapper"
    >
      ${FrontPagePostSlides({ post_slides })}
    </div>
    <div class="bg-white py-3 px-0 container-fluid" id="newsletter_wrapper">
      <div class="row gx-0">
        <div class="col">${FrontPageNewsletterForm({ newsletter_form })}</div>
      </div>
    </div>
    <div class="container-fluid" id="announcement-tweets-contact-wrapper">
      <div class="row">
        <div
          class="col-12 col-md-4 mb-3 mb-md-0 d-flex flex-column"
          id="announcement-wrapper"
        >
          ${FrontPageAnnouncement({ announcement })}
        </div>
        <div
          class="col-12 col-md-4 mb-3 mb-md-0 pe-4 pe-md-2_5 border-start border-end border-primary"
          id="recent-tweets-wrapper"
        >
          ${FrontPageTweets({ tweets })}
        </div>
        <div class="col-12 col-md-4" id="contact-us-wrapper">
          ${FrontPageContactUs({ contact_us_form })}
        </div>
      </div>
    </div>
    <div
      class="bg-white py-3 px-0 container-fluid"
      id="sponsor-carousel-wrapper"
    >
      ${FrontPageSponsors({ sponsors })};
    </div>`;
}) as VirtualRenderer);

export default FrontPageMain;
