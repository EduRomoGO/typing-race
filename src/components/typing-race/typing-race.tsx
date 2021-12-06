import React, { useReducer, useRef } from "react";
import Performance from "components/performance/performance";
import { defaultData } from "components/typing-race/typing-race-default-data";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ChallengeConfig from "components/challenge-config/challenge-config";
import ChallengeActive from "components/challenge-active/challenge-active";
import type { Challenge } from "types";

const useChallenge = ({
  targetText,
  duration,
}: {
  targetText: string;
  duration: string;
}) => {
  const initialChallengeState: Challenge = {
    targetText,
    duration: Number(duration),
    timeLeft: Number(duration),
    userTypedText: "",
    status: "unstarted",
    performance: {
      wpm: 0,
      cpm: 0,
      accuracy: 0,
      points: 0,
    },
  };

  const [challenge, setChallenge] = useReducer(
    (s: Challenge, a: Partial<Challenge>) => ({ ...s, ...a }),
    initialChallengeState
  );

  const reset = () => {
    setChallenge(initialChallengeState);
  };

  return { challenge, setChallenge, reset };
};

export default function TypingRace({
  preselectedOptions = defaultData.preselectedOptions,
  targetText = defaultData.targetText,
  duration = defaultData.preselectedOptions[0].value,
  ...props
}) {
  const { challenge, setChallenge, reset } = useChallenge({
    targetText,
    duration,
  });
  const intervalRef = useRef<number>(0);

  const handleStartChallengeClick = () => {
    setChallenge({ status: "started" });

    const updateCountDown = () => {
      if (challenge.timeLeft > 0) {
        setChallenge({ timeLeft: challenge.timeLeft-- });
      } else if (challenge.timeLeft === 0) {
        setChallenge({ status: "finished" });
        clearInterval(intervalRef.current);
      }
    };

    intervalRef.current = window.setInterval(updateCountDown, 1000);
    updateCountDown();
  };

  const handleFinishChallengeClick = () => {
    setChallenge({ status: "finished" });
    clearInterval(intervalRef.current);
  };

  const onTryAgain = () => {
    reset();
  };

  return (
    <section
      css={css`
        display: flex;
        flex-direction: column;
        margin-top: 24px;
      `}
      {...props}
    >
      {challenge.status === "unstarted" && (
        <ChallengeConfig
          preselectedOptions={preselectedOptions}
          challenge={challenge}
          setChallenge={setChallenge}
          onChallengeStart={handleStartChallengeClick}
        />
      )}
      {challenge.status === "started" && (
        <ChallengeActive
          challenge={challenge}
          setChallenge={setChallenge}
          onChallengeFinish={handleFinishChallengeClick}
        />
      )}
      {challenge.status === "finished" && (
        <Performance onTryAgain={onTryAgain} challenge={challenge} />
      )}
    </section>
  );
}
