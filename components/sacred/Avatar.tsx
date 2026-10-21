import * as React from "react";

import styles from "./Avatar.module.css";

interface AvatarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "style" | "className" | "children"> {
  src?: string;
  initials?: string;
  href?: string;
  target?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const Avatar: React.FC<AvatarProps> = (props) => {
  const { src, initials, style: propStyle, href, target, children, ...rest } = props;

  const backgroundStyle = src ? { backgroundImage: `url(${src})` } : {};

  const combinedStyle = { ...propStyle, ...backgroundStyle };

  let avatarElement: React.ReactElement;

  if (href) {
    avatarElement = (
      <a
        className={src ? styles.root : styles.placeholder}
        style={combinedStyle}
        href={href}
        target={target}
        tabIndex={0}
        role="link"
      >
        {!src && initials}
      </a>
    );
  } else {
    avatarElement = (
      <figure className={src ? styles.root : styles.placeholder} style={combinedStyle}>
        {!src && initials}
      </figure>
    );
  }

  if (!children) {
    return avatarElement;
  }

  return (
    <div className={styles.parent} {...rest}>
      {avatarElement}
      <span className={styles.right}>{children}</span>
    </div>
  );
};

export default Avatar;
