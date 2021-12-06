import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Performance from "components/performance/performance";
import type { Challenge } from "components/typing-race/typing-race";

const challengeMock: Challenge = {
  targetText: "",
  duration: 0,
  timeLeft: 0,
  userTypedText: "",
  status: "unstarted",
  performance: {
    wpm: 0,
    cpm: 0,
    accuracy: 0,
    points: 0,
  },
};

test("Performance calculates points correctly", () => {
  const someText = "some text";
  const onTryAgainFake = jest.fn();

  const { rerender } = render(
    <Performance
      onTryAgain={onTryAgainFake}
      challenge={{
        ...challengeMock,
        targetText: someText,
        userTypedText: someText,
      }}
    />
  );

  const points = screen.getByTestId("points");

  expect(points).toHaveTextContent("2");

  rerender(
    <Performance
      onTryAgain={onTryAgainFake}
      challenge={{
        ...challengeMock,
        targetText: "hey",
        userTypedText: "fake leak",
      }}
    />
  );

  expect(points).toHaveTextContent("0");

  rerender(
    <Performance
      onTryAgain={onTryAgainFake}
      challenge={{
        ...challengeMock,
        targetText: "",
        userTypedText: "fake leak",
      }}
    />
  );

  expect(points).toHaveTextContent("0");

  rerender(
    <Performance
      onTryAgain={onTryAgainFake}
      challenge={{
        ...challengeMock,
        targetText: "sea",
        userTypedText: "",
      }}
    />
  );

  expect(points).toHaveTextContent("0");

  rerender(
    <Performance
      onTryAgain={onTryAgainFake}
      challenge={{
        ...challengeMock,
        targetText: "open sea",
        userTypedText: "open",
      }}
    />
  );

  expect(points).toHaveTextContent("1");

  const longText =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the, software like Aldus PageMaker including versions of Lorem Ipsum";
  rerender(
    <Performance
      onTryAgain={onTryAgainFake}
      challenge={{
        ...challengeMock,
        targetText: longText,
        userTypedText: longText,
      }}
    />
  );

  expect(points).toHaveTextContent("33");
});

test("Performance calculates speed correctly", () => {
  const onTryAgainFake = jest.fn();

  const longText =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy the, software like Aldus PageMaker including versions of Lorem Ipsum";

  const { rerender } = render(
    <Performance
      onTryAgain={onTryAgainFake}
      challenge={{
        ...challengeMock,
        targetText: longText,
        userTypedText: longText,
        duration: 30,
      }}
    />
  );

  const wpm = screen.getByTestId("wpm");
  const cpm = screen.getByTestId("cpm");

  expect(wpm).toHaveTextContent("60");
  expect(cpm).toHaveTextContent("388");

  rerender(
    <Performance
      onTryAgain={onTryAgainFake}
      challenge={{
        ...challengeMock,
        targetText: longText,
        userTypedText: longText,
        duration: 60,
      }}
    />
  );

  expect(wpm).toHaveTextContent("30");
  expect(cpm).toHaveTextContent("194");

  rerender(
    <Performance
      onTryAgain={onTryAgainFake}
      challenge={{
        ...challengeMock,
        targetText: longText,
        userTypedText: longText,
        duration: 10,
      }}
    />
  );

  expect(wpm).toHaveTextContent("180");
  expect(cpm).toHaveTextContent("1164");

  rerender(
    <Performance
      onTryAgain={onTryAgainFake}
      challenge={{
        ...challengeMock,
        targetText: longText,
        userTypedText: longText,
        duration: 0,
      }}
    />
  );

  expect(wpm).toHaveTextContent("0");
  expect(cpm).toHaveTextContent("0");
});

test("Performance calculates accuracy correctly", () => {
  const onTryAgainFake = jest.fn();

  const longText =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy the, software like Aldus PageMaker including versions of Lorem Ipsum";
  const slightlyDifferentLongText =
    "Lorem Ipsum is simply duommy text of the printing and typuesetting industry. Lorem Ipsum has been the industry's standard dummy the, software lieke Alduse PageMaker inclurding versions of Lorem Ipsum";

  const { rerender } = render(
    <Performance
      onTryAgain={onTryAgainFake}
      challenge={{
        ...challengeMock,
        targetText: longText,
        userTypedText: longText,
      }}
    />
  );

  const accuracy = screen.getByTestId("accuracy");

  expect(accuracy).toHaveTextContent("100 %");

  rerender(
    <Performance
      onTryAgain={onTryAgainFake}
      challenge={{
        ...challengeMock,
        targetText: longText,
        userTypedText: slightlyDifferentLongText,
      }}
    />
  );

  expect(accuracy).toHaveTextContent("83 %");

  rerender(
    <Performance
      onTryAgain={onTryAgainFake}
      challenge={{
        ...challengeMock,
        targetText: "hey",
        userTypedText: "no way",
      }}
    />
  );

  expect(accuracy).toHaveTextContent("0 %");

  rerender(
    <Performance
      onTryAgain={onTryAgainFake}
      challenge={{
        ...challengeMock,
        targetText: "",
        userTypedText: "such",
      }}
    />
  );

  expect(accuracy).toHaveTextContent("0 %");

  rerender(
    <Performance
      onTryAgain={onTryAgainFake}
      challenge={{
        ...challengeMock,
        targetText: "",
        userTypedText: "",
      }}
    />
  );

  expect(accuracy).toHaveTextContent("0 %");
});

test("try again button works", async () => {
  const onTryAgainFake = jest.fn();

  render(<Performance onTryAgain={onTryAgainFake} challenge={challengeMock} />);

  userEvent.click(screen.getByRole("button", { name: /try again/i }));

  expect(onTryAgainFake).toHaveBeenCalledTimes(1);
});
