import { Component, createSignal } from "solid-js";
import { styled } from "solid-styled-components";
import Text from "./Text";

const FancyDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  outline: none;
  cursor: pointer;
`;

const StyledImage = styled.img`
  position: relative;
`;

interface ImageLinkProps {
  onClick?: () => void;
  imgSrc: string;
  imgText?: string;
  width?: 0 | string;
}

const ImageButton: Component<ImageLinkProps> = (props) => {
  const { onClick, imgSrc, imgText, width = "200px" } = props;
  const [hovered, setHovered] = createSignal(false);

  return (
    <FancyDiv
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") {
          setHovered(true);
        }
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") {
          setHovered(false);
        }
      }}
      tabindex={0}
      onFocusIn={() => setHovered(true)}
      onFocusOut={() => setHovered(false)}
      onClick={onClick}
    >
      {hovered() && (
        <Text size="2rem" style={{ position: "absolute", left: "-15px" }}>
          (
        </Text>
      )}
      <StyledImage src={imgSrc} alt={imgText} width={width} />
      {hovered() && (
        <Text size="2rem" style={{ position: "absolute", right: "-15px" }}>
          )
        </Text>
      )}
    </FancyDiv>
  );
};

export default ImageButton;
