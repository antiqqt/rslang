export interface SettingsResponse {
  optional: {
    [date: string]: {
      learnedWords: number;
    };
  };
}
