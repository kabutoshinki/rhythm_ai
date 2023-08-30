"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

const RhythmCard = ({ post, handleEdit, handleDelete, handleTagClick }: any) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleProfileClick = () => {
    if (post?.creator?._id === (session?.user as User)?.id)
      return router.push(
        `/profile/${post?.creator?._id}?name=${post?.name}&linkUrl=${post?.linkUrl}&image=${post?.image}`
      );

    router.push(
      `/profile/${post.creator._id}?user=${post.creator.username}&name=${post?.name}&linkUrl=${post?.linkUrl}&image=${post?.image}`
    );
  };

  return (
    <div className="prompt_card hover:bg-gradient-radial duration-200 ease-in-out cursor-pointer mx-3">
      <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer" onClick={handleProfileClick}>
        <Image
          src={post?.creator?.image}
          alt="user_image"
          width={40}
          height={40}
          className="rounded-full object-contain"
        />
        <div className="flex flex-col mb-3">
          <h3 className="font-satoshi font-semibold text-gray-900">{post?.creator?.username}</h3>
          <p className="font-inter text-sm text-gray-500">{post?.creator?.email}</p>
        </div>
      </div>
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer" onClick={handleProfileClick}>
          <picture>
            <img
              src={post?.image || "https://img.lovepik.com/photo/40007/9104.jpg_wh860.jpg"}
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />
          </picture>
          <div className="w-[87%] h-[60px] bg-collectionBg absolute top-16 mt-5 flex items-center rounded-t-lg">
            <h2 className="px-2 text-white font-bold">{post?.name}</h2>
          </div>
        </div>
      </div>

      {((session?.user as User)?.id || "") === post?.creator?._id &&
        pathName === `/profile/${(session?.user as User)?.id}` && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <div className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
              <p className="font-inter text-sm text-white cursor-pointer " onClick={handleEdit}>
                Edit
              </p>
            </div>
            <div className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              <p className="font-inter text-sm text-white cursor-pointer" onClick={handleDelete}>
                Delete
              </p>
            </div>
          </div>
        )}
    </div>
  );
};

export default RhythmCard;
