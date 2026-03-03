import { Form, ActionPanel, Action, showToast, Toast, popToRoot } from "@raycast/api";
import { appendToDailyNote } from "./utils/obsidian";
import React, { useState } from "react";

interface FormValues {
  text: string;
}

export default function Command() {
  const [transcribedText, setTranscribedText] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  async function handleSubmit(values: FormValues) {
    if (!values.text || values.text.trim() === "") {
      await showToast({
        style: Toast.Style.Failure,
        title: "Empty note",
        message: "Please enter or transcribe some text",
      });
      return;
    }

    const toast = await showToast({
      style: Toast.Style.Animated,
      title: "Saving to Obsidian...",
    });

    try {
      await appendToDailyNote(values.text);
      toast.style = Toast.Style.Success;
      toast.title = "✓ Added to daily note";

      // Close the window after successful save
      await popToRoot();
    } catch (error) {
      toast.style = Toast.Style.Failure;
      toast.title = "Failed to save";
      toast.message = error instanceof Error ? error.message : String(error);
    }
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Save to Daily Note"
            onSubmit={handleSubmit}
            shortcut={{ modifiers: ["cmd"], key: "s" }}
          />
          <Action
            title="Start Dictation (macOS)"
            onAction={() => {
              showToast({
                style: Toast.Style.Animated,
                title: "Use macOS Dictation",
                message: "Press Fn twice to start dictation in the text field",
              });
            }}
            shortcut={{ modifiers: ["cmd"], key: "d" }}
          />
        </ActionPanel>
      }
    >
      <Form.TextArea
        id="text"
        title="Voice Note"
        placeholder="Use macOS dictation (Fn Fn) to speak your note..."
        value={transcribedText}
        onChange={setTranscribedText}
        autoFocus
      />
      <Form.Description text="Press Fn twice to activate macOS dictation in the text field above. Edit the transcribed text if needed, then Cmd+S to save." />
    </Form>
  );
}
