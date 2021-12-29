// @ts-ignore
import { virtual, html, useEffect } from "haunted";
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
import useLocalStorage from "../../lib/hooks/useLocalStorage";
import WPAPI from "../../lib/wpapi";
import useSessionStorage from "../../lib/hooks/useSessionStorage";
import Spinner from "./Spinner";
type Carousel = {
  link: string;
  title: string;
  description: string;
  image: string;
};

type PostSlide = {
  excerpt: string;
  content: string;
  title: string;
  slug: string;
  image: string;
};

type PostSlides = PostSlide[];

type FrontPageInfo = {
  carousel: Carousel[];
  hours: {
    background_image: string;
    description: string;
  };
  welcome_message: {
    title: string;
    description: string;
  };
  default_post_image: string;
  post_slides: PostSlides;
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
  content: string;
  title: string;
};

type FrontPageMainOptions = {
  pageId: string;
  wpapi: WPAPI;
};

type RecentPostInfo = {
  excerpt: string;
  content: string;
  title: string;
  slug: string;
  image: string;
};

type RecentPosts = RecentPostInfo[];

const getPostsFromAcfAndRecentPosts = (
  default_post_image: string,
  post_slides: PostSlides,
  recentPosts: RecentPosts
) => {
  const recentPostsWithDefaultImage = recentPosts.map((p) => ({
    ...p,
    image: p.image ? p.image : default_post_image,
  }));

  return [...post_slides, ...recentPostsWithDefaultImage];
};

const handleRowPageInfo = (rawPageInfo) => {
  let pageInfo = {
    ...rawPageInfo.acf,
    content: rawPageInfo.content.rendered,
    title: rawPageInfo.title.rendered,
    default_post_image: rawPageInfo.acf.post_slides.default_image,
    post_slides: rawPageInfo.acf.post_slides.post_and_image
      ? rawPageInfo.acf.post_slides.post_and_image.map((p) => ({
          excerpt: p.post.post_excerpt,
          content: p.post.post_content,
          title: p.post.post_title,
          slug: p.post.post_name,
          image: p.image ? p.image : rawPageInfo.acf.post_slides.default_image,
        }))
      : [],
  };
  return pageInfo;
};

const FrontPageMain = virtual(((options: FrontPageMainOptions) => {
  const { pageId, wpapi } = options;
  const [pageInfo, setPageInfo] = useLocalStorage<FrontPageInfo>(
    `page_${pageId}`,
    null as any
  );

  const [recentPosts, setRecentPosts] = useSessionStorage<RecentPosts>(
    "home_recent_posts",
    []
  );

  useEffect(() => {
    // if (menuInfo.length === 0) {
    if (recentPosts.length) {
      if (!pageInfo) {
        wpapi
          .get("pages", {
            _fields: ["acf", "content", "title"],
            include: [Number(pageId)],
          })
          .then(([rawPageInfo]) => {
            const pageInfo = handleRowPageInfo(rawPageInfo);
            setPageInfo(pageInfo);
          });
      }
    } else {
      wpapi
        .get("posts", {
          _fields: [],
          per_page: 6,
          _embed: true,
        })
        .then((rawRecentPosts) => {
          const recentPosts = rawRecentPosts.map((p) => ({
            excerpt: p.excerpt.rendered,
            content: p.content.rendered,
            title: p.title.rendered,
            slug: p.slug,
            image:
              p._embedded?.["wp:featuredmedia"]?.[0]?.["source_url"] ?? null,
          }));
          setRecentPosts(recentPosts);
          if (!pageInfo) {
            wpapi
              .get("pages", {
                _fields: ["acf", "content", "title"],
                include: [Number(pageId)],
              })
              .then(([rawPageInfo]) => {
                const pageInfo = handleRowPageInfo(rawPageInfo);
                setPageInfo(pageInfo);
              });
          }
        });
    }
  }, []);

  if (pageInfo) {
    const {
      carousel,
      hours,
      welcome_message,
      default_post_image,
      post_slides,
      newsletter_form,
      announcement,
      tweets,
      contact_us_form,
      sponsors,
    } = pageInfo;

    const posts = getPostsFromAcfAndRecentPosts(
      default_post_image,
      post_slides,
      recentPosts
    );
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
        ${FrontPagePostSlides({ posts })}
        <p class="text-center mb-0 mt-4">
          <a href="/news-events" class="text-center">Read More</a>
        </p>
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
  } else {
    return html`${Spinner()}`;
  }
}) as VirtualRenderer);

export default FrontPageMain;
