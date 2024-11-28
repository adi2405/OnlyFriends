"use client";

import { Flex } from "antd";
import React from "react";
import css from "@/styles/loading.module.css";
import { useSettingsContext } from "@/context/settings/settings-context";

const MainLoadingScreen = () => {
  const { settings } = useSettingsContext();
  const isDarkTheme = settings.theme === "dark";
  return (
    <Flex justify="center" align="center" style={{ height: "85vh" }}>
      <div className={css.logo}>
        <span
          className="Only"
          style={{ color: isDarkTheme ? "#FFFFFF" : "#000000" }}
        >
          Only
        </span>
        <span className="Friends" style={{ color: "#5CB3FF" }}>
          Friends
        </span>
      </div>
    </Flex>
  );
};

export default MainLoadingScreen;
