const numColumns = 32;
const buttonNote = ["Do", "Ti", "La", "Sol", "Fa", "Mi", "Re", "Do"];
const noteColor = [
  "#e33059",
  "#f7943d",
  "#edd929",
  "#95c631",
  "#11826d",
  "#5b37cc",
  "#ea57b2",
  "#e33059",
];
let noteGroup = [];
for (let i = 0; i < 32; i++) {
  noteGroup.push([]);
  if (i == 0) noteGroup[0].push(0);
}
const notePair = ["c/4", "d/4", "e/4", "f/4", "g/4", "a/4", "b/4"];

const gridContainer = document.getElementById("noteGroup");

gridContainer.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;

for (let i = 1; i <= 10 * numColumns; i++) {
  const button = document.createElement("button");
  button.classList.add("grid-btn");
  button.setAttribute("data-id", i);
  indexColumn = i % numColumns;
  indexRow = Math.floor(i / numColumns);
  if (i <= 8 * numColumns) {
    if (Math.floor((indexColumn - 1) / 4) % 2) {
      button.classList.add("oddBtn");
    } else {
      button.classList.add("evenBtn");
    }

    button.addEventListener("mousedown", () => {
      button.classList.toggle("selected");
      if (button.classList.contains("selected")) {
        if (!button.hasAttribute("data-original-bg")) {
          button.setAttribute(
            "data-original-bg",
            button.style.backgroundColor || ""
          );
        }
        const index = button.getAttribute("data-id");
        buttonRow = 7 - Math.floor(index / numColumns);
        button.style.backgroundColor = noteColor[buttonRow];
        // button.innerHTML = buttonNote[buttonRow];

        //play audio
      } else {
        const originalBg = button.getAttribute("data-original-bg");
        button.style.backgroundColor = originalBg || "";
      }
    });

    gridContainer.appendChild(button);

    //Give note to first button
    if (i % numColumns == 1) {
      const noteLabel = document.createElement("div");
      noteLabel.style.marginRight = "5px";
      noteLabel.style.display = "inline-block";
      noteLabel.style.verticalAlign = "center";
      noteLabel.textContent = buttonNote[indexRow];
      // document.appendChild(noteLabel);
      // button.innerHTML = buttonNote[indexRow];
    }
    if (i > 7 * numColumns) button.style.marginBottom = "30px";
  } else {
    button.style.borderRadius = "50%";
    button.style.width = "30%";
    button.style.height = "30%";
    button.style.marginLeft = "35%";
    button.style.backgroundColor = "#ccc";
    // gridContainer.style.gap = "10px";
    gridContainer.appendChild(button);
  }
}

// Initialize VexFlow
const VF = Vex.Flow;
const div = document.getElementById("notation");
const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

renderer.resize(1300, 200);
const context = renderer.getContext();

// Create a stave (staff)
const stave = new VF.Stave(10, 20, 160);
stave.addClef("treble").addTimeSignature("4/4");
stave.setContext(context).draw();

for (let i = 1; i < 8; i++) {
  let stave1 = new VF.Stave(stave.width * i + stave.x, 20, 160);
  stave1.setContext(context).draw();

  var notes = [
    // A quarter-note C.
    new VF.StaveNote({ clef: "treble", keys: ["a/4"], duration: "q" }),
    new VF.StaveNote({ clef: "treble", keys: ["b/4"], duration: "qr" }),
    // new VF.StaveNote({
    //   clef: "treble",
    //   keys: ["c/4", "e/4", "g/4"],
    //   duration: "q",
    // }),
  ];

  // for (let i = 0; i < 32; i++) {
  //   if (noteGroup[i] != "") {
  //     notes.push(
  //       new VF.StaveNote({ clef: "treble", keys: ["cb/4"], duration: "qr" })
  //     );
  //   }
  // }
  // console.log(noteGroup);

  // // Create a voice in 4/4 and add above notes
  var voice = new VF.Voice({ num_beats: 2, beat_value: 4 });
  voice.addTickables(notes);

  // Format and justify the notes to 400 pixels.
  var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 200);

  // Render voice
  voice.draw(context, stave1);
}
