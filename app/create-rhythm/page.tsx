"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";
interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}
const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession<any>();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ linkUrl: "", image: null, name: "", isShared: "Yes" });

  const createPrompt = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    // console.log(post);

    // setIsSubmitting(false);
    try {
      const response = await fetch("/api/rhythm/new", {
        method: "POST",
        body: JSON.stringify({
          linkUrl: post.linkUrl,
          userId: (session?.user as User)?.id,
          image: post.image,
          name: post.name,
          isShared: post.isShared,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return <Form type="Create" post={post} setPost={setPost} submitting={submitting} handleSubmit={createPrompt} />;
};

export default CreatePrompt;
