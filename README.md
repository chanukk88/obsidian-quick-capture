# Obsidian Quick Capture

A Raycast extension to quickly capture thoughts (written or spoken) directly to your Obsidian daily note.

## Features

- 📝 **Quick Note**: Instantly capture text thoughts to your daily note
- 🎤 **Voice Capture**: Use macOS dictation to speak your thoughts
- ⚡ **Fast**: Opens with a hotkey, saves with Cmd+S
- 🎯 **Smart Formatting**: Automatically adds timestamps in your note format
- 📅 **Daily Note Integration**: Finds or creates today's note automatically

## Installation

### Development Mode

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd /Users/james/Documents/claude/github/obsidian-quick-capture
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run in development mode:
   ```bash
   npm run dev
   ```

This will register the extension with Raycast in development mode. You can now search for "Quick Note" or "Voice Capture" in Raycast.

### Build for Production

```bash
npm run build
```

Then import the extension into Raycast via Settings → Extensions → Add Extension.

## Configuration

Configure the extension via Raycast preferences (Cmd+, in any command):

- **Vault Path**: Path to your Obsidian vault (default: `/Users/james/Documents/claude/vaults/2026`)
- **Daily Notes Folder**: Folder where daily notes are stored (default: `2. Logs`)
- **Date Format**: Format for daily note filenames (default: `yyyy-MM-dd`)
- **Timestamp Format**: Format for timestamps in notes (default: `HH:mm`)

## Usage

### Quick Note (Written)

1. Open Raycast (default: Cmd+Space)
2. Type "Quick Note" or set a custom hotkey
3. Type your thought
4. Press Cmd+S to save and close
5. Or Cmd+Shift+S to save and add another

### Voice Capture

1. Open Raycast
2. Type "Voice Capture" or set a custom hotkey
3. Press Fn twice to activate macOS dictation
4. Speak your thought
5. Edit if needed
6. Press Cmd+S to save

## Daily Note Format

The extension works with this daily note format:

\`\`\`markdown
# 2026-03-03

#type/daily

---

> [!north-star] SYSTEMS
> One hour of focused work
> Daily walk
> Create plan for tomorrow


**Notes**

- 08:34 - Your captured thought
- 10:15 - Another thought
\`\`\`

New entries are automatically appended to the **Notes** section with timestamps.

## Keyboard Shortcuts

- **Cmd+S**: Save to daily note and close
- **Cmd+Shift+S**: Save and add another (Quick Note only)
- **Cmd+D**: Show dictation help (Voice Capture)

## Tips

- Set a global hotkey for Quick Note in Raycast preferences for instant access
- Use the built-in macOS dictation (Fn Fn) for voice input - it's fast and works offline
- The extension creates today's daily note if it doesn't exist

## Troubleshooting

**"Failed to save" error:**
- Check that the vault path is correct
- Ensure the daily notes folder exists or the extension can create it
- Verify you have write permissions for the vault directory

**Dictation not working:**
- macOS dictation must be enabled in System Settings → Keyboard → Dictation
- Press Fn twice quickly to activate

## Development

Built with:
- [Raycast API](https://developers.raycast.com/)
- TypeScript
- React
- date-fns

## License

MIT
