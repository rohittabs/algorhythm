<div align="center">

<img src="icons/icon-192.png" width="104" height="104" alt="Algorhythm">

# Algorhythm

**A free sight reading generator for musicians, teachers and students.**
Endless rhythm exercises with real engraving, plus tab and grand staff.

### [Open Algorhythm](https://rohittabs.github.io/algorhythm)

![license](https://img.shields.io/badge/license-MIT-555555?style=flat-square)
![price](https://img.shields.io/badge/price-free%20forever-2FBF71?style=flat-square)
![whole app](https://img.shields.io/badge/whole%20app-1%20file-e6338e?style=flat-square)
![account](https://img.shields.io/badge/account-not%20needed-7b3ff2?style=flat-square)
![tracking](https://img.shields.io/badge/tracking-none-555555?style=flat-square)
![works](https://img.shields.io/badge/works-offline-3B9EF5?style=flat-square)

[Take the two minute tour](https://rohittabs.github.io/algorhythm/slides.html)

</div>

---

## What is this?

Algorhythm is a web app that lives in a single HTML file. Open a link in a browser, add it to a home screen like a real app, and generate a fresh sight reading exercise every time you sit down to practice. Nothing is uploaded, nothing is tracked, and your saved exercises stay on your own device.

It writes rhythm the way a publisher would: correct beat grouping, correct beaming, tuplets, ties and swing markings. Turn on tablature and every note also gets a pitch, so a rhythm study becomes a reading study for guitar or ukulele. Turn on grand staff mode and you get a braced treble and bass system for piano, each hand with its own line.

**Live link:** https://rohittabs.github.io/algorhythm

---

## New in v3.0

### Real engraving glyphs

Clefs, accidentals and rests are now drawn with **Bravura**, the reference music font used by professional notation software. Bravura is designed so one staff space equals 0.25em, so the app scales the font to exactly four times the staff space and the symbols sit correctly at any size.

### Grand staff mode for piano and keyboard

A braced treble and bass system with a proper key signature, where each hand gets its own independent rhythm and its own line. Pick the key, the scale and a reading level, and the generator keeps the two hands musically consistent.

### Tab and pitch on guitar and ukulele

Every note takes a pitch from the scale you choose: all 12 keys, major, natural minor, major and minor pentatonic, or blues. Read it in open position or in any of the five shapes, with a fretboard diagram showing the position and its roots.

---

## What the app can do

**Rhythm**

- Any time signature, including irregular meters with a selectable grouping
- Correct beat grouping, beaming, tuplets and ties
- Straight or swing feel, with the swing marking engraved
- Rests on or off
- 1 to 64 bars

**Pitch and instrument**

- Guitar in standard EADGBE, ukulele in re-entrant high-G GCEA
- All 12 keys across major, natural minor, major and minor pentatonic, and blues
- Open position plus the five CAGED shapes on guitar, CAGFD on ukulele
- Fretboard diagram for the chosen position, with roots highlighted
- Grand staff mode with real key signatures and three reading levels

**Practice**

- Metronome with subdivisions and a count-in
- Play along: the rhythm click, the plucked instrument, or both, switchable mid-take
- Tunable drone with its own volume
- Loop
- Tempo takes effect while you are playing. Drag the slider, or double tap the big number to type one.

**Everything else**

- Save exercises to the Library and come back to them
- Print or export a PDF that shows the staves, meter and tempo mark with no app chrome
- Backup and restore your library as a file
- Light, dark or system appearance
- Notation sizes itself to the screen, so a phone gets fewer bars per line instead of a shrunken system
- Installable, and works with no connection at all

---

## The four tabs

### Create

Where the exercise is built. Choose the note values you want to see, the time signature and grouping, the number of bars, straight or swing, rests and ties. Two optional cards live here: **Tablature**, which adds a tab stave and pitches under the notation, and **Piano and keyboard**, which switches to the braced grand staff instead. Tap Generate.

### Practice

The big round button plays and stops. Around it sit the tempo, the meter, subdivisions, count-in, loop and the drone. Play along decides what you actually hear: the metronome beat always plays, and the toggle controls whether the exercise rhythm is sounded with it. Below that is the music itself, with buttons to favourite, regenerate and print.

### Library

Everything you saved. Open one and it loads straight back into Practice at the settings it was written with.

### More

Appearance, backup and restore, a short About, and the Support card.

---

## Files in this repository

| File | Purpose |
| --- | --- |
| `index.html` | the whole app: markup, styles, engraving, audio |
| `slides.html` | the two minute tour |
| `manifest.webmanifest` | app name, icons, colours, standalone display |
| `sw.js` | service worker, offline cache |
| `icons/` | app icons, including a maskable one for Android |
| `fonts/` | Bravura music font (SIL OFL) for clefs, accidentals and rests |
| `support-qr.png` | UPI QR shown in the Support card |
| `.nojekyll` | stops GitHub Pages running the files through Jekyll |

---

## How to install

Open the site, then:

### iPhone or iPad
Open the link in Safari, tap the Share button, scroll down, tap **Add to Home Screen**, then tap Add.

### Android phone or tablet
Open the link in Chrome. The browser offers **Install app**, either as a banner or from the three dot menu.

### Windows, Mac or Linux computer
Open the link in Chrome or Edge and click the install icon at the right of the address bar.

### Any other device with a modern browser
Just use the link. Installing only adds the icon and the offline copy, nothing about the app itself changes.

---

## Data and privacy

There is no account, no server and no analytics. Your saved exercises and settings live in your own browser's local storage on that one device. Nothing is ever sent anywhere.

That also means clearing your browser data, or deleting the app, removes them. Use **Backup** in the More tab before you do either, and **Restore** to bring them back.

---

## Notes on the theory

Guitar positions use the five CAGED shapes. Each is a five fret window anchored on the fret where that shape's root falls, which reproduces the standard positions (C major gives frets 0, 3, 5, 8, 10). The ukulele's four strings make the E shape impractical, so it uses the accepted **CAGFD** set (C major gives 0, 3, 5, 7, 10).

Re-entrant high-G tuning puts some pitches in two places at once. The generator picks whichever position keeps your hand still, so the tab stays playable.

The grand staff maps pitch to a diatonic step number (7 x octave + letter index), with the treble bottom line at E4 and the bass bottom line at G2. Bass key signature positions are the treble ones minus fourteen steps, which is two octaves. Middle C therefore falls one ledger line below the treble and one above the bass, the same pitch seen from either staff.

Reading levels were set by measuring ledger line load, counted in C major:

| Level | Right hand | Left hand | Notes on ledger lines |
| --- | --- | --- | --- |
| Beginner | C4-A5 | G2-C4 | 2 of 13 (RH), 1 of 11 (LH), never more than one line |
| Intermediate | A3-C6 | C2-E4 | 6 of 17 each hand, some with two |
| Advanced | F3-E6 | C2-G4 | 10 of 21 (RH), 8 of 19 (LH), some with three |

So Beginner keeps almost everything between the staff lines, and each step up trades that for range.

---

## Technical details

The app is one HTML file with no build step at runtime and no framework. Notation is drawn as SVG. Sound uses the Web Audio API, with separate buses for the metronome, the play along instrument, the subdivision pulse and the count-in, so a toggle takes effect on the next beat rather than at the end of the take.

Engraving glyphs come from **Bravura** (Steinberg, SIL Open Font License 1.1), see `fonts/Bravura-LICENSE.txt`.

### Deploying on GitHub Pages

1. Put these files in your repository, either at the root, in a `/docs` folder, or in a subfolder.
2. Go to **Settings, then Pages**, set Source to *Deploy from a branch*, and pick the branch and folder.
3. Wait for the build, then open the published URL.

Paths are all relative, so it works from a repository subfolder as well as from a domain root.

> A service worker needs HTTPS. GitHub Pages serves HTTPS, so installing and offline mode work there. Opening `index.html` from your filesystem runs the app but does not register the service worker.

### Updating

Edit `index.html`, then bump `CACHE` in `sw.js` so installed copies fetch the new build instead of serving the old cache. It currently reads `algorhythm-v3.0.0`, so the next patch deploy would be `algorhythm-v3.0.1`. The version label in the rail comes from `rv.textContent` in `index.html` and reads `v3.0`, so bump that on minor and major releases too.

Miss the cache bump and anyone who installed the app keeps the cached shell. The fetch handler is network first for navigations, so an online visitor still gets the new page, but an offline one stays on the old build until the cache name changes.

---

## Version history

### v3.0.0, current release
Bravura engraving for clefs, accidentals and rests. Grand staff mode for piano and keyboard, with real key signatures, three reading levels and an independent rhythm for each hand. Tab and pitch for guitar and ukulele across all 12 keys and five scale types, in open position and the CAGED and CAGFD shapes, with a fretboard diagram. Installable as an app with full offline support.

### v2.0
First public release. Rhythm generation with correct beat grouping, beaming, tuplets, ties and swing markings, any time signature including irregular meters, metronome with subdivisions and count-in, play along, tunable drone, loop, library, printing and light or dark appearance.

---

## License

MIT for the app's own code. Use it, change it, share it, teach with it.

Bravura is a separate work by Steinberg Media Technologies GmbH, licensed under the SIL Open Font License 1.1 and redistributed here under that license. See `fonts/Bravura-LICENSE.txt`.

---

<div align="center">

*Read anything.*

</div>
