import React, { ChangeEvent, useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface Option {
  value: string;
  displayValue: string;
}

const FlexDiv = styled.div`
  display: flex;
  padding: 8px;
  padding-left: 0px;
  align-items: center;
  & > p {
    margin-right: 8px;
  }
`;

export default function SelectDuration({
  onChange,
  preselectedOptions,
  defaultSelected,
}: {
  onChange: (duration: string) => void;
  preselectedOptions: Option[];
  defaultSelected: string;
}) {
  const isDefaultSelectedCustom = () => {
    const selectedOption = preselectedOptions.find(
      (option: Option) => option.value === defaultSelected
    );

    return !!!selectedOption;
  };

  const [selectedValue, setSelectedValue] = useState<string>(() => {
    const selectedOption = preselectedOptions.find(
      (option: Option) => option.value === defaultSelected
    );

    return selectedOption ? selectedOption.value : "custom";
  });
  const [customDuration, setCustomDuration] = useState<string>(() => {
    return isDefaultSelectedCustom() ? defaultSelected : "";
  });

  const handleSelectChange = (event: ChangeEvent) => {
    const newSelectedValue = (event.target as HTMLSelectElement).value;
    setSelectedValue(newSelectedValue);

    if (newSelectedValue === "custom") {
      onChange(customDuration);
    } else {
      onChange(newSelectedValue);
    }
  };

  const handleCustomInputChange = (event: ChangeEvent) => {
    const newCustomDuration = (event.target as HTMLInputElement).value;
    setCustomDuration(newCustomDuration);

    onChange(newCustomDuration);
  };

  return (
    <div
      css={css`
        margin-bottom: 8px;
      `}
    >
      <FlexDiv>
        <p>Select duration</p>
        <select
          name="challengeDuration"
          id="challengeDuration"
          onChange={handleSelectChange}
          value={selectedValue}
        >
          {preselectedOptions.map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.displayValue}
              </option>
            );
          })}
          <option value="custom">custom</option>
        </select>
      </FlexDiv>

      {selectedValue === "custom" && (
        <FlexDiv>
          <p>Enter custom duration in seconds</p>
          <input
            css={css`
              max-width: 60px;
            `}
            type="number"
            placeholder="custom duration"
            min="0"
            aria-label="customDuration"
            value={customDuration}
            onChange={handleCustomInputChange}
          />
        </FlexDiv>
      )}
    </div>
  );
}
