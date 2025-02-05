"use client";
import Link from "next/link";
import React, { useRef } from "react";

type ProjectItemsWrapperProps = {
  className?: string;
  href?: string;
  children: React.ReactNode;
};

export default function ProjectItemsWrapper({
  className,
  href,
  children,
}: ProjectItemsWrapperProps) {
  const linkRef = useRef<HTMLAnchorElement>(null)

  return (
    <div
      onClick={() => !!href? linkRef.current?.click() : null}
      className={` ${!!href && "cursor-pointer"} ${className} `}
      title={href}
    >
      <Link ref={linkRef} className="invisible" target="_blank" href={href || "#"}>click</Link>
      {children}
    </div>
  );
}