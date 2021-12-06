/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TypingRace from "components/typing-race/typing-race";

function App() {
  return (
    <div
      css={css`
        padding: 24px;
      `}
    >
      <TypingRace
        css={css`
          max-width: 800px;
          margin: 0 auto;
        `}
      />
    </div>
  );
}

export default App;
