"use client";

import * as React from "react";
import Link from "next/link";

import styles from "./ActionListItem.module.css";

interface ActionListItemProps {
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  href?: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement | HTMLAnchorElement>;
  role?: string;
  tabIndex?: number;
}

const ActionListItem: React.FC<ActionListItemProps> = (props) => {
  const { href, target, onClick, children, icon, style, role, tabIndex = 0 } = props;

  const resolvedRole = role || (href ? "link" : "button");

  if (href) {
    const props = { className: styles.item, href, target, style, tabIndex, role: resolvedRole };
    const content = (
      <>
        <figure className={styles.icon}>{icon}</figure>
        <span className={styles.text}>{children}</span>
      </>
    );
    // site paths navigate client-side so the terminal shell stays mounted
    return href.startsWith("/") ? <Link {...props}>{content}</Link> : <a {...props}>{content}</a>;
  }

  //NOTE(jimmylee): When role="menuitem", the parent menu container handles keyboard activation.
  const handleKeyDown =
    role === "menuitem"
      ? undefined
      : (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === "Enter" || e.key === " ") {
            if (e.key === " ") e.preventDefault();
            e.currentTarget.click();
          }
        };

  return (
    <div
      className={styles.item}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      style={style}
      tabIndex={tabIndex}
      role={resolvedRole}
    >
      <figure className={styles.icon}>{icon}</figure>
      <span className={styles.text}>{children}</span>
    </div>
  );
};

export default ActionListItem;
