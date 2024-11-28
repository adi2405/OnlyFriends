"use client";

import React from "react";
import css from "@/styles/Header.module.css";
import { Flex } from "antd";
import { UserButton } from "@clerk/nextjs";
import Box from "./Box";
import ModeButton from "./ModeButton";
import SidebarButton from "./SidebarButton";
import { useSettingsContext } from "@/context/settings/settings-context";

const Header = () => {
  const { settings } = useSettingsContext();
  const isDarkTheme = settings.theme === "dark";

  return (
    <header className={css.wrapper}>
      <Box style={{ height: "100%" }}>
        <div className={css.container}>
          {/* sidbear button */}

          <div className={css.sidebarButton}>
            <SidebarButton />
          </div>

          {/* logo */}
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

          {/* actions */}
          <Flex gap={25} align="center">
            <ModeButton />
            <UserButton afterSignOutUrl="/sign-in" />
          </Flex>
        </div>
      </Box>
    </header>
  );
};

export default Header;
