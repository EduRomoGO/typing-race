/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { ChangeEvent, MouseEvent, useState } from "react";
import { ReactComponent as TrashIcon } from "components/icon-files/trash.svg";
import { TextArea } from "components/ui/ui";

export default function TargetText({
  onChange,
  defaultTargetText,
  isChallengeActive,
  ...props
}: {
  onChange: (text: string) => void;
  defaultTargetText: string;
  isChallengeActive: boolean;
}) {
  const [value, setValue] = useState<string>(defaultTargetText);

  const handleTargetTextChange = (event: ChangeEvent) => {
    const newTargetText = (event.target as HTMLTextAreaElement).value;
    setValue(newTargetText);
    onChange(newTargetText);
  };

  const handleClearTextClick = (event: MouseEvent) => {
    setValue("");
  };

  return (
    <div {...props}>
      {!isChallengeActive && (
        <label htmlFor="targetText">
          Enter below the text you want to practice with, or just go ahead with
          the default one
        </label>
      )}
      <div
        css={css`
          position: relative;
          margin-top: 8px;
        `}
      >
        {!isChallengeActive && (
          <TrashIcon
            role="button"
            aria-label="clear text"
            onClick={handleClearTextClick}
            css={css`
              width: 16px;
              height: 16px;
              position: absolute;
              right: 8px;
              top: 8px;
              cursor: pointer;
            `}
          />
        )}
        <TextArea
          css={css`
            padding-right: 40px;
          `}
          name="targetText"
          aria-label="targetText"
          value={value}
          onChange={handleTargetTextChange}
          readOnly={isChallengeActive}
        />
      </div>
    </div>
  );
}
