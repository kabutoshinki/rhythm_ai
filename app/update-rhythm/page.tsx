"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdateRhythm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rhythmId = searchParams.get("id");

  const [post, setPost] = useState({ name: "", linkUrl: "", image: "", isShared: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/rhythm/${rhythmId}`);
      const data = await response.json();

      setPost({
        name: data.name,
        linkUrl: data.linkUrl,
        image: data?.image,
        isShared: data?.isShared === true ? "Yes" : "No",
      });
    };

    if (rhythmId) getPromptDetails();
  }, [rhythmId]);

  const updatePrompt = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!rhythmId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/rhythm/${rhythmId}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: post.name,
          linkUrl: post.linkUrl,
          image: post?.image,
          isShared: post?.isShared,
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

  return <Form type="Edit" post={post} setPost={setPost} submitting={submitting} handleSubmit={updatePrompt} />;
};

export default UpdateRhythm;
