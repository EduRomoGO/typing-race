import type { Challenge } from "types";
import { Button } from "components/ui/ui";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Title } from "components/ui/ui";

const calculatePerformanceStats = (challenge: Challenge) => {
  const regex = /[A-Za-z0-9 ]/g;
  const targetTextWords = challenge.targetText
    .match(regex)
    ?.join("")
    .split(" ");
  const userTypedTextWords = challenge.userTypedText
    .match(regex)
    ?.join("")
    .split(" ");
  let points = 0;

  const getWordsPerMinute = () => {
    if (challenge.duration <= 0) {
      return 0;
    }

    return userTypedTextWords
      ? Math.round(
          (userTypedTextWords.length /
            (challenge.duration - challenge.timeLeft)) *
            60
        )
      : 0;
  };

  const getCharsPerMinute = () => {
    if (challenge.duration <= 0) {
      return 0;
    }

    return challenge.userTypedText
      ? Math.round(
          (challenge.userTypedText.length /
            (challenge.duration - challenge.timeLeft)) *
            60
        )
      : 0;
  };

  if (targetTextWords && userTypedTextWords) {
    targetTextWords.forEach((word, index) => {
      if (word === userTypedTextWords[index]) {
        points++;
      }
    });
  }

  const getAccuracy = () => {
    if (targetTextWords) {
      return Math.round((points / targetTextWords.length) * 100);
    }

    return 0;
  };

  return {
    points,
    wpm: getWordsPerMinute(),
    cpm: getCharsPerMinute(),
    accuracy: getAccuracy(),
  };
};

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

const GroupFlexDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Data = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  padding: 12px;
`;

export default function Performance({
  challenge,
  onTryAgain,
}: {
  challenge: Challenge;
  onTryAgain: () => void;
}) {
  const { points, wpm, cpm, accuracy } = calculatePerformanceStats(challenge);

  const handleTryAgainClick = () => {
    onTryAgain();
  };

  return (
    <section
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 24px;
        margin-bottom: 24px;
        border: 1px solid #b8b5b5;
        padding: 24px;
      `}
    >
      <Title>Your Stats</Title>
      <div
        css={css`
          width: 80%;
          display: flex;
          flex-direction: column;
        `}
      >
        <GroupFlexDiv>
          <FlexDiv>
            <p>Words per minute</p>
            <Data data-testid="wpm">{wpm}</Data>
          </FlexDiv>
          <FlexDiv>
            <p>Chars per minute</p>
            <Data data-testid="cpm">{cpm}</Data>
          </FlexDiv>
        </GroupFlexDiv>
        <GroupFlexDiv>
          <FlexDiv>
            <p>Accuracy</p>
            <Data data-testid="accuracy">{accuracy} %</Data>
          </FlexDiv>
          <FlexDiv>
            <p>Points</p>
            <Data data-testid="points">{points}</Data>
          </FlexDiv>
        </GroupFlexDiv>
      </div>
      <Button onClick={handleTryAgainClick}>Try again</Button>
    </section>
  );
}
