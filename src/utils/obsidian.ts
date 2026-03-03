import fs from "fs/promises";
import path from "path";
import { format } from "date-fns";
import { getPreferenceValues } from "@raycast/api";
import { Preferences } from "../types/preferences";

/**
 * Appends text to today's daily note in Obsidian
 * Creates the note if it doesn't exist
 */
export async function appendToDailyNote(text: string): Promise<void> {
  const prefs = getPreferenceValues<Preferences>();
  const today = format(new Date(), prefs.dateFormat);
  const timestamp = format(new Date(), prefs.timestampFormat);

  // Expand ~ to home directory if needed
  const vaultPath = prefs.vaultPath.replace(/^~/, process.env.HOME || "");

  // Construct full file path
  const notePath = path.join(vaultPath, prefs.dailyNotesFolder, `${today}.md`);

  // Check if file exists, create if not
  let content = "";
  try {
    content = await fs.readFile(notePath, "utf-8");
  } catch {
    // File doesn't exist, create with template
    content = createDailyNoteTemplate(today);
  }

  // Format the new entry with a blank line after for spacing
  const formattedText = `- ${timestamp} - ${text}`;

  // Find the **Notes** section and append
  let newContent = content;

  // Look for **Notes** section - matches the section and any existing bullets
  const notesRegex = /(\*\*Notes\*\*\s*\n\n)((?:- .*\n)*)(- )?/;

  if (notesRegex.test(content)) {
    // Append to existing Notes section with blank line after
    // Replace the section, keeping existing bullets and adding new one
    newContent = content.replace(notesRegex, `$1$2${formattedText}\n\n$3`);
  } else {
    // If somehow Notes section doesn't exist, append at end
    newContent = `${content}\n${formattedText}\n\n`;
  }

  // Ensure directory exists
  await fs.mkdir(path.dirname(notePath), { recursive: true });

  // Write back to file
  await fs.writeFile(notePath, newContent, "utf-8");
}

/**
 * Creates a new daily note template matching James's format
 */
function createDailyNoteTemplate(date: string): string {
  return `# ${date}

#type/daily

---

> [!north-star] SYSTEMS
> One hour of focused work
> Daily walk
> Create plan for tomorrow


**Notes**

- `;
}

/**
 * Gets the path to today's daily note
 */
export async function getTodayNotePath(): Promise<string> {
  const prefs = getPreferenceValues<Preferences>();
  const today = format(new Date(), prefs.dateFormat);
  const vaultPath = prefs.vaultPath.replace(/^~/, process.env.HOME || "");
  return path.join(vaultPath, prefs.dailyNotesFolder, `${today}.md`);
}

/**
 * Checks if today's daily note exists
 */
export async function dailyNoteExists(): Promise<boolean> {
  const notePath = await getTodayNotePath();
  try {
    await fs.access(notePath);
    return true;
  } catch {
    return false;
  }
}
