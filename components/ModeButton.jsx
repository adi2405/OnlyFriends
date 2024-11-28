"use client";
import { useSettingsContext } from "@/context/settings/settings-context";
import { Icon } from "@iconify/react";
import { Button } from "antd";
import React from "react";

const ModeButton = () => {
  const {
    setSettings,
  } = useSettingsContext();
  return (
    <Button
      style={{ padding: 0, border: "none" }}
      onClick={() => {
        setSettings((prev) => ({
            ...prev, theme: prev.theme === "dark" ? "light" : "dark",
        }));
      }}
      icon={<Icon icon="icon-park-solid:dark-mode" width={"35px"} style={{transform: "translate(-1.3px, -1.3px)"}} />}
    />
  );
};

export default ModeButton;
