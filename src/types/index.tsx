export interface Challenge {
  targetText: string;
  duration: number;
  timeLeft: number;
  userTypedText: string;
  status: "unstarted" | "started" | "finished";
  performance: {
    wpm: number;
    cpm: number;
    accuracy: number;
    points: number;
  };
}

export interface Option {
  value: string;
  displayValue: string;
}
