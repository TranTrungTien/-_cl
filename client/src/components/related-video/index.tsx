import React from "react";
import { Link } from "react-router-dom";
import Heart from "../heart";
import TimeFooter from "../timefooter";
import VideoCard from "../videocard";
import VideoCardFooter from "../videocardfooter";

type Props = {
  video: {
    desc: string;
    link: string;
    local_link: string;
    author: string;
  };
};
const RelatedVideo = ({ video }: Props) => {
  return (
    <div className="flex justify-start items-start space-x-2 w-full h-full">
      <VideoCard width="w-[120px]" height="h-[90px]">
        <VideoCardFooter>
          <TimeFooter bottom="bottom-1" right="right-2" time="11:32" />
        </VideoCardFooter>
      </VideoCard>
      <div className="flex-1 h-[90px] flex flex-col justify-between items-start space-y-1">
        <h1 className="block w-full font-medium text-sm opacity-90 leading-[22px] flex-1 truncate-n-line">
          {video.desc}
        </h1>
        <div className="flex justify-between items-center w-full">
          <Heart styleArray="font-medium leading-5 text-xs opacity-70" />
          <Link to="/user">
            <span className="font-normal leading-5 text-xs opacity-70 truncate">
              {video.author}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RelatedVideo;
