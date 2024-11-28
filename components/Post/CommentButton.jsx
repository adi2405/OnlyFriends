"use client";
import { Button, Flex, Typography } from "antd";
import React from "react";
import Iconify from "../Iconify";

const CommentButton = ({ comments }) => {
  return (
    <Button
      type="text"
      size="small"
      style={{ background: "transparent", border: "none", boxShadow: "none" }}
    >
      <Flex gap={".5rem"} align="center">
        <Iconify icon="fa6-solid:comments" width={"21px"} color="grey" />
        <Typography.Text className="typoBody2">
          {comments > 0 ? `${comments} Comments` : "Comment"}
        </Typography.Text>
      </Flex>
    </Button>
  );
};

export default CommentButton;
