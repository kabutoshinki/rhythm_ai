import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const Form = ({ type, post, setPost, submitting, handleSubmit }: any) => {
  const [isLinkValid, setIsLinkValid] = useState<any>(true);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [shareOption, setShareOption] = useState("Yes");
  const isYouTubeLink = (link: string) => {
    const youtubePattern = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]+(&\S*)?$/;
    return youtubePattern.test(link);
  };

  const handleLinkChange = (e: any) => {
    const linkValue = e.target.value;
    setPost({ ...post, linkUrl: linkValue });
    const isValidLink = isYouTubeLink(linkValue);
    setIsLinkValid(isValidLink);
  };

  const handleImageChange = (e: any) => {
    const imageFile = e.target.files[0];
    console.log("imageFile");
    console.log(imageFile);

    setSelectedImage(imageFile);
    const formData = new FormData();

    formData.append("image", imageFile);

    const data = fetch("https://api.cloundinary.com/v1_1/dcslbwlj5/image/upload", {
      method: "POST",
      body: formData,
    }).then((r) => r.json());

    console.log(data);
  };
  const handleShareChange = (e: any) => {
    console.log(e.target.value);

    setShareOption(e.target.value);
    setPost({ ...post, isShared: e.target.value });
  };

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Rhythm</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing rhythms with the world, and let your imagination run wild with any AI-powered platform
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-5xl   gap-7 grid grid-cols-2  glassmorphism"
        encType="multipart/form-data"
      >
        <div>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Rhythm <span className="font-normal">(require: https://www.youtube.com/watch?v=abc)</span>
          </span>

          <input
            value={post.linkUrl}
            onChange={handleLinkChange}
            placeholder="Write your link here"
            required
            className="form_input"
          />
          {!isLinkValid && <p className="error text-red-500">Invalid YouTube link</p>}
        </div>

        <div>
          <span className="font-satoshi font-semibold text-base text-gray-700">Name of Rhythm</span>
          <input
            value={post.name}
            onChange={(e) => setPost({ ...post, name: e.target.value })}
            type="text"
            placeholder="#Name"
            required
            className="form_input"
          />
        </div>

        {/* <div>
          <span className="font-satoshi font-semibold text-base text-gray-700">Image</span>
          <div className="flex justify-center items-center my-2" style={{ width: "100%", height: "250px" }}>
            {selectedImage ? (
              <picture>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  className="rounded-md h-56 w-64 bg-cover"
                />
              </picture>
            ) : (
              <Image
                src="/assets/images/default-image.jpg"
                width={300}
                height={300}
                alt="Default Image"
                objectFit="cover"
                className="rounded-md h-full"
              />
            )}
          </div>
          <input
            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
            type="file"
            id="formFile"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div> */}

        <div className="">
          <span className="font-satoshi font-semibold text-base text-gray-700">Share ?</span>
          <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700 my-4">
            <input
              id="bordered-radio-1"
              type="radio"
              value="Yes"
              name="bordered-radio"
              checked={post?.isShared === "Yes"}
              onChange={handleShareChange}
              defaultChecked={true}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="bordered-radio-1"
              className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Yes
            </label>
          </div>
          <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <input
              id="bordered-radio-2"
              type="radio"
              value="No"
              name="bordered-radio"
              checked={post?.isShared === "No"}
              onChange={handleShareChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="bordered-radio-2"
              className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              No
            </label>
          </div>
        </div>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          {isLinkValid === true ? (
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            >
              {submitting ? `${type}ing...` : type}
            </button>
          ) : (
            <button type="submit" disabled={true} className="px-5 py-1.5 text-sm bg-orange-400 rounded-full text-white">
              {submitting ? `${type}ing...` : type}
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default Form;
