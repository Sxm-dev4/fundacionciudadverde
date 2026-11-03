import Link, { type LinkProps } from "next/link";
import type {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";
import { classNames } from "@/lib/classNames";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "text";

type ButtonSharedProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type ButtonAsButtonProps = ButtonSharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: never;
  };

type ButtonAsLinkProps = ButtonSharedProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "children" | "className" | "href"> & {
    disabled?: boolean;
    href: LinkProps["href"];
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export function Button(props: ButtonProps) {
  if ("href" in props && props.href !== undefined) {
    const {
      children,
      className,
      disabled,
      href,
      variant = "primary",
      ...linkProps
    } = props;
    const classes = classNames(styles.button, styles[variant], className);

    if (disabled) {
      return (
        <span className={classes} aria-disabled="true">
          {children}
        </span>
      );
    }

    return (
      <Link {...linkProps} className={classes} href={href}>
        {children}
      </Link>
    );
  }

  const {
    children,
    className,
    type = "button",
    variant = "primary",
    ...buttonProps
  } = props;
  const classes = classNames(styles.button, styles[variant], className);

  return (
    <button {...buttonProps} className={classes} type={type}>
      {children}
    </button>
  );
}
