"use strict";

const paths = [
  {
    id: "learn-that-sticks",
    category: "Learning",
    title: "Learn something that sticks",
    description: "A small change to how you study can make ideas easier to remember later.",
    why: "Practical, research-informed ways to remember what you learn.",
    duration: "12 minutes",
    level: "A gentle start",
    symbol: "⌁",
    tone: "moss",
    searchTerms: "learning memory retrieval practice study",
    steps: [
      {
        type: "read",
        title: "Why rereading can feel like learning",
        lead: "A familiar page feels easy to understand, but that feeling is not the same as being able to recall the idea later.",
        paragraphs: [
          "When you reread a page, the information is right in front of you. That can make it feel familiar. Later, with the book closed, it may be harder to explain what you learned.",
          "A useful alternative is retrieval practice: pause, look away, and try to remember the main idea in your own words. Then check what you missed. The effort of recalling is part of the practice.",
          "Keep it kind and low-stakes. The point is not to catch yourself out; it is to discover what needs another look."
        ],
        source: "The Learning Scientists — Retrieval Practice",
        sourceUrl: "https://www.learningscientists.org/retrieval-practice",
        sourceNote: "A research-informed explanation and classroom resources."
      },
      {
        type: "watch",
        title: "A tiny learning loop",
        lead: "Step through this short visual explanation. It is intentionally user-controlled: nothing plays or advances by itself.",
        videoUrl: "https://youtu.be/Pjrqc6UMDKM",
        videoTitle: "Retrieval Practice — The Learning Scientists",
        videoNote: "Open the original video on YouTube. It will not autoplay here.",
        slides: [
          { art: "◉  →  ◉  →  ◉", title: "Meet a new idea", text: "Read a little or watch a short explanation. Pause when something feels important." },
          { art: "◉     ···     ?", title: "Close the source", text: "Put the page away for a moment. Give your memory a chance to find the idea without looking." },
          { art: "✎  →  ↺", title: "Recall, then check", text: "Say or write what you remember, then return to the source and fill in the gaps." }
        ],
        source: "A visual lesson made for Common Ground",
        sourceNote: "Original, slide-by-slide explainer. Use the controls to move at your own pace."
      },
      {
        type: "think",
        title: "What do you remember?",
        lead: "Without scrolling up, write one idea from the reading and one question you still have.",
        prompts: [
          "What is the difference between an idea feeling familiar and being able to recall it?",
          "What is one thing you could try to remember tomorrow without looking at your notes?"
        ]
      },
      {
        type: "try",
        title: "Try a one-minute recall",
        lead: "Turn a small idea into a memory you can retrieve.",
        actions: [
          "Choose one useful thing you read or heard today.",
          "Close the source and explain it out loud in your own words.",
          "Check the source, then add one detail you missed."
        ],
        close: "Tomorrow, try to recall the same idea before you look it up again."
      }
    ]
  },
  {
    id: "check-a-claim",
    category: "Clear thinking",
    title: "Check a claim before sharing",
    description: "Learn a simple way to leave a page and find out who is behind a claim.",
    why: "A practical, source-linked introduction to checking online information.",
    duration: "10 minutes",
    level: "A useful habit",
    symbol: "◎",
    tone: "clay",
    searchTerms: "media literacy internet news source lateral reading misinformation",
    steps: [
      {
        type: "read",
        title: "Look beyond the page",
        lead: "A polished website can make a claim look convincing. Before trusting it, check what other reliable sources say about the source itself.",
        paragraphs: [
          "Lateral reading means leaving the page you are checking and opening other sources to investigate who made it and what independent sources report.",
          "A quick first pass: pause at a surprising claim, open a separate tab, search the organization or author, and look for reporting or reference sources with relevant expertise.",
          "This does not make every question easy or produce certainty every time. It gives you a better starting point than judging a page by how professional it looks."
        ],
        source: "Digital Inquiry Group — Civic Online Reasoning",
        sourceUrl: "https://cor.inquirygroup.org/curriculum/",
        sourceNote: "Free lessons for evaluating online information."
      },
      {
        type: "watch",
        title: "Three tabs, one claim",
        lead: "Walk through a simple visual example of checking a claim. This is a guided storyboard, not an autoplay video.",
        slides: [
          { art: "“A surprising claim”", title: "Pause before reposting", text: "A bold headline catches your eye. First, keep the claim in mind—don't let the headline rush you." },
          { art: "TAB 1  →  TAB 2  →  TAB 3", title: "Leave the original page", text: "Search for who is behind the page and what other independent sources say about them." },
          { art: "SOURCE  +  EVIDENCE  +  CONTEXT", title: "Compare, then decide", text: "Look for evidence and context from sources that are independent of the original claim." }
        ],
        source: "A visual lesson made for Common Ground",
        sourceNote: "Original, slide-by-slide explainer. For a full lesson, visit Digital Inquiry Group."
      },
      {
        type: "think",
        title: "What would change your mind?",
        lead: "Pick a claim you recently saw online. You do not need to paste it here or identify anyone.",
        prompts: [
          "What evidence would make this claim more believable?",
          "Which independent source could help you check it?",
          "What would make you decide not to share it yet?"
        ]
      },
      {
        type: "try",
        title: "A three-minute source check",
        lead: "Use a low-stakes claim—not a sensitive personal story—to practise the steps.",
        actions: [
          "Write down the exact claim and the name of its source.",
          "Open a new tab and find out who publishes the source.",
          "Look for an independent source that checks the same claim."
        ],
        close: "If sources disagree or evidence is thin, it is okay to say, “I don't know yet.”"
      }
    ]
  },
  {
    id: "market-uncertainty",
    category: "Money & uncertainty",
    title: "Think clearly about market risk",
    description: "Explore what a model can and cannot know, and test a hypothetical shock.",
    why: "A plain-language look at surprise risk—without pretending to forecast prices.",
    duration: "15 minutes",
    level: "No finance background needed",
    symbol: "↗",
    tone: "blue",
    searchTerms: "market finance risk model prediction surprise portfolio",
    steps: [
      {
        type: "read",
        title: "A model cannot know tomorrow's news",
        lead: "A model can work with information it has received; it cannot reliably see an unexpected event before it becomes known.",
        paragraphs: [
          "A price model might estimate patterns from past data. If a company faces surprise news, a model using only price history may have no warning that the news is coming.",
          "Risk planning asks a different question: if a bad surprise happens, how much could one position affect the whole portfolio? Position size and spreading risk can limit some damage, but they cannot remove every loss.",
          "A stress test is a made-up scenario, not a forecast. It helps you inspect assumptions and consequences before you rely on a plan."
        ],
        source: "Common Ground — original plain-language lesson",
        sourceNote: "An educational summary, not investment advice or a market prediction."
      },
      {
        type: "watch",
        title: "Surprise, impact, response",
        lead: "Follow a simple visual story about what a model can know and what a stress test is for.",
        slides: [
          { art: "PAST DATA  →  MODEL", title: "The model learns from what it has", text: "It can find patterns in information it has seen. Past patterns do not reveal every future event." },
          { art: "…  ⚡  …", title: "Then something unexpected happens", text: "New information arrives. The market may react before a model or investor can respond." },
          { art: "WHAT IF?  →  PLAN", title: "Test the impact, not the prophecy", text: "Try a hypothetical shock. Ask how much it could hurt and whether the plan can handle it." }
        ],
        source: "A visual lesson made for Common Ground",
        sourceNote: "Original, slide-by-slide explainer. Then try the linked scenario tool."
      },
      {
        type: "think",
        title: "Separate prediction from preparation",
        lead: "Think about a surprise that could affect a plan—financial or otherwise.",
        prompts: [
          "What could you reasonably know in advance, and what would be a genuine surprise?",
          "What is one practical way to reduce the impact without pretending to eliminate risk?"
        ]
      },
      {
        type: "try",
        title: "Run a hypothetical stress test",
        lead: "Change the example values if you like; the tool calculates the arithmetic in your browser.",
        actions: [
          "Open the Market Shock Lab in a new tab.",
          "Try a severe drop and notice both the loss and the recovery percentage.",
          "Change one holding's shock to be different from the others."
        ],
        link: "../market-shock-lab/index.html",
        linkText: "Open the Market Shock Lab ↗",
        close: "The exercise is hypothetical. It does not predict markets or recommend a trade."
      }
    ]
  }
];

