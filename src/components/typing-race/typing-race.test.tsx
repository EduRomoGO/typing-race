import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TypingRace from "components/typing-race/typing-race";
import { defaultData } from "components/typing-race/typing-race-default-data";

test("renders correctly", () => {
  render(<TypingRace />);

  let challengeConfigTitle: HTMLElement | null = screen.getByRole("heading", {
    name: /challenge config/i,
  });

  let challengeActiveTitle = screen.queryByRole("heading", {
    name: /challenge active/i,
  });

  let combobox = screen.getByRole("combobox");
  let customDurationInput = screen.queryByRole("spinbutton", {
    name: /customduration/i,
  });
  let targetTextInput = screen.getByRole("textbox", { name: /targettext/i });
  let clearTextButton = screen.getByRole("button", { name: /clear text/i });
  let userTypedTextInput = screen.queryByRole("textbox", {
    name: /usertypedtext/i,
  });
  let startChallengeButton: HTMLElement | null = screen.getByRole("button", {
    name: "startChallenge",
  });
  let finishChallengeButton: HTMLElement | null = screen.queryByRole("button", {
    name: /finishchallenge/i,
    exact: true,
  });

  let countdown = screen.queryByTestId("countdown");

  expect(challengeConfigTitle).toBeInTheDocument();
  expect(challengeActiveTitle).not.toBeInTheDocument();
  expect(combobox).toBeInTheDocument();
  expect(
    (
      screen.getByRole("option", {
        name: defaultData.preselectedOptions[0].displayValue,
      }) as HTMLOptionElement
    ).selected
  ).toBe(true);
  expect(customDurationInput).not.toBeInTheDocument();
  expect(targetTextInput).toBeInTheDocument();
  expect(targetTextInput).toHaveTextContent(defaultData.targetText);
  expect(clearTextButton).toBeInTheDocument();
  expect(userTypedTextInput).not.toBeInTheDocument();
  expect(startChallengeButton).toBeInTheDocument();
  expect(countdown).not.toBeInTheDocument();

  userEvent.click(startChallengeButton);

  challengeConfigTitle = screen.queryByRole("heading", {
    name: /challenge config/i,
  });

  challengeActiveTitle = screen.getByRole("heading", {
    name: /challenge active/i,
  });

  countdown = screen.getByTestId("countdown");
  userTypedTextInput = screen.getByRole("textbox", {
    name: /usertypedtext/i,
  });

  startChallengeButton = screen.queryByRole("button", {
    name: "startChallenge",
  });
  finishChallengeButton = screen.getByRole("button", {
    name: /finishchallenge/i,
    exact: true,
  });

  targetTextInput = screen.getByRole("textbox", { name: /targettext/i });

  expect(challengeConfigTitle).not.toBeInTheDocument();
  expect(challengeActiveTitle).toBeInTheDocument();
  expect(combobox).not.toBeInTheDocument();
  expect(targetTextInput).toBeInTheDocument();
  expect(clearTextButton).not.toBeInTheDocument();
  expect(userTypedTextInput).toBeInTheDocument();
  expect(startChallengeButton).not.toBeInTheDocument();
  expect(finishChallengeButton).toBeInTheDocument();
  expect(countdown).toBeInTheDocument();
});

test("with prop values", async () => {
  const defaultTargetText =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";

  const defaultDuration = "5";
  render(
    <TypingRace duration={defaultDuration} targetText={defaultTargetText} />
  );

  let combobox = screen.getByRole("combobox");
  let customDurationInput = screen.queryByRole("spinbutton", {
    name: /customduration/i,
  });
  let targetTextInput = screen.getByRole("textbox", { name: /targettext/i });

  expect(combobox).toBeInTheDocument();
  expect(
    (
      screen.getByRole("option", {
        name: "custom",
      }) as HTMLOptionElement
    ).selected
  ).toBe(true);
  expect(customDurationInput).toBeInTheDocument();

  expect((customDurationInput as HTMLInputElement)?.value).toBe(
    defaultDuration
  );
  expect(targetTextInput).toBeInTheDocument();
  expect(targetTextInput).toHaveTextContent(defaultData.targetText);
});

test("performance data", async () => {
  const defaultDuration = "0";
  render(<TypingRace duration={defaultDuration} />);

  let combobox = screen.getByRole("combobox");
  let startChallengeButton = screen.getByRole("button", {
    name: /startchallenge/i,
  });

  userEvent.click(startChallengeButton);

  await setTimeout(() => {
    const points = screen.getByTestId("points");
    const wpm = screen.getByTestId("wpm");
    const cpm = screen.getByTestId("cpm");
    const accuracy = screen.getByTestId("accuracy");
    const tryAgainButton = screen.getByRole("button", { name: /try again/i });

    expect(combobox).not.toBeInTheDocument();
    expect(points).toBeInTheDocument();
    expect(wpm).toBeInTheDocument();
    expect(cpm).toBeInTheDocument();
    expect(accuracy).toBeInTheDocument();
    expect(tryAgainButton).toBeInTheDocument();
  }, Number(defaultDuration) * 1000 + 500);
});
