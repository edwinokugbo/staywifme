import LatestPosts from "components/Posts/LatestPosts";
import React from "react";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
} from "react-twitter-embed";

function RightSidebar() {
  return (
    <div>
      <div className="mt-4 mb-8 px-4">
        <h1 className="text-xl text-global-blue">
          Trending Video
        </h1>
        <hr className="mt-2 mb-4" />
        <iframe
          width="auto"
          height="auto"
          src="https://www.youtube.com/embed/Wft5lNTcKkE"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full border-2 border-black rounded-sm"
        ></iframe>
      </div>
      <hr className="mt-2 mb-4" />
      <div className="mt-4 px-4">
        <h1 className="text-xl text-global-blue">
          Twitter Stream
        </h1>
        <hr className="mt-2 mb-4" />
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="saurabhnemade"
          options={{ height: 400 }}
        />
      </div>
      <div>
        <h1 className="text-xl text-global-blue py-4 px-4">
          Latest Posts
        </h1>
        <LatestPosts />
      </div>
    </div>
  );
}

export default RightSidebar;
