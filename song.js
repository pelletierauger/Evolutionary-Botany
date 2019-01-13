let Song = function() {

};


// Chord.notes("Fm7b5")

// logJavaScriptConsole(Tonal.Key.triads("A major"));

triads = Tonal.Key.triads("A major");
triads = Tonal.Key.triads("E dorian");
triads = Tonal.Key.chords("C# dorian");
// logJavaScriptConsole(triads);
notes = Tonal.Chord.notes(triads[3]);
// logJavaScriptConsole(notes);
note = Tonal.Note.freq(notes[0] + "" + 2);
// logJavaScriptConsole(note);
// tree.reroot();
// newWalker();

let ranges = [1, 2, 3, 4, 5];

// tree.reroot();
// growthScalar = 0;
// growthScalar = 1;

// newWalker();
// notes = Tonal.Chord.notes(triads[0]);
// ranges = [1, 2, 3, 4, 5];
// logJavaScriptConsole(notes);

// newWalker();
// notes = Tonal.Chord.notes(triads[3]);
// ranges = [1, 2, 3, 4, 5];
// logJavaScriptConsole(notes);

// newWalker();
// // notes = Tonal.Chord.notes(triads[3] + "dim");
// notes = Tonal.Chord.notes("F#dim7");
// ranges = [1, 2, 3, 4, 5];
// logJavaScriptConsole(notes);

// newWalker();
// // notes = Tonal.Chord.notes(triads[3] + "dim");
// notes = Tonal.Chord.notes("F7");
// ranges = [1, 2, 3, 4, 5];
// logJavaScriptConsole(notes);

// newWalker();
// notes = Tonal.Chord.notes(triads[5]);
// ranges = [2, 3, 4, 5, 6];
// logJavaScriptConsole(notes);
// logJavaScriptConsole(triads[3]);
// logJavaScriptConsole(Tonal.Chord.notes("F#dim7"));

// newWalker();
// notes = Tonal.Chord.notes(triads[6]);
// logJavaScriptConsole(notes);

// newWalker();
// notes = Tonal.Chord.notes(triads[6] + "dim");
// logJavaScriptConsole(notes);