import { UIEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LikeFooter from "../../components/like_footer";
import UserBoxHeader from "../../components/user_box_header";
import VideoBadge from "../../components/video_badge";
import VideoCard from "../../components/video_card";
import { IVideo } from "../../interfaces/video.interface";
import { getData } from "../../services/app_services";
import { servicesPath } from "../../services/services_path";
import VideoCardFooter from "../video_card_footer_container";
import VideoContainer from "../video_container";
import { RightBarAction } from "../video_slide";
type Props = {
  isFollow?: boolean;
  my_id?: string;
  author_id: string;
  uid: string;
  user_id: string;
  avatar_thumb: string;
  nickname: string;
  handleCloseUserBox: (action: RightBarAction) => void;
};
const UserContainer = ({
  my_id,
  isFollow,
  uid,
  user_id,
  author_id,
  avatar_thumb,
  nickname,
  handleCloseUserBox,
}: Props) => {
  const [ownVideos, setOwnVideos] = useState<null | {
    message: string;
    list: IVideo[];
  }>(null);
  const [cursor, setCursor] = useState(0);
  useEffect(() => {
    const fetchVideo = async () => {
      const videoRes = await getData<{
        message: string;
        video_count: number;
        list: IVideo[];
      }>(servicesPath.GET_VIDEO_BY_USER, {
        author_id: author_id,
        cursor: cursor,
        limit: 15,
      }).catch(console.error);
      if (videoRes && videoRes.data) {
        const d = videoRes.data;
        setOwnVideos((preState) => {
          if (!preState) {
            return d;
          } else {
            return {
              ...preState,
              list: [...preState.list, ...d.list],
            };
          }
        });
      }
    };
    if (author_id) {
      fetchVideo();
    }
  }, [author_id, cursor]);

  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    const toBottom =
      e.currentTarget.scrollHeight -
      e.currentTarget.scrollTop -
      e.currentTarget.clientHeight;
    if (toBottom <= 0) {
      setCursor((pre) => ++pre);
    }
  };

  return (
    <section className="w-full h-full overflow-hidden">
      <UserBoxHeader
        my_id={my_id}
        isFollow={isFollow}
        user_id={user_id}
        uid={uid}
        avatar_thumb={avatar_thumb}
        nickname={nickname}
        handleCloseUserBox={handleCloseUserBox}
      />
      <div
        onScroll={onScroll}
        className="h-[calc(100%-70px)] w-full overflow-x-hidden overflow-y-auto hidden-scrollbar"
      >
        <VideoContainer
          gridCol="laptop:grid-cols-2 desktop:grid-cols-3"
          px="laptop:px-3 "
          py="py-2"
          gapY="laptop:gap-y-2 desktop:gap-y-3"
          gapX="laptop:gap-x-2 desktop:gap-x-3"
        >
          {ownVideos &&
            ownVideos.list.map((video) => {
              return (
                <Link
                  key={video.id_f}
                  className="inline-block overflow-hidden self-center h-full"
                  target="_blank"
                  to={`/video/${video._id}/${video.id_f}`}
                >
                  <VideoCard
                    cover_image={video.origin_cover.url_list[0]}
                    styleArray="mx-auto laptop:max-w-auto laptop:max-h-[160px] extra-desktop:max-h-[170px] h-full"
                  >
                    <VideoBadge pinned={true} text="置顶" />
                    <VideoCardFooter>
                      <LikeFooter />
                    </VideoCardFooter>
                  </VideoCard>
                </Link>
              );
            })}
          {/* <VideoCard>
            <VideoBadge hot={true} text="热榜" />
            <VideoCardFooter>
              <LikeFooter />
            </VideoCardFooter>
          </VideoCard> */}
        </VideoContainer>
      </div>
    </section>
  );
};

export default UserContainer;