const formatLabels = { read: "Read", watch: "Watch", think: "Think", try: "Try" };
const formatIcons = { read: "▤", watch: "▷", think: "✳", try: "↗" };
const storageKeys = {
  saved: "common-ground:saved-paths",
  progress: "common-ground:path-progress",
  notes: "common-ground:reflections"
};

const homeView = document.querySelector("#home-view");
const catalog = document.querySelector(".catalog");
const pathView = document.querySelector("#path-view");
const pathContent = document.querySelector("#path-content");
const savedView = document.querySelector("#saved-view");
const pathGrid = document.querySelector("#path-grid");
const savedGrid = document.querySelector("#saved-grid");
const emptyState = document.querySelector("#empty-state");
const savedEmpty = document.querySelector("#saved-empty");
const searchInput = document.querySelector("#search-input");
const collectionCount = document.querySelector("#collection-count");
const savedCount = document.querySelector("#saved-count");

let activeFormat = "all";
let activePathId = null;
let activeStepIndex = 0;
let visualSlideIndex = 0;
let showingSaved = false;

function readStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored === null ? fallback : JSON.parse(stored);
  } catch (error) {
    console.error(`Could not read ${key} from local storage.`, error);
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Could not save ${key} to local storage.`, error);
    announce("Your browser couldn't save this on this device.");
  }
}

function announce(message) {
  let liveRegion = document.querySelector("#app-announcement");
  if (!liveRegion) {
    liveRegion = document.createElement("p");
    liveRegion.id = "app-announcement";
    liveRegion.className = "visually-hidden";
    liveRegion.setAttribute("role", "status");
    document.body.append(liveRegion);
  }
  liveRegion.textContent = message;
}

function savedIds() {
  const saved = readStorage(storageKeys.saved, []);
  return Array.isArray(saved) ? saved.filter((id) => paths.some((path) => path.id === id)) : [];
}

function progressData() {
  const progress = readStorage(storageKeys.progress, {});
  return progress && typeof progress === "object" && !Array.isArray(progress) ? progress : {};
}

function noteData() {
  const notes = readStorage(storageKeys.notes, {});
  return notes && typeof notes === "object" && !Array.isArray(notes) ? notes : {};
}

function pathCompletion(path) {
  const completed = progressData()[path.id];
  return Array.isArray(completed) ? completed.filter((index) => index >= 0 && index < path.steps.length).length : 0;
}

function makeCard(path) {
  const card = document.createElement("article");
  card.className = "path-card";

  const top = document.createElement("div");
  top.className = "card-top";
  const art = document.createElement("span");
  art.className = `path-art ${path.tone}`;
  art.setAttribute("aria-hidden", "true");
  art.textContent = path.symbol;
  const category = document.createElement("span");
  category.className = "card-tag";
  category.textContent = path.category;
  top.append(art, category);

  const title = document.createElement("h3");
  title.textContent = path.title;
  const description = document.createElement("p");
  description.className = "card-description";
  description.textContent = path.description;

  const why = document.createElement("p");
  why.className = "card-why";
  const whyLabel = document.createElement("strong");
  whyLabel.textContent = "Why this? ";
  why.append(whyLabel, document.createTextNode(path.why));

  const bottom = document.createElement("div");
  bottom.className = "card-bottom";
  const meta = document.createElement("span");
  meta.className = "card-meta";
  meta.textContent = `${path.duration} · ${path.steps.length} small steps`;
  const formats = document.createElement("span");
  formats.className = "format-dots";
  formats.setAttribute("aria-label", path.steps.map((step) => formatLabels[step.type]).join(", "));
  [...new Set(path.steps.map((step) => step.type))].forEach((type) => {
    const dot = document.createElement("span");
    dot.className = "format-dot";
    dot.setAttribute("aria-hidden", "true");
    dot.textContent = formatIcons[type];
    formats.append(dot);
  });
  bottom.append(meta, formats);

  const saved = savedIds().includes(path.id);
  const saveButton = document.createElement("button");
  saveButton.className = `save-card${saved ? " is-saved" : ""}`;
  saveButton.type = "button";
  saveButton.textContent = saved ? "♥" : "♡";
  saveButton.setAttribute("aria-label", `${saved ? "Remove" : "Save"} ${path.title}`);
  saveButton.setAttribute("aria-pressed", String(saved));
  saveButton.addEventListener("click", () => toggleSaved(path.id));

  const openButton = document.createElement("button");
  openButton.className = "open-path";
  openButton.type = "button";
  openButton.setAttribute("aria-label", `Open learning path: ${path.title}`);
  openButton.addEventListener("click", () => openPath(path.id));

  card.append(top, title, description, why, bottom, saveButton, openButton);
  return card;
}

function renderCatalog() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  const matches = paths.filter((path) => {
    const matchesFormat = activeFormat === "all" || path.steps.some((step) => step.type === activeFormat);
    const searchable = `${path.title} ${path.description} ${path.category} ${path.why} ${path.searchTerms}`.toLocaleLowerCase();
    return matchesFormat && (!query || searchable.includes(query));
  });

  pathGrid.replaceChildren(...matches.map(makeCard));
  collectionCount.textContent = `${matches.length} ${matches.length === 1 ? "path" : "paths"}`;
  emptyState.hidden = matches.length > 0;
}

function renderSaved() {
  const saved = paths.filter((path) => savedIds().includes(path.id));
  savedGrid.replaceChildren(...saved.map(makeCard));
  savedEmpty.hidden = saved.length > 0;
  savedCount.textContent = String(saved.length);
}

function toggleSaved(pathId) {
  const saved = savedIds();
  const path = paths.find((item) => item.id === pathId);
  const next = saved.includes(pathId) ? saved.filter((id) => id !== pathId) : [...saved, pathId];
  writeStorage(storageKeys.saved, next);
  renderCatalog();
  renderSaved();
  if (showingSaved && activePathId === null) renderSaved();
  announce(`${path.title} ${next.includes(pathId) ? "saved to" : "removed from"} your library.`);
}

function showCatalog() {
  showingSaved = false;
  activePathId = null;
  homeView.hidden = false;
  catalog.hidden = false;
  pathView.hidden = true;
  savedView.hidden = true;
  document.querySelector("#saved-toggle").setAttribute("aria-pressed", "false");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showSaved() {
  showingSaved = true;
  activePathId = null;
  homeView.hidden = true;
  catalog.hidden = true;
  pathView.hidden = true;
  savedView.hidden = false;
  document.querySelector("#saved-toggle").setAttribute("aria-pressed", "true");
  renderSaved();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openPath(pathId) {
  const path = paths.find((item) => item.id === pathId);
  if (!path) {
    announce("That learning path could not be found.");
    return;
  }
  showingSaved = false;
  activePathId = pathId;
  activeStepIndex = 0;
  homeView.hidden = true;
  catalog.hidden = true;
  savedView.hidden = true;
  pathView.hidden = false;
  document.querySelector("#saved-toggle").setAttribute("aria-pressed", "false");
  renderPath();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderPath() {
  const path = paths.find((item) => item.id === activePathId);
  if (!path) return;

  const completed = progressData()[path.id];
  const doneSteps = Array.isArray(completed) ? completed : [];
  const hero = document.createElement("div");
  hero.className = "path-hero";
  const art = document.createElement("span");
  art.className = `path-art ${path.tone}`;
  art.setAttribute("aria-hidden", "true");
  art.textContent = path.symbol;
  const copy = document.createElement("div");
  copy.className = "path-hero-copy";
  const kicker = document.createElement("p");
  kicker.className = "eyebrow";
  kicker.textContent = path.category.toUpperCase();
  const title = document.createElement("h2");
  title.textContent = path.title;
  const desc = document.createElement("p");
  desc.textContent = path.description;
  const meta = document.createElement("div");
  meta.className = "path-meta-row";
  [path.duration, path.level, `${path.steps.length} short steps`].forEach((label) => {
    const pill = document.createElement("span");
    pill.className = "meta-pill";
    pill.textContent = label;
    meta.append(pill);
  });
  copy.append(kicker, title, desc, meta);
  hero.append(art, copy);

  const layout = document.createElement("div");
  layout.className = "learning-layout";
  const stepList = document.createElement("nav");
  stepList.className = "step-list";
  stepList.setAttribute("aria-label", "Steps in this learning path");
  const listTitle = document.createElement("p");
  listTitle.className = "step-list-title";
  listTitle.textContent = "YOUR LEARNING LOOP";
  stepList.append(listTitle);

  path.steps.forEach((step, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `step-button${index === activeStepIndex ? " is-current" : ""}${doneSteps.includes(index) ? " is-done" : ""}`;
    button.setAttribute("aria-current", index === activeStepIndex ? "step" : "false");
    const number = document.createElement("span");
    number.className = "step-number";
    number.textContent = doneSteps.includes(index) ? "✓" : String(index + 1);
    const text = document.createElement("span");
    text.className = "step-text";
    const type = document.createElement("span");
    type.className = "step-type";
    type.textContent = formatLabels[step.type];
    const label = document.createElement("span");
    label.className = "step-title";
    label.textContent = step.title;
    text.append(type, label);
    button.append(number, text);
    button.addEventListener("click", () => {
      activeStepIndex = index;
      visualSlideIndex = 0;
      renderPath();
    });
    stepList.append(button);
  });

  const progressWrap = document.createElement("div");
  progressWrap.className = "progress-wrap";
  const progressLine = document.createElement("div");
  progressLine.className = "progress-line";
  const progressFill = document.createElement("div");
  progressFill.className = "progress-fill";
  progressFill.style.width = `${(doneSteps.length / path.steps.length) * 100}%`;
  progressLine.append(progressFill);
  const progressText = document.createElement("p");
  progressText.className = "progress-text";
  progressText.textContent = `${doneSteps.length} of ${path.steps.length} steps explored`;
  progressWrap.append(progressLine, progressText);
  stepList.append(progressWrap);

  const lesson = renderLesson(path, path.steps[activeStepIndex], doneSteps);
  layout.append(stepList, lesson);
  pathContent.replaceChildren(hero, layout);
}

function renderLesson(path, step, doneSteps) {
  const panel = document.createElement("article");
  panel.className = "lesson-panel";
  const kicker = document.createElement("div");
  kicker.className = "lesson-kicker";
  kicker.textContent = `${formatIcons[step.type]} ${formatLabels[step.type]} · STEP ${activeStepIndex + 1}`;
  const title = document.createElement("h3");
  title.textContent = step.title;
  const lead = document.createElement("p");
  lead.className = "lesson-lead";
  lead.textContent = step.lead;
  panel.append(kicker, title, lead);

  if (step.type === "read") appendReading(panel, step);
  if (step.type === "watch") appendVisualLesson(panel, step);
  if (step.type === "think") appendReflection(panel, path, step);
  if (step.type === "try") appendTry(panel, step);

  if (step.source) {
    const source = document.createElement("div");
    source.className = "source-box";
    const info = document.createElement("div");
    info.className = "source-copy";
    const name = document.createElement("strong");
    name.textContent = step.source;
    const note = document.createElement("span");
    note.textContent = step.sourceNote;
    info.append(name, note);
    source.append(info);
    if (step.sourceUrl) {
      const link = document.createElement("a");
      link.className = "source-link";
      link.href = step.sourceUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Visit original ↗";
      source.append(link);
    }
    panel.append(source);
  }

  const actions = document.createElement("div");
  actions.className = "lesson-actions";
  const previous = document.createElement("button");
  previous.type = "button";
  previous.textContent = "← Previous";
  previous.disabled = activeStepIndex === 0;
  previous.addEventListener("click", () => moveStep(-1));
  const complete = document.createElement("button");
  complete.type = "button";
  complete.className = "complete-button";
  complete.textContent = doneSteps.includes(activeStepIndex) ? "Mark as not done" : "Mark step explored ✓";
  complete.addEventListener("click", () => toggleStepComplete(path, activeStepIndex));
  const next = document.createElement("button");
  next.type = "button";
  next.textContent = activeStepIndex === path.steps.length - 1 ? "Finish path →" : "Next step →";
  next.addEventListener("click", () => {
    if (!doneSteps.includes(activeStepIndex)) toggleStepComplete(path, activeStepIndex, false);
    if (activeStepIndex < path.steps.length - 1) moveStep(1);
    else announce("You reached the end of this path. Nice work.");
  });
  actions.append(previous, complete, next);
  panel.append(actions);
  return panel;
}

function appendReading(panel, step) {
  const copy = document.createElement("div");
  copy.className = "lesson-copy";
  step.paragraphs.forEach((text) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    copy.append(paragraph);
  });
  panel.append(copy);
}

function appendVisualLesson(panel, step) {
  const player = document.createElement("div");
  player.className = "visual-player";
  const stage = document.createElement("div");
  stage.className = "visual-stage";
  const current = step.slides[visualSlideIndex];
  const count = document.createElement("span");
  count.className = "visual-count";
  count.textContent = `VISUAL ${visualSlideIndex + 1} / ${step.slides.length}`;
  const art = document.createElement("span");
  art.className = "visual-art";
  art.setAttribute("aria-hidden", "true");
  art.textContent = current.art;
  const title = document.createElement("h4");
  title.textContent = current.title;
  const text = document.createElement("p");
  text.textContent = current.text;
  stage.append(count, art, title, text);

  const controls = document.createElement("div");
  controls.className = "visual-controls";
  const previous = document.createElement("button");
  previous.type = "button";
  previous.textContent = "← Back";
  previous.disabled = visualSlideIndex === 0;
  previous.addEventListener("click", () => {
    visualSlideIndex -= 1;
    renderPath();
  });
  const hint = document.createElement("span");
  hint.className = "visual-hint";
  hint.textContent = "Move at your own pace · No autoplay";
  const next = document.createElement("button");
  next.type = "button";
  next.textContent = visualSlideIndex === step.slides.length - 1 ? "Replay ↺" : "Next →";
  next.addEventListener("click", () => {
    visualSlideIndex = visualSlideIndex === step.slides.length - 1 ? 0 : visualSlideIndex + 1;
    renderPath();
  });
  controls.append(previous, hint, next);
  player.append(stage, controls);
  panel.append(player);
  if (step.videoUrl) {
    const videoLink = document.createElement("a");
    videoLink.className = "watch-source-link";
    videoLink.href = step.videoUrl;
    videoLink.target = "_blank";
    videoLink.rel = "noopener noreferrer";
    videoLink.textContent = `Watch original: ${step.videoTitle} ↗`;
    const videoNote = document.createElement("span");
    videoNote.className = "save-note";
    videoNote.textContent = step.videoNote;
    panel.append(videoLink, videoNote);
  }
}

function appendReflection(panel, path, step) {
  const prompts = document.createElement("div");
  prompts.className = "lesson-copy";
  const list = document.createElement("ul");
  step.prompts.forEach((prompt) => {
    const item = document.createElement("li");
    item.textContent = prompt;
    list.append(item);
  });
  prompts.append(list);
  const label = document.createElement("label");
  label.className = "reflection-label";
  label.htmlFor = "reflection-input";
  label.textContent = "A thought to keep (optional)";
  const textarea = document.createElement("textarea");
  textarea.className = "reflection-box";
  textarea.id = "reflection-input";
  textarea.maxLength = 4000;
  textarea.placeholder = "Take a moment. You can write privately here...";
  textarea.value = noteData()[`${path.id}:${activeStepIndex}`] || "";
  textarea.addEventListener("input", () => {
    const notes = noteData();
    notes[`${path.id}:${activeStepIndex}`] = textarea.value;
    writeStorage(storageKeys.notes, notes);
  });
  const saveNote = document.createElement("span");
  saveNote.className = "save-note";
  saveNote.textContent = "Saved only on this device.";
  panel.append(prompts, label, textarea, saveNote);
}

function appendTry(panel, step) {
  const box = document.createElement("div");
  box.className = "try-box";
  const list = document.createElement("ol");
  step.actions.forEach((action) => {
    const item = document.createElement("li");
    item.textContent = action;
    list.append(item);
  });
  box.append(list);
  if (step.close) {
    const close = document.createElement("p");
    close.textContent = step.close;
    close.style.marginTop = "12px";
    box.append(close);
  }
  if (step.link) {
    const link = document.createElement("a");
    link.href = step.link;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = step.linkText;
    link.style.display = "inline-block";
    link.style.marginTop = "12px";
    box.append(link);
  }
  panel.append(box);
}

function toggleStepComplete(path, index, rerender = true) {
  const progress = progressData();
  const done = Array.isArray(progress[path.id]) ? progress[path.id] : [];
  progress[path.id] = done.includes(index) ? done.filter((item) => item !== index) : [...done, index];
  writeStorage(storageKeys.progress, progress);
  if (rerender) renderPath();
}

function moveStep(direction) {
  const path = paths.find((item) => item.id === activePathId);
  if (!path) return;
  activeStepIndex = Math.max(0, Math.min(path.steps.length - 1, activeStepIndex + direction));
  visualSlideIndex = 0;
  renderPath();
}

document.querySelector("#format-filters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-format]");
  if (!button) return;
  activeFormat = button.dataset.format;
  document.querySelectorAll(".filter-chip").forEach((chip) => {
    const active = chip === button;
    chip.classList.toggle("is-active", active);
    chip.setAttribute("aria-pressed", String(active));
  });
  renderCatalog();
});

searchInput.addEventListener("input", renderCatalog);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    searchInput.value = "";
    renderCatalog();
    searchInput.blur();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
});

document.querySelector("#clear-search").addEventListener("click", () => {
  searchInput.value = "";
  activeFormat = "all";
  document.querySelector('[data-format="all"]').click();
});
document.querySelector("#saved-toggle").addEventListener("click", showSaved);
document.querySelector("#browse-button").addEventListener("click", showCatalog);
document.querySelector("#back-button").addEventListener("click", showCatalog);
document.querySelector("#saved-back-button").addEventListener("click", showCatalog);
document.querySelector("#home-link").addEventListener("click", (event) => {
  event.preventDefault();
  showCatalog();
});
document.querySelector("#footer-home").addEventListener("click", (event) => {
  event.preventDefault();
  showCatalog();
});

renderCatalog();
renderSaved();
