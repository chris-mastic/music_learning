const numColumns = 20;
const buttonNote = ["Do", "Ti", "La", "Sol", "Fa", "Mi", "Re", "Do"];

const gridContainer = document.getElementById("noteGroup");

gridContainer.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;

for (let i = 1; i <= 8 * numColumns; i++) {
  const button = document.createElement("button");
  button.classList.add("grid-btn");
  button.setAttribute("data-id", i);
  indexColumn = i % numColumns;
  indexRow = Math.floor(i / numColumns);
  if (((indexColumn - 1 - ((indexColumn - 1) % 4)) / 4) % 2) {
    button.style.backgroundColor = "#5dc6fe";
  }

  button.addEventListener("click", () => {
    button.classList.toggle("selected");
    button.style.backgroundColor = "#ffcc00";
    button.style.color = "#fff";
    const index = button.getAttribute("data-id");
    buttonRow = Math.floor(index / numColumns);
    button.innerHTML = buttonNote[buttonRow];
  });

  gridContainer.appendChild(button);

  //Give note to first button
  if (i % numColumns == 1) {
    button.innerHTML = buttonNote[indexRow];
  }
}

// Initialize VexFlow
const VF = Vex.Flow;
const div = document.getElementById("notation");
const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

renderer.resize(500, 200);
const context = renderer.getContext();

// Create a stave (staff)
const stave = new VF.Stave(10, 40, 400);
stave.addClef("treble").addTimeSignature("4/4");
stave.setContext(context).draw();

var notes = [
  // A quarter-note C.
  new VF.StaveNote({ clef: "treble", keys: ["c/4"], duration: "q" }),

  // A quarter-note D.
  new VF.StaveNote({ clef: "treble", keys: ["d/4"], duration: "q" }),

  // A quarter-note rest. Note that the key (b/4) specifies the vertical
  // position of the rest.
  new VF.StaveNote({ clef: "treble", keys: ["b/4"], duration: "qr" }),

  // A C-Major chord.
  new VF.StaveNote({
    clef: "treble",
    keys: ["c/4", "e/4", "g/4"],
    duration: "q",
  }),
];

// Create a voice in 4/4 and add above notes
var voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
voice.addTickables(notes);

// Format and justify the notes to 400 pixels.
var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

// Render voice
voice.draw(context, stave);
