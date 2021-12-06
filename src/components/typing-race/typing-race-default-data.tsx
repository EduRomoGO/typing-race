import type { Option } from "types";

interface DefaultData {
  preselectedOptions: Option[];
  targetText: string;
}

export const defaultData: DefaultData = {
  preselectedOptions: [
    { value: "60", displayValue: "1 minute" },
    { value: "120", displayValue: "2 minutes" },
    { value: "300", displayValue: "5 minutes" },
  ],
  targetText: "Lorem Ipsum is simply dummy",
};
