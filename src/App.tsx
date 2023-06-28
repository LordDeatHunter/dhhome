import type { Component } from "solid-js";

import { styled } from "solid-styled-components";
import { ANIMATIONS } from "./animations";
import Box from "./components/Box";
import HorizontalDivider from "./components/HorizontalDivider";
import ImageButton from "./components/ImageButton";
import Popper from "./components/Popper";
import Text, {
  FONT_SIZES,
  FONT_WEIGHTS,
  FontVariants,
} from "./components/Text";
import { openLink } from "./utils";

const BodyText = styled(Text)`
  animation: ${ANIMATIONS.FadeIn};
  margin: 0;
  padding-left: 32px;
  padding-right: 32px;
  max-inline-size: 420px;
  line-height: 1.5rem;
`;

const App: Component = () => (
  <Box
    style={{
      width: "100%",
      height: "100%",
    }}
  >
    <Box vertical style={{ animation: ANIMATIONS.GrowIn }} gap="16px">
      <Text
        variant={FontVariants.TITLE}
        style={{ animation: ANIMATIONS.FadeIn }}
      >
        DeatHunter
      </Text>
      <Text size="32px" style={{ animation: ANIMATIONS.SlowerFadeIn }}>
        [Software Engineer]
      </Text>
      <img
        src="dh.png"
        width="160px"
        style={{ "margin-top": "32px", "margin-bottom": "24px" }}
      />
      <Box vertical gap="12px">
        <BodyText>
          I like learning and creating new things. I've participated in a couple
          of game jams, and created some popular Minecraft mods.
        </BodyText>
      </Box>
      <HorizontalDivider style={{ animation: ANIMATIONS.SlowerFadeIn }} />
      <Box gap="48px" style={{ animation: ANIMATIONS.SlowerFadeIn }}>
        <ImageButton
          onClick={() => {
            openLink("https://github.com/LordDeatHunter/");
          }}
          imgSrc="github.svg"
          imgText="GitHub"
          width="40px"
        />
        <ImageButton
          onClick={() => {
            openLink(
              "https://legacy.curseforge.com/members/lorddeathunter/projects"
            );
          }}
          imgSrc="curseforge.svg"
          imgText="CurseForge"
          width="48px"
        />
        <Popper
          activateMethod="click"
          content={
            <Box
              style={{
                position: "absolute",
                top: "100%",
                "margin-top": "8px",
                padding: "8px",
                "border-style": "solid",
                "border-radius": "12px",
                "border-width": "1.5px",
                "border-color": "#0C0C1F",
              }}
              gap="12px"
            >
              <Text size={FONT_SIZES.SMALL} weight={FONT_WEIGHTS.NORMAL}>
                lorddeathunter
              </Text>
              <ImageButton
                onClick={() => {
                  navigator.clipboard.writeText("lorddeathunter");
                }}
                imgSrc="copy-icon.svg"
                imgText="Copy"
                width="24px"
              />
            </Box>
          }
        >
          <ImageButton imgSrc="discord.svg" imgText="Discord" width="40px" />
        </Popper>
      </Box>
    </Box>
  </Box>
);

export default App;
