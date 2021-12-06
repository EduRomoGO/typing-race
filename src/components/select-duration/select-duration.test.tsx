import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SelectDuration from "components/select-duration/select-duration";

test("duration works fine", () => {
  const onChangeFake = jest.fn();
  const preselectedOptions = [
    { value: "60", displayValue: "1 minute" },
    { value: "120", displayValue: "2 minutes" },
    { value: "300", displayValue: "5 minutes" },
  ];
  const defaultSelected = preselectedOptions[0].value;

  render(
    <SelectDuration
      onChange={onChangeFake}
      preselectedOptions={preselectedOptions}
      defaultSelected={defaultSelected}
    />
  );
  const combobox = screen.getByRole("combobox");

  userEvent.selectOptions(combobox, ["60"]);

  expect(
    (screen.getByRole("option", { name: "1 minute" }) as HTMLOptionElement)
      .selected
  ).toBe(true);

  expect(onChangeFake).toHaveBeenCalledWith("60");

  userEvent.selectOptions(combobox, ["120"]);

  expect(
    (screen.getByRole("option", { name: "2 minutes" }) as HTMLOptionElement)
      .selected
  ).toBe(true);

  expect(onChangeFake).toHaveBeenCalledWith("120");

  userEvent.selectOptions(combobox, ["300"]);

  expect(
    (screen.getByRole("option", { name: "5 minutes" }) as HTMLOptionElement)
      .selected
  ).toBe(true);

  expect(onChangeFake).toHaveBeenCalledWith("300");

  userEvent.selectOptions(combobox, ["custom"]);

  expect(
    (screen.getByRole("option", { name: "custom" }) as HTMLOptionElement)
      .selected
  ).toBe(true);

  const customDurationInput = screen.getByRole("spinbutton", {
    name: /customduration/i,
  });

  expect(customDurationInput).toBeInTheDocument();

  const CUSTOM_DURATION = "135";

  userEvent.type(customDurationInput, CUSTOM_DURATION);

  expect(onChangeFake).toHaveBeenCalledWith(CUSTOM_DURATION);
});
