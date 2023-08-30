import User from "@models/user";

import { connectToDB } from "@utils/database";

export const GET = async (request: any, { params }: any) => {
  try {
    await connectToDB();

    const user = await User.findById({ _id: params.id });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", { status: 500 });
  }
};
