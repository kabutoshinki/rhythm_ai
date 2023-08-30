import Rhythm from "@models/music";
import { connectToDB } from "@utils/database";

export const POST = async (request: any) => {
  const { userId, linkUrl, image, name, isShared } = await request.json();
  const checkShared: boolean = isShared === "Yes" ? true : false;

  const videoIdMatch = linkUrl.match(/(?:v=|\/)([\w-]{11})(?:\?|$|&)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  const newLinkUrl = `https://www.youtube.com/embed/${videoId}`;
  const newImage = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;

  try {
    await connectToDB();
    const newRhythm = new Rhythm({
      creator: userId,
      linkUrl: newLinkUrl,
      image: newImage,
      name,
      isShared: checkShared,
    });
    await newRhythm.save();
    return new Response(JSON.stringify(newRhythm), { status: 201 });
  } catch (error) {
    console.log(error);

    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
