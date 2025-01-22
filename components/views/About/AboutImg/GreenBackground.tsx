import React, { HTMLAttributes } from "react";

type GreenBackGroundProps = {
  children: React.ReactNode;
  className?: string;
};

export default function GreenBackGround({
  children,
  className,
}: GreenBackGroundProps) {
  return <div className={className}> {children} </div>;
}
