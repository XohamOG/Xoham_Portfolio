import type { CSSProperties, HTMLAttributes } from "react";

type BrutalCardProps = HTMLAttributes<HTMLDivElement> & {
  tilt?: number;
};

export default function BrutalCard({
  tilt = 0,
  className = "",
  style,
  children,
  ...rest
}: BrutalCardProps) {
  const mergedStyle = {
    ...style,
    "--card-tilt": `${tilt}deg`,
  } as CSSProperties;

  return (
    <div className={`brutal-card ${className}`} style={mergedStyle} {...rest}>
      {children}
    </div>
  );
}
