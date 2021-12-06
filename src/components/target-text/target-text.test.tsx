import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TargetText from "components/target-text/target-text";

test("target text works fine", () => {
  const onChangeFake = jest.fn();
  const SOME_TEXT = "some text";
  const defaultTargetText = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`;

  const { rerender } = render(
    <TargetText
      onChange={onChangeFake}
      defaultTargetText={defaultTargetText}
      isChallengeActive={false}
    />
  );

  let targetTextInput = screen.getByRole("textbox", { name: /targettext/i });

  expect(targetTextInput).toHaveTextContent(defaultTargetText);

  userEvent.paste(targetTextInput, SOME_TEXT);

  const txt = `${defaultTargetText}${SOME_TEXT}`;

  expect(onChangeFake).toHaveBeenCalledWith(txt);
  expect(targetTextInput).toHaveTextContent(txt);

  userEvent.click(screen.getByRole("button", { name: /clear text/i }));
  userEvent.paste(targetTextInput, SOME_TEXT);

  expect(onChangeFake).toHaveBeenCalledWith(SOME_TEXT);
  expect(targetTextInput).toHaveTextContent(SOME_TEXT);

  rerender(
    <TargetText
      onChange={onChangeFake}
      defaultTargetText={defaultTargetText}
      isChallengeActive={true}
    />
  );

  expect(
    screen.queryByRole("button", { name: /clear text/i })
  ).not.toBeInTheDocument();
});
