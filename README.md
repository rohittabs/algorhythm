# Algorhythm

**The Sight Reading Generator.** A single file web app that generates rhythm sight reading exercises with correct music engraving, then lets you practice them with a metronome, count-in, play along, a timeline view, and a tunable drone.

Everything runs in the browser. There is no server, no account, and no tracking. Your saved exercises and settings stay on your own device.

Live app: https://rohittabs.github.io/algorhythm

---

## What it does

Algorhythm builds a fresh rhythm exercise from the note values, bars, time signature and feel you choose, engraves it the way it appears in real method books, and gives you a full practice rig around it. It is aimed at anyone reading rhythm: beginners counting their first bars, students preparing for exams, and players drilling odd meters or swing.

---

## Features in detail

### Note values
Pick any mix of thirteen note values as the raw material for the exercise:

- Whole, half, quarter, 8th, 16th, 32nd
- Dotted half, dotted quarter, dotted 8th, dotted 16th
- Quarter triplets, 8th triplets, 16th triplets

The generator guarantees coverage: every value you select that can fit the chosen meter will appear at least once in the exercise. If a value cannot be placed in the current time signature (for example a pattern that needs a partner value), the app tells you which ones it skipped and why.

### Bars and time signature
- Bars: 1 to 64. Default is 4.
- Numerator: 1 to 15.
- Denominator: 2, 4, or 8.

The engraver picks the correct beaming and beat grouping for the meter automatically.

### Groupings for irregular meters
Irregular meters divide into groups of twos and threes, and the accent falls on the first note of each group. When you choose a meter where grouping matters (any /8 meter with 4 or more beats, or any /4 meter with 5 or more beats), a Grouping selector appears listing every valid combination.

- 7/8 defaults to 3+2+2, and you can switch it to 2+2+3, 2+3+2, and so on.
- 5/8 offers 3+2 or 2+3.
- 9/8 can be the usual compound 3+3+3, or an irregular grouping like 2+2+2+3.
- 5/4 and 7/4 support groupings too, which set the accent pattern.

The grouping drives beaming, tuplet placement, accents, the metronome accent clicks, the beat lamps, and the numbers under the timeline, so the whole app stays musically consistent no matter the meter.

### Feel: straight and swing
- Straight
- Swing 8th: the offbeat 8th is pushed to a triplet feel.
- Swing 16th: the offbeat 16th is swung while the 8ths stay straight.

Swing is available in simple meters. When you pick swing, the score prints the standard swing equivalence marking, the same figure you see at the top of jazz charts, and playback and the metronome subdivisions follow the swing.

### Rests and tied notes
- **Include rests** mixes rests into the exercise using proper rest artwork.
- **Include tied notes** joins a note across a beat so it rings on, exactly the way syncopation is written in real music. Ties always land on a real beat or accent boundary so the meter stays visible, they only join two plain notes (never a rest, never a note inside a triplet), and they keep the beat count unchanged. During playback a tied note sustains as one sound with no re-attack.

### Correct engraving
The score is drawn as real notation, not a rough approximation:

- Proper note heads, stems, flags, and beams, with secondary beams for 16ths and smaller.
- Beaming never crosses a beat group boundary.
- Triplet brackets and numerals in the engraved book style.
- Real artwork for whole notes, half notes, quarter rests, and 8th rests.
- Tie arcs curved under the note heads.
- Time signature, a rhythm clef, bar numbers, and a final double bar.
- Systems wrap and stretch to fill the width, and the sheet scrolls sideways on a phone.

### Two views
- **Notation**: the engraved staff.
- **Timeline**: a dot grid that shows each onset on a subdivision grid with duration trails, beat numbers under each group, and bar lines. This is useful for students who cannot read notation yet but can see and feel the rhythm.

Both views highlight each note as it plays.

### Practice transport
- A round play button, or tap it again to stop.
- A separate metronome button that runs the click on its own.
- Tempo from 40 to 208 BPM, with a live pendulum and beat lamps.
- **Beat unit**: choose which note value the metronome counts, from whole down to 16th including dotted variants.
- **Subdivide**: off, 8ths, or 16ths, so the metronome can tick the inner pulse.
- **Count-in**: an optional one bar count before the exercise. It plays only on the first pass, even when looping.
- **Play along**: when on, you hear the exercise rhythm played back. When off, you hear only the steady metronome beat and read the rhythm yourself. The metronome beat plays either way.
- **Loop**: repeat the exercise continuously. You can switch loop on or off mid play and it responds cleanly.

All of these toggles respond live, so flipping a switch while the exercise is playing takes effect at once. Pressing stop cuts every scheduled sound instantly.

### Drone
A tunable drone pad for practicing rhythms on a pitched instrument while holding a tonal center. It uses a rich pad synthesis with a reed timbre, a pure fifth and octave stacked above the root, a sub octave below, gentle detuning for warmth, and slow movement so it breathes like a real drone rather than a flat electronic tone.

- Pitch selector spans two octaves with enharmonic spellings, for example C sharp / D flat.
- A volume control for the pad.
- The drone runs during both the metronome and the exercise, and you can change its pitch or volume live.

### Library and favorites
Generated an exercise you like? Tap Save on the Practice tab and it appears in the Library tab as a card showing its meter, grouping, feel, bar count, and save date. Load it back any time, exactly as it was, or delete it. Up to 20 favorites are kept.

### Backup, restore, and erase
Everything lives only on your device. In the More tab you can:

- **Download backup file**: saves a JSON file of your settings and favorites.
- **Restore from backup**: load that JSON on any device to bring everything across.
- **Erase all data**: clears saved settings and favorites.

### Print
Print gives a clean sheet of just the engraved staff, with all the app controls hidden, ready to read from or hand out.

### Design
A light, calm interface with soft cards and a coral to pink accent, a floating bottom tab bar, and layouts that adapt from a narrow phone up to a wide desktop. It installs nothing and works offline once loaded.

---

## How to use it

1. Open the app.
2. On the **Create** tab, pick your note values, bars, time signature, grouping, and feel, and turn on rests or tied notes if you want them.
3. Press **Generate exercise**. You jump to the **Practice** tab.
4. Set the tempo, choose your beat unit and subdivision, and decide on count-in, play along, and loop.
5. Press the round button to play. Read along with the moving highlight, or turn play along off and read against the metronome.
6. Save exercises you like to the **Library**, and back up your data from **More**.

---

## Technical notes

- One self contained `index.html`. No build step, no dependencies, no network calls.
- All audio uses the Web Audio API. Every scheduled sound is tracked so stop is instant.
- The rhythm generation engine is heavily tested. The public build ships after passing hundreds of thousands of automated assertions covering bar lengths, beaming, tuplets, coverage, groupings across sixteen meter types, and tie rules across fourteen meters.
- Data is stored locally in the browser under the keys `algorhythm:settings` and `algorhythm:favs`.
- Works in current versions of Chrome, Safari, Firefox, and Edge on desktop and mobile.

---

## Privacy

Algorhythm has no server and no account system. It does not collect, transmit, or store any of your data anywhere except in your own browser on your own device. Clearing your browser data or using the Erase all data button removes it.

---

## Version

**v1.0** is the first public release.

---

Made for musicians who want to read rhythm well.
