// @ts-ignore
import { virtual, html } from "haunted";
import { VirtualRenderer } from "haunted/lib/virtual";

type FrontPageAnnouncementOptions = {
  announcement: {
    text: string;
    image: string;
  };
};

const FrontPageAnnouncement = virtual(((
  options: FrontPageAnnouncementOptions
) => {
  const { announcement } = options;
  return html` <h3
      class="text-center text-white communication-area-title mb-3 bg-primary"
      style="line-height: 47px;"
    >
      ANNOUNCEMENT
    </h3>
    <div
      class="text-start announcement-description d-flex flex-column justify-content-between flex-fill"
    >
      <p style="line-height: 30px;">${announcement.text}</p>
      <img class="d-block" src=${announcement.image} />
    </div>`;
}) as VirtualRenderer);

export default FrontPageAnnouncement;
