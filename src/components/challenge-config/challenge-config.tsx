import React from "react";
import SelectDuration from "components/select-duration/select-duration";
import TargetText from "components/target-text/target-text";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Title } from "components/ui/ui";
import type { Challenge, Option } from "types";

export default function ChallengeConfig({
  preselectedOptions,
  challenge,
  setChallenge,
  onChallengeStart,
}: {
  preselectedOptions: Option[];
  challenge: Challenge;
  setChallenge: (object: Partial<Challenge>) => void;
  onChallengeStart: () => void;
}) {
  const handleDurationChange = (duration: string) => {
    setChallenge({
      duration: Number(duration),
      timeLeft: Number(duration),
    });
  };

  const handleTargetTextChange = (targetText: string) => {
    setChallenge({ targetText });
  };

  return (
    <>
      <Title
        css={css`
          margin-right: auto;
          margin-left: auto;
        `}
      >
        Challenge config
      </Title>
      <SelectDuration
        preselectedOptions={preselectedOptions}
        defaultSelected={challenge.duration.toString()}
        onChange={handleDurationChange}
      />
      <TargetText
        css={css`
          margin-bottom: 16px;
        `}
        onChange={handleTargetTextChange}
        defaultTargetText={challenge.targetText}
        isChallengeActive={false}
      />

      <Button aria-label="startChallenge" onClick={onChallengeStart}>
        Start Challenge
      </Button>
    </>
  );
}
