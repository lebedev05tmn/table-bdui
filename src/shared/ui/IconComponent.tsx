"use client";

import type React from "react";
import { useEffect, useState } from "react";
import type { IconName } from "lucide-react/dynamic";

const ICON_PATH = "/lucide";

const fetchIcon = async (
  name: IconName,
  strokeWidth?: number
): Promise<string | null> => {
  const response = await fetch(`${ICON_PATH}/${name}.svg`);

  if (!response.ok) {
    throw new Error(`Failed to load icon: ${name}`);
  }

  let svgText = await response.text();

  if (!svgText.startsWith("<svg")) {
    throw new Error(`Failed to load icon: ${name}`);
  }

  // set viewBox to 24x24 and width/height to 100% to make the icon full size
  svgText = svgText.replace(
    "<svg",
    '<svg viewBox="0 0 24 24" width="100%" height="100%"'
  );

  if (strokeWidth) {
    svgText = svgText.replace("<svg", `<svg stroke-width="${strokeWidth}"`);
  }

  return svgText;
};

export interface DynamicIconProps {
  name?: IconName;
  color?: string;
  size?: number;
  strokeWidth?: number;
  style?: React.CSSProperties;
  className?: string;
}

const IconComponent: React.FC<DynamicIconProps> = ({
  name,
  color = "currentColor",
  size = 14,
  strokeWidth = 2,
  style = {},
  className = "",
}) => {
  const [iconSvg, setIconSvg] = useState<string | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    if (name)
      fetchIcon(name, strokeWidth)
        .then(setIconSvg)
        .catch(() => setHasError(true));
  }, [name, strokeWidth]);

  if (hasError || !name) return null;

  return (
    <svg
      className={`lucideDynamic ${className}`}
      {...(iconSvg && { dangerouslySetInnerHTML: { __html: iconSvg } })}
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        color,
        ...style,
      }}
    />
  );
};

export type { IconName };
export default IconComponent;
