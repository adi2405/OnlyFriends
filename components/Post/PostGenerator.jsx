"use client";
import React, { useRef, useState } from "react";
import css from "@/styles/PostGenerator.module.css";
import Box from "../Box";
import { Avatar, Button, Flex, Image, Input, Spin, Typography } from "antd";
import Iconify from "../Iconify";
import { createPost } from "@/actions/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { Icon } from "@iconify/react";

const PostGenerator = () => {
  const imgInputRef = useRef(null);
  const vidInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState(null); // [image, video]
  const [postText, setPostText] = useState(null);
  const queryClient = useQueryClient();
  const { mutate: execute, isPending } = useMutation({
    mutationFn: (data) => createPost(data),
    onSuccess: () => {
      handleSuccess();
      queryClient.invalidateQueries("posts");
    },
    onError: () => showError("Something wrong happened. Try again!"),
  });

  const handleSuccess = () => {
    setSelectedFile(null);
    setFileType(null);
    setPostText("");
    toast.success("Post created successfully!");
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    // put a limit of 5mb file size
    if (file && file.size > 6 * 1024 * 1024) {
      toast.error("File is too big!");
      return;
    }

    if (
      file &&
      (file.type.startsWith("image/") || file.type.startsWith("video/"))
    ) {
      setFileType(file.type.split("/")[0]);

      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        setSelectedFile(reader.result);
      };
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileType(null);
  };

  const showError = (content = "Something went wrong! Try again.") => {
    toast.error(content);
  };

  function handleSubmitPost() {
    if ((postText === "" || !postText) && !selectedFile) {
      showError("Can't make an empty post");
      return;
    }
    // don't forget to tell about the next.config.js file where we have set the limit of 5mb
    execute({ postText, media: selectedFile });
  }

  const { user } = useUser();
  return (
    <>
      <Spin
        spinning={isPending}
        tip={
          <Typography className="typoBody1" style={{ marginTop: "1rem" }}>
            Uploading post...
          </Typography>
        }
      >
        <div className={css.postGenWrapper}>
          <Box className={css.container}>
            <Flex gap={"1rem"} align={"flex-start"} vertical>
              {/* avatar */}

              <Flex style={{ width: "100%" }} gap={"1rem"}>
                <Avatar
                  src={user?.imageUrl}
                  style={{
                    boxShadow: "var(--avatar-shadow)",
                    width: "2.6rem",
                    height: "2.6rem",
                  }}
                />

                <Input.TextArea
                  // maxLength={100}
                  placeholder={"Express your feelings..."}
                  style={{ height: 80, resize: "none", flex: 1 }}
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                />
              </Flex>

              {/* file preview */}
              {fileType && (
                <div className={css.previewContainer}>
                  {/* remove button */}
                  <Typography
                    className="typoCaption"
                    onClick={handleRemoveFile}
                  >
                    <Icon
                      icon={"mdi:close-box"}
                      fontSize={"26px"}
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        color: "#5cb3ff",
                      }}
                      className={css.remove}
                    />
                  </Typography>

                  {/* media preview */}
                  {fileType === "image" && (
                    <Image
                      src={selectedFile}
                      className={css.preview}
                      alt="preview"
                      height={"350px"}
                      width={"100%"}
                    />
                  )}
                  {fileType === "video" && (
                    <video
                      className={css.preview}
                      controls
                      src={selectedFile}
                    />
                  )}
                </div>
              )}

              {/* buttons Container */}
              <Flex
                align="center"
                justify="space-between"
                className={css.bottom}
              >
                {/* upload buttons */}
                {/* image upload button */}
                <Button
                  type="text"
                  style={{ background: "borderColor" }}
                  onClick={() => imgInputRef.current.click()}
                >
                  <Flex
                    align="center"
                    gap={".5rem"}
                    style={{ transform: "translateY(-2px)" }}
                  >
                    <Iconify
                      icon="solar:camera-linear"
                      width="1.2rem"
                      color="var(--primary)"
                    />
                    <Typography className="typoSubtitle2">Image</Typography>
                  </Flex>
                </Button>

                {/* video upload button */}
                <Button
                  type="text"
                  style={{ background: "borderColor" }}
                  onClick={() => vidInputRef.current.click()}
                >
                  <Flex
                    align="center"
                    gap={".5rem"}
                    style={{ transform: "translateY(-2px)" }}
                  >
                    <Iconify
                      icon="solar:video-frame-linear"
                      width="1.2rem"
                      color="#5856D6"
                    />
                    <Typography className="typoSubtitle2">Video</Typography>
                  </Flex>
                </Button>

                <Button
                  type="primary"
                  style={{ marginLeft: "auto", boxShadow: "none"}}
                  onClick={handleSubmitPost}
                >
                  <Flex align="center" gap={"0.5rem"}>
                    <Icon
                      icon={"fluent:send-24-filled"}
                      width={"1.2rem"}
                      style={{ transform: "translateY(-2px)" }}
                    />
                    <Typography
                      className="typoSubtitle2"
                      style={{ color: "#fff", transform: "translateY(-1px)" }}
                    >
                      Post
                    </Typography>
                  </Flex>
                </Button>
              </Flex>
            </Flex>
          </Box>
        </div>
      </Spin>
      {/* make an input to only accept img files and max number of files as 1 */}
      <input
        type="file"
        accept="image/*"
        multiple={false}
        style={{ display: "none" }}
        ref={imgInputRef}
        onChange={(e) => handleFileChange(e)}
      />
      {/* make an input to only accept video files and max number of files as 1 */}
      <input
        type="file"
        accept="video/*"
        multiple={false}
        style={{ display: "none" }}
        ref={vidInputRef}
        onChange={(e) => handleFileChange(e)}
      />
    </>
  );
};

export default PostGenerator;
