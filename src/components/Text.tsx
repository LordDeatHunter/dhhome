import { Component, JSX } from "solid-js";
import { styled } from "solid-styled-components";

export enum FontVariants {
  SMALL = "SMALL",
  NORMAL = "NORMAL",
  SUBTITLE = "SUBTITLE",
  TITLE = "TITLE",
}

export const FONT_SIZES: Record<FontVariants, 0 | string> = {
  TITLE: "3rem",
  SUBTITLE: "1.75rem",
  NORMAL: "1.25rem",
  SMALL: "0.8rem",
};

export const FONT_WEIGHTS: Record<FontVariants, 0 | string> = {
  TITLE: "960",
  SUBTITLE: "700",
  NORMAL: "400",
  SMALL: "256",
};

const StyledText = styled.p<{
  size?: 0 | string;
  weight?: 0 | string;
  style?: object;
}>`
  font-size: ${(props) => props?.size ?? "1.25rem"};
  font-weight: ${(props) => props?.weight ?? "normal"};
  text-align: center;
  color: #0c0c1f;
  margin: 0;
  ${({ style }) => `
    ${{ ...style }};
  `}
`;

interface TextProps {
  variant?: FontVariants;
  size?: string;
  weight?: string;
  children?: JSX.Element;
  style?: object;
  class?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const Text: Component = (props: TextProps) => {
  const {
    children,
    size,
    weight,
    variant = FontVariants.NORMAL,
    style,
    onClick,
    onMouseEnter,
    onMouseLeave,
  } = props;

  return (
    <StyledText
      class={props.class}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      size={size ?? FONT_SIZES[variant]}
      weight={weight ?? FONT_WEIGHTS[variant]}
      style={style}
    >
      {children}
    </StyledText>
  );
};

export default Text;
