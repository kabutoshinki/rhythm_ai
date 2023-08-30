"use client";
import gsap from "gsap";
import { useState, useEffect } from "react";
const VideoContainer = ({ data }: any) => {
  const [isPlaying, setPlaying] = useState(false);
  const tl = gsap.timeline({ delay: 0.3 });
  useEffect(() => {
    if (isPlaying) {
      tl.fromTo("#videoName", { y: 0, opacity: 1 }, { y: -20, opacity: 0 });
    } else {
      tl.fromTo("#videoName", { y: -20, opacity: 0 }, { y: 0, opacity: 1 });
    }
  }, [isPlaying, data]);

  return (
    <div className="relative w-full h-full">
      <iframe
        onPlay={() => {
          setPlaying(true);
        }}
        onPause={() => setPlaying(false)}
        id="mainVideo"
        allowFullScreen={true}
        src={data?.linkUrl || "https://www.youtube.com/embed/HsM9VucuCtw"}
        className="min-w-full min-h-full w-auto h-auto bg-cover border-lg"
        style={{ display: "block", background: "#000" }}
      ></iframe>
      {/* <video
        src={
          "https://firebasestorage.googleapis.com/v0/b/video-blog-ab065.appspot.com/o/video%2Fvideo_2.mp4?alt=media&token=99c1a4a1-a2c9-4634-a313-65c5855bf4a9"
        }
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className=" min-w-full min-h-full w-auto h-auto bg-cover"
        controls
        autoPlay
        id="mainVideo"
      ></video> */}
      <div
        className="absolute top-0 left-0 z-10 w-full h-[20px] p-2
        bg-gradient-to-b from-black to-transparent
    "
        id="videoName"
      >
        {/* <h2 className="text-textColor text-xl font-bold">{data?.name}</h2> */}
      </div>
    </div>
  );
};

export default VideoContainer;
