import { Component } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { styled } from "solid-styled-components";

const StyledDiv = styled.div<{
  style?: object;
  flexDirection: string;
  justifyContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline";
  gap: 0 | string;
}>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  gap: ${({ gap }) => gap};
`;

interface BoxProps {
  children?: JSX.Element;
  vertical?: boolean;
  reverse?: boolean;
  style?: object;
  justifyContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline";
  gap?: 0 | string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onPointerEnter?: (event: PointerEvent) => void;
  onPointerLeave?: (event: PointerEvent) => void;
  onClick?: () => void;
}

const Box: Component<BoxProps> = (props) => {
  const {
    children,
    style,
    vertical,
    reverse,
    justifyContent = "center",
    alignItems = "center",
    gap = 0,
    onMouseEnter,
    onMouseLeave,
    onPointerEnter,
    onPointerLeave,
    onClick,
  } = props;

  return (
    <StyledDiv
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
      flexDirection={
        (vertical ? "column" : "row") + (reverse ? "-reverse" : "")
      }
      gap={gap}
      justifyContent={justifyContent}
      alignItems={alignItems}
      style={style}
    >
      {children}
    </StyledDiv>
  );
};

export default Box;
