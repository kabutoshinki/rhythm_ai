import Rhythm from "@models/music";
import { connectToDB } from "@utils/database";

export const GET = async (res: any) => {
  try {
    await connectToDB();
    const rhythms = await Rhythm.find({}).populate("creator").where("isShared").equals(true);
    return new Response(JSON.stringify(rhythms), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to fetch all rhythms", { status: 500 });
  }
};
