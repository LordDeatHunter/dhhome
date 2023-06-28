import { Component } from "solid-js";

interface HorizontalDividorProps {
  color?: string;
  style?: object;
}

const HorizontalDivider: Component<HorizontalDividorProps> = (props) => {
  const { color = "#0C0C1F", style } = props;
  return (
    <div
      style={{
        width: "100%",
        height: "2px",
        margin: "1rem 0",
        "background-image": `linear-gradient(90deg, #00000000, ${color}, #00000000`,
        ...style,
      }}
    />
  );
};

export default HorizontalDivider;
