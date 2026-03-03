export interface Preferences {
  vaultPath: string;
  dailyNotesFolder: string;
  dateFormat: string;
  timestampFormat: string;
  transcriptionService?: "whisper" | "macos";
  openaiApiKey?: string;
}
