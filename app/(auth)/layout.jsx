import React from "react";
import css from "@/styles/authLayout.module.css";

export const metadata = {
  title: "Authentication",
};

const AuthLayout = ({ children }) => {
  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <div className={css.left}>{children}</div>
        <div className={css.right}>
          <div className={css.logo}>
            <span className="Only">Only</span>
            <span className="Friends" style={{ color: "#5CB3FF" }}>
              Friends
            </span>
          </div>
          <div className={css.tagline}>
            <h3>Because Only Friends Matter</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
