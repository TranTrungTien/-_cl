import { useMemo } from "react";
import { RelatedVideo } from "../../components";
import { servicesPath } from "../../services/services_path";
import { useFetchSuspense } from "../../hooks/useFetchSuspense";
import { IVideo } from "../../interfaces/video.interface";
import { covertVideoTime } from "../../utils/covert_date";
import { IStatistics } from "../../interfaces/statistic";

type Props = {
  videoIdf: string;
};
const RelatedVideoContainer = ({ videoIdf }: Props) => {
  const relatedVideoParams = useMemo(() => {
    return {
      videoId: `${videoIdf}`,
      limit: 15,
    };
  }, [videoIdf]);
  const relatedVideo = useFetchSuspense<{
    message: string;
    list: IVideo[];
    statistics: IStatistics[];
  }>(servicesPath.GET_RELATED_RECOMMENDED, relatedVideoParams);

  return (
    <div className="flex flex-col justify-start items-start space-y-6 w-full h-full mt-6">
      {relatedVideo &&
        relatedVideo.list &&
        relatedVideo.list.map((video, index) => {
          const likeCount = relatedVideo?.statistics.find(
            (statistic) => statistic.video_id === video._id
          );
          return (
            <RelatedVideo
              likedCount={likeCount?.like_count}
              time={covertVideoTime(video.duration)}
              key={index}
              coverImage={video.origin_cover.url_list[0]}
              desc={video.desc}
              nickname={video.author_id.nickname}
            />
          );
        })}
    </div>
  );
};

export default RelatedVideoContainer;
