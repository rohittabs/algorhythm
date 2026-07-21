# Algorhythm v2.0

Algorhythm is a rhythm sight-reading generator that lives entirely in one self-contained HTML file. Open it in a browser and it works, no server, no install, no dependencies. It is deployed at rohittabs.github.io/algorhythm.

This document covers the app in detail: what it does, how the engine works, how the file is built, and what changed in v2.0.

## What it does

Algorhythm generates rhythm exercises from a set of note values you pick, in a time signature you choose, engraves them as real notation (proper beat grouping, beaming, tuplets, ties, swing markings), and lets you practice them against a metronome with count-in, subdivision clicks, a "play along" click track, loop, and a tunable drone pad. Exercises can be saved to a library, backed up to a JSON file, restored on another device, and printed as clean sheet music.

It is built for anyone working on rhythm reading, not just students of a particular teacher.

## The four tabs

**Create.** Pick note values from a grid of chips (each chip shows the actual note glyph). Set the number of bars (1 to 64), the time signature (numerator 1 to 15 over a denominator of 2, 4, or 8), and, for meters where it applies, the beat grouping. Choose a feel: Straight, Swing 8th, or Swing 16th. Optionally include rests and tied notes. Press Generate.

**Practice.** Shows the engraved staff (or a timeline dot-grid view, toggled from the same screen) for the generated exercise. Transport controls: play/stop, metronome on/off, tempo slider (40 to 208 BPM), beat unit selector, subdivision clicks (off, 8ths, 16ths), count-in, play along, and loop. A drone section lets you turn on a sustained pad, pick its pitch, and set its volume. Below the staff: Save to Library, Regenerate (new exercise with the same settings), and Print / PDF.

**Library.** Grid of saved favorites, each restorable with a tap. Empty state points you back to the Practice tab's Save button.

**More.** Appearance (Light / Dark / System), Backup and share (download/restore a JSON backup), About text, and Erase all data.

## Note values supported

Whole, half, quarter, 8th, 16th, **32nd** (new in v2.0), dotted half, dotted quarter, dotted 8th, dotted 16th, and triplets at the quarter, 8th, and 16th level. Rests are available for whole, half, quarter, 8th, and 16th durations. All of these have real PNG artwork (not drawn glyphs), baked in as base64 so the file has zero external asset dependencies.

## Time signatures and grouping

Any numerator 1 through 15 over a denominator of 2, 4, or 8. For meters where the beat grouping is ambiguous (denominator 8 with numerator ≥ 4, or denominator 4 with numerator ≥ 5), a Grouping dropdown appears listing every valid composition of the bar into groups of 2 and 3 (e.g. 7/8 offers 3+2+2, 2+3+2, 2+2+3). A sensible default is pre-selected (7/8 defaults to 3+2+2). Whatever grouping is chosen drives four things simultaneously: how notes are beamed, where accent marks and metronome accent clicks land, where the beat lamps light up during playback, and how the timeline view numbers its beats.

## Generation engine

The generator works bar by bar. For each bar it has a table of "cells", pre-built combinations of notes (and occasionally rests) that fill a given beat-length exactly, tagged with which note values they require and correctly beamed and tupleted. It weights and picks cells so that, across the whole exercise, every note value you selected actually appears at least once, while respecting the values that are achievable in the chosen meter (some values are silently skipped if they can't fit, and you're told which ones). Ties are added afterward as a separate pass that joins a note across a beat boundary, matched with correct playback behavior so the tied note actually rings through rather than re-triggering.

## Notation rendering

The staff is drawn as inline SVG, built directly from the exercise data: noteheads and rests are the real PNG artwork positioned by their embedded notehead-center metadata, stems and beams are computed from the beat grouping, and triplet numerals are baked into the triplet artwork itself (bold italic serif, via PIL at build time) rather than added as separate SVG text. An alternate Timeline view renders the same exercise as a dot-grid, one dot per pulse, with duration trails, useful for feeling subdivisions rather than reading noteheads.

## Audio engine

Four independent gain buses feed one master gain node: the metronome beat (busMetro), the play-along exercise clicks (busAlong), the subdivision pulse (busPulse), and the count-in (busCount). Because these are live gain nodes rather than pre-scheduled one-shot sounds, toggling Play Along or Count-in mid-playback changes what you hear immediately (via setTargetAtTime ramps) without restarting or re-scheduling anything. The metronome's steady beat is always audible whenever the metronome is on, regardless of the Play Along toggle: Play Along only controls whether the exercise's own rhythm notes are added on top of that beat. Count-in fires only on the first pass through a loop, tracked with an explicit isFirst flag rather than inferred from playback state, because state inference proved unreliable across the loop boundary. Loop state itself is polled live every 150ms so toggling Loop takes effect immediately.

