import React, { ChangeEvent } from "react";
import TargetText from "components/target-text/target-text";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { TextArea, Button, Title } from "components/ui/ui";
import type { Challenge } from "types";

export default function ChallengeActive({
  challenge,
  setChallenge,
  onChallengeFinish,
}: {
  challenge: Challenge;
  setChallenge: (object: Partial<Challenge>) => void;
  onChallengeFinish: () => void;
}) {
  const handleTargetTextChange = (targetText: string) => {
    setChallenge({ targetText });
  };

  const handleUserTypedTextChange = (event: ChangeEvent) => {
    setChallenge({
      userTypedText: (event.target as HTMLTextAreaElement).value,
    });
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <Title
        css={css`
          margin-right: auto;
          margin-left: auto;
        `}
      >
        Challenge Active
      </Title>
      <div
        css={css`
          display: flex;
          justify-content: end;
          padding: 8px;
          padding-left: 0px;
          & > p + p {
            margin-left: 8px;
            font-weight: bold;
            color: ${challenge.timeLeft > 5 ? "inherit" : "red"};
          }
        `}
      >
        <p>Time Left</p>
        <p data-testid="countdown">{challenge.timeLeft}</p>
      </div>
      <TargetText
        css={css`
          margin-bottom: 16px;
        `}
        onChange={handleTargetTextChange}
        defaultTargetText={challenge.targetText}
        isChallengeActive={true}
      />
      <TextArea
        css={css`
          margin-bottom: 16px;
        `}
        aria-label="userTypedText"
        onChange={handleUserTypedTextChange}
        value={challenge.userTypedText}
      />
      <Button aria-label="finishChallenge" onClick={onChallengeFinish}>
        Finish Challenge
      </Button>
    </div>
  );
}
