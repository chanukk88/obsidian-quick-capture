import { Form, ActionPanel, Action, showToast, Toast, popToRoot } from "@raycast/api";
import { appendToDailyNote } from "./utils/obsidian";
import React, { useState } from "react";

interface FormValues {
  text: string;
}

export default function Command() {
  const [text, setText] = useState("");

  async function handleSubmit(values: FormValues) {
    if (!values.text || values.text.trim() === "") {
      await showToast({
        style: Toast.Style.Failure,
        title: "Empty note",
        message: "Please enter some text",
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
          <Action.SubmitForm
            title="Save and New"
            onSubmit={async (values: FormValues) => {
              await handleSubmit(values);
              setText(""); // Clear the form for new entry
            }}
            shortcut={{ modifiers: ["cmd", "shift"], key: "s" }}
          />
        </ActionPanel>
      }
    >
      <Form.TextArea
        id="text"
        title="Quick Note"
        placeholder="What's on your mind?"
        value={text}
        onChange={setText}
        autoFocus
      />
      <Form.Description text="Capture a quick thought to today's daily note. Cmd+S to save and close, Cmd+Shift+S to save and add another." />
    </Form>
  );
}