The drone pad is a richer synthesis than a simple oscillator: an asymmetric pulse wave, stacked intervals, and detuned oscillator pairs, so it functions as a proper practice reference tone rather than a flat sine.

Swing is available as a third feel option (alongside Straight and Swing 8th): Swing 16th swings the sixteenth-note subdivision instead of the eighth, with its own drawn swing-equivalence marking above the staff.

## Design and appearance

**v2.0 adds a full Light / Dark / System appearance mode.** The setting is applied by reading a `data-theme` attribute on the root HTML element, which every color in the stylesheet is defined relative to (via CSS custom properties: background, card surfaces, ink/text, hairline borders, the coral-to-purple gradient accent, warning and danger colors, all have separate light and dark values). "System" follows the OS-level `prefers-color-scheme` media query live, so if you change your device's appearance setting while the app is open, it updates without a reload. The choice is remembered in localStorage and re-applied on load, before the rest of the page even renders, to avoid a flash of the wrong theme. Note glyph artwork (originally drawn for a light background) is inverted via a CSS filter when dark mode is active so it stays legible.

The overall look is a light lavender-grey background with white rounded cards, a coral-pink-to-violet gradient used for accents and active states, and a floating navigation bar.

**v2.0 also adds a genuinely responsive navigation layout**, not just a resized version of the mobile one. Below 900px width, navigation is the original floating pill-shaped bottom tab bar (Create / Practice / Library / More) with frosted-glass blur. At 900px and above, the same nav element is restyled in place into a fixed 280px-wide left sidebar with the tabs stacked vertically, and the app's brand mark (logo and wordmark) physically relocates from the top of the page into the top of that sidebar via a small script that runs on load and on every resize across the breakpoint. A small "v2.0" version tag is appended to the bottom of the sidebar only in the wide layout.

## Storage and persistence

Settings (every control on the Create and Practice tabs) are persisted with a 250ms debounce so rapid changes don't spam writes. Favorites and settings are both written through a small storage adapter that tries, in order, the host page's artifact key-value storage API, then browser localStorage, then falls back to an in-memory object if neither is available, so the app degrades gracefully rather than crashing in restrictive embeds. Backup and Restore package favorites and settings together into one downloadable JSON file; Restore reads that file back in and repopulates both stores. Erase All Data clears both the favorites and settings keys.

## Print

The Print / PDF button calls the browser's native print dialog. A dedicated `@media print` stylesheet hides everything except the currently rendered staff (brand header, tab navigation, transport controls, action buttons, and every tab other than Practice are hidden), so what prints is a clean, undecorated sheet of the exercise, in black notation on a plain white background regardless of the active app theme.

## Build pipeline

The shipped `index.html` is not written by hand as one file; it's assembled from parts by a Python build script:

- `part_app_head.html`, `gen_block.txt`, `part_engrave.txt`, `part_sound.js`, `part_app_ui.js` are concatenated in that order.
- A `glyphs.json` file (produced separately by processing the source PNG artwork with PIL into base64 data URIs, including baking triplet numerals into the triplet images) is injected by a straightforward string replacement of a `__GLYPHS_JSON__` placeholder in the assembled output.
- Because the pipeline patches text via Python heredocs, literal `\n` sequences have occasionally leaked into the output as text instead of being interpreted as newlines; the build includes a post-process cleanup pass specifically to catch and fix this.
- `node --check` is run against the extracted `<script>` contents as a mandatory verification step before any build is considered shippable.

## What's new in v2.0, at a glance

- Light / Dark / System appearance mode, with live OS-preference tracking and no flash-of-wrong-theme on load.
- Responsive desktop layout: the bottom pill nav becomes a fixed left sidebar at 900px+, with the brand mark relocating into it and a version tag appended.
- 32nd notes (thirtysecond) added as a full note value, including its own beaming (three beams), its own dedicated cells, and combination cells pairing it with 8th, 16th, and dotted-16th notes.

## Known working principles carried forward from v1.0

- Toggling audio mid-playback requires live gain buses, not pre-scheduled audio.
- Count-in loop correctness comes from explicit pass-indexing (`isFirst`), not from inferring state.
- Irregular meter grouping has to propagate through every visual and audio layer at once, or the parts disagree with each other.
- Heredoc-based Python patching can leak literal `\n` into output; always run the cleanup pass.
- `node --check` on the extracted script is a required step before shipping, not an optional nicety.

## Terminology notes

The sustained reference tone is called "drone", not "shruti". The app is written for anyone practicing rhythm, so copy avoids "students" or classroom-specific language. The Play Along toggle controls whether the exercise's own rhythm notes are heard on top of the metronome, not whether the metronome itself is heard.
