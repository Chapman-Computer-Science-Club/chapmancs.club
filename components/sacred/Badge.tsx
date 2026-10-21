"use client";

import * as React from "react";

import styles from "./Badge.module.css";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ children, ...rest }) => {
  return (
    <span className={styles.root} {...rest}>
      {children}
    </span>
  );
};

export default Badge;
