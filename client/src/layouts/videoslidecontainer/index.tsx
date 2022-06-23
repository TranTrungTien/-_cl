import { Suspense } from "react";
import { Loading } from "../../components";
import { lazy } from "react";
import Test from "../test";

const SwiperWrapper = lazy(() => import("../../components/swiper-wrapper"));

type Props = {};
const VideoSlideContainer = (props: Props) => {
  console.log("video slide container re render");

  return (
    <main className="w-full h-[95%] px-[30px] overflow-hidden relative">
      <Suspense fallback={<Loading />}>
        <SwiperWrapper />
      </Suspense>
    </main>
  );
};

export default VideoSlideContainer;
