"use client";

import { Button, Typography } from "antd";
import Iconify from "./Iconify";
import { useSettingsContext } from "@/context/settings/settings-context";

const SidebarButton = () => {
  const { setSettings } = useSettingsContext();
  return (
    <Button
      type="text"
      onClick={() => {
        setSettings((prev) => ({
          ...prev,
          isSidebarOpen: !prev.isSidebarOpen,
        }));
      }}
      icon={
        <Typography>
          <Iconify icon="mingcute:menu-fill" width="22px" />
        </Typography>
      }
    />
  );
};

export default SidebarButton;
