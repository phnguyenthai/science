# Polymathic VS Code Workspace

## Idea

Make the coding environment feel like a calm study and research studio: a place to move between disciplines, follow questions, connect ideas, and turn learning into practical work.

The goal is not to imitate a particular product. It is to make the workspace feel welcoming for sustained thought rather than optimized for alerts, speed, or constant context switching.

## Design principles

- **Calm, not sterile:** use soft warm whites and muted sage accents, with clear contrast for text and controls.
- **Keep the work central:** give the editor visual priority and reduce secondary decoration.
- **Make context easy to follow:** keep the project tree and file navigation visible on the left.
- **Support orientation:** use tabs, breadcrumbs, and sticky scroll to help move through connected files and long documents.
- **Keep tools close, not in the way:** place the terminal and output panel below the editor so they are available when needed.
- **Make exploration comfortable:** wrap long lines and use indentation guides to make notes and project structures easier to scan.
- **Avoid attention traps:** do not add distracting alerts, automatic movement, or extra interface decoration without a clear learning benefit.

## Layout

```text
┌──────────────────────────────────────────────────────────────┐
│ Project / workspace title                                    │
├──────┬───────────────────────────────────────────┬───────────┤
│      │ Tabs and breadcrumbs                      │           │
│ Left │                                           │ Optional  │
│ rail │ Main editor: writing, code, or notes       │ auxiliary │
│      │                                           │ view      │
├──────┴───────────────────────────────────────────┴───────────┤
│ Bottom panel: terminal, problems, output, or debug console    │
├──────────────────────────────────────────────────────────────┤
│ Status bar                                                    │
└──────────────────────────────────────────────────────────────┘
```

Keep the auxiliary right-hand view closed by default. Open it for an outline, references, or related notes when the task benefits from seeing two things at once.

## Visual direction

The current palette uses the built-in **Default Light Modern** theme with warm cream editor surfaces and muted green navigation accents:

- Editor: `#FBFAF6`
- Sidebar: `#F3F4EE`
- Activity bar and status bar: `#E9EDE5`
- Primary accent: `#355B46`
- Focus indicator: `#739878`

The palette should stay readable and restrained. Color is for orientation and emphasis, not decoration.

## Current VS Code settings

The first implementation is in the user settings file at `%APPDATA%\Code\User\settings.json`.

- Light Modern theme with custom warm, sage-tinted surfaces
- Sidebar on the left and panel at the bottom
- Persistent editor tabs instead of temporary preview tabs
- Breadcrumb navigation enabled
- Minimap hidden to reduce visual noise
- Sticky scroll and word wrap enabled for long files
- Indentation guides made visible in the file tree
- Empty startup editor to leave workspace choice to the user

## How to use the workspace

For a reading or research session, open the relevant project folder, keep the Explorer visible, and use the editor for the current text or notes. Open the Outline or a second editor group only when it helps compare related ideas. Use the bottom panel for commands or diagnostics, then hide it again when it is not needed.

## Later possibilities

- Create small, focused folders for each subject rather than one crowded catch-all.
- Use Markdown notes to record questions, explanations, sources, and connections between subjects.
- Add a project-specific workspace file only if a particular study project needs a different arrangement.
- Revisit the palette and layout after using it for a while; keep only choices that genuinely improve focus.

## Measure of success

The workspace is successful if it makes it easier to begin, stay oriented, and move between learning and making—while keeping attention on the work itself.
