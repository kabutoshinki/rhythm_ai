import Rhythm from "@models/music";
import { connectToDB } from "@utils/database";

export const GET = async (res: any, { params }: any) => {
  try {
    await connectToDB();
    const prompt = await Rhythm.findById(params.id).populate("creator");
    if (!prompt) return new Response("Rhythm Not Found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    // console.log(error);
    return new Response("Internal Server Error, Please Try Again", { status: 500 });
  }
};
export const PATCH = async (res: any, { params }: any) => {
  const { name, linkUrl, image, isShared } = await res.json();
  const checkShared: boolean = isShared === "Yes" ? true : false;

  const videoIdMatch = linkUrl.match(/(?:v=|\/)([\w-]{11})(?:\?|$|&)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  const newLinkUrl = `https://www.youtube.com/embed/${videoId}`;
  const newImage = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
  try {
    await connectToDB();
    const existPrompt = await Rhythm.findById(params.id);
    if (!existPrompt) {
      return new Response("Rhythm not found", { status: 404 });
    }
    existPrompt.name = name;
    existPrompt.linkUrl = newLinkUrl;
    existPrompt.image = newImage;
    existPrompt.isShared = checkShared;
    await existPrompt.save();
    return new Response("Successfully updated the Rhythm", { status: 200 });
  } catch (error) {
    return new Response("Error Updating music", { status: 500 });
  }
};
export const DELETE = async (res: any, { params }: any) => {
  try {
    await connectToDB();
    await Rhythm.findByIdAndDelete(params.id);
    return new Response("Rhythm deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting music", { status: 500 });
  }
};
