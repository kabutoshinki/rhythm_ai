"use client";
import {
  Chat,
  Dashboard,
  Favorite,
  LocalMovies,
  Logout,
  Stream,
  TrendingUp,
  VideogameAsset,
} from "@mui/icons-material";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Menu from "@/components/MenuItem";
import VideoContainer from "@/components/VideoContainer";
import RecommendedList from "@/components/RecommendedList";
import Collection from "@/components/Collection";
import gsap from "gsap";
import RhythmCard from "@components/RhythmCard";
import { useRouter, useSearchParams } from "next/navigation";

interface Rhythm {
  _id: string;
  creator?: object | null;
  linkUrl?: string | null;
  image?: string | null;
  name?: string | null;
  isShared?: boolean | null;
}

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

function Profile({ params }: any) {
  const [videos, setVideos] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get("name");
  const linkUrl = searchParams.get("linkUrl");
  const image = searchParams.get("image");
  const user = searchParams.get("user");
  const { data: session } = useSession();

  const [playVideo, setPlayVideo] = useState({
    name: name || "Default",
    linkUrl: linkUrl || "https://www.youtube.com/embed/HsM9VucuCtw",
    image: image || "https://img.youtube.com/vi/HsM9VucuCtw/sddefault.jpg",
  });

  useEffect(() => {
    const scrollContainer = document.querySelector("#scrollContainer");

    scrollContainer?.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      const wheelEvent = evt as WheelEvent;
      scrollContainer.scrollLeft += wheelEvent?.deltaY;
    });
  }, []);
  useEffect(() => {
    const fetchVideos = async () => {
      let response = await fetch(`/api/my-profile/${params?.id}`);
      console.log(user);
      if (params.id !== (session?.user as User)?.id) {
        response = await fetch(`/api/rhythm`);
      } else {
        response = await fetch(`/api/my-profile/${params?.id}`);
      }

      const data = await response.json();

      setVideos(data);
    };

    if (params?.id) fetchVideos();
  }, [params.id]);

  const handleEdit = (post: any) => {
    router.push(`/update-rhythm?id=${post._id}`);
  };

  const handleDelete = async (post: any) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/rhythm/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = videos.filter((item) => item?._id !== post._id);

        setVideos(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-col  w-full h-screen overflow-hidden">
      {/* Main contain */}
      <div className="flex w-full h-full">
        <div className="sm:w-[94%] md:w-[100%] h-full  flex flex-col">
          {/* top section */}
          <div className="w-full h-[70%] max-h-[480px]  grid grid-cols-3 gap-2 p-2">
            {/* ------------------------------------------ */}
            {/* ------------------------------------------ */}
            {/* video contain */}
            <div
              className="md:col-span-2 sm:col-span-6  rounded-lg overflow-hidden
          flex items-center justify-center bg-black"
            >
              <VideoContainer data={playVideo} />
            </div>
            {/* ------------------------------------------ */}
            {/* ------------------------------------------ */}
            {/* recommend list */}
            <div
              className="md:col-span-1 bg-gray-600 sm:col-span-6  overflow-y-auto
          scrollbar scrollbar-thin scrollbar-thumb-gray-800  
        "
              id="recommendedList"
            >
              <p className="text-textColor text-[18px] font-bold my-2 px-2">Recommended</p>
              {videos &&
                videos?.map((data: Rhythm) => (
                  <div
                    key={data._id}
                    onClick={() => {
                      setPlayVideo({
                        name: data?.name || "Default",
                        linkUrl: data?.linkUrl || "https://www.youtube.com/embed/HsM9VucuCtw",
                        image: data?.image || "https://img.youtube.com/vi/HsM9VucuCtw/sddefault.jpg",
                      });
                    }}
                  >
                    <RecommendedList imgSrc={data?.image} videoName={data?.name} artistName={"Susan Stewart"} />
                  </div>
                ))}
            </div>
            {/* ------------------------------------------ */}
          </div>
          {/* ------------------------------------------- */}
          {/* bottom section */}
          <div className="w-full h-[30%]">
            <div className="flex overflow-x-scroll items-center scrollbar-none py-2" id="scrollContainer">
              {videos &&
                videos?.map((data: Rhythm) => (
                  <div
                    key={data?._id}
                    onClick={() => {
                      setPlayVideo({
                        name: data?.name || "Default",
                        linkUrl: data?.linkUrl || "https://www.youtube.com/embed/HsM9VucuCtw",
                        image: data?.image || "https://img.youtube.com/vi/HsM9VucuCtw/sddefault.jpg",
                      });
                    }}
                  >
                    {/* <Collection imgSrc={data?.imgSrc} name={data?.videoName} /> */}
                    <RhythmCard
                      post={data}
                      handleEdit={() => handleEdit && handleEdit(data)}
                      handleDelete={() => handleDelete && handleDelete(data)}
                      handleTagClick={""}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
