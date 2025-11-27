import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    let file = data.image?.[0]
      ? await appwriteService.uploadFile(data.image[0])
      : null;

    if (post) {
      if (file && post.featuredImage) {
        await appwriteService.deleteFile(post.featuredImage);
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        title: data.title,
        content: data.content,
        featuredImage: file ? file.$id : post.featuredImage,
      });
      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } else {
      const dbPost = await appwriteService.createPost({
        title: data.title,
        content: data.content,
        featuredImage: file ? file.$id : undefined,
        userId: userData.$id,
        slug: data.slug,
      });
      if (dbPost) navigate(`/post/${dbPost.$id}`);
    }
  };

  const slugTransform = useCallback((value) => {
    if (!value) return "";
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]+/g, "-")
      .replace(/\s+/g, "-");
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") setValue("slug", slugTransform(value.title));
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-wrap bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md"
    >
      {/* Left side - Inputs */}
      <div className="w-full lg:w-2/11 px-2 mb-4 lg:mb-0 ">
        {/* Title */}
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />

        {/* Slug + Submit */}
        <div className="flex items-end gap-4 mb-4">
          <div className="flex-1">
            <Input
              label="Slug :"
              placeholder="Slug"
              {...register("slug", { required: true })}
              onInput={(e) =>
                setValue("slug", slugTransform(e.currentTarget.value))
              }
            />
          </div>
          <Button
            type="submit"
            bgColor={post ? "bg-gray-600 hover:bg-white hover:text-black" : "bg-gray-600 hover:bg-white hover:text-black"}
            className="px-6 py-2 h-[42px] flex items-center"
          >
            {post ? "Update Post" : "Create Post"}
          </Button>
        </div>

        {/* Rich Text Editor - Full Width */}
        <div className="w-full">
          <RTE
            label="Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
      </div>

      {/* Right side - Featured image */}
      <div className="w-full lg:w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image")}
        />

        {post?.featuredImage && (
          <div className="w-full mb-4 border rounded-lg overflow-hidden">
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
          </div>
        )}
      </div>
    </form>
  );
}
