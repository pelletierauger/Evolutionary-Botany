let Song = function() {

};


// Chord.notes("Fm7b5")

// logJavaScriptConsole(Tonal.Key.triads("A major"));

triads = Tonal.Key.triads("A major");
triads = Tonal.Key.triads("E dorian");
triads = Tonal.Key.chords("E dorian");
logJavaScriptConsole(triads);
notes = Tonal.Chord.notes(triads[3]);
logJavaScriptConsole(notes);
note = Tonal.Note.freq(notes[0] + "" + 2);
// logJavaScriptConsole(note);
// tree.reroot();
// newWalker();

ranges = [1, 2, 3];

newWalker();
notes = Tonal.Chord.notes(triads[0]);
ranges = [1, 2, 3, 4, 5];

newWalker();
notes = Tonal.Chord.notes(triads[3]);
ranges = [1, 2, 3, 4, 5];

newWalker();
notes = Tonal.Chord.notes(triads[3] + "dim");
ranges = [1, 2, 3, 4, 5];

newWalker();
notes = Tonal.Chord.notes(triads[5]);
ranges = [2, 3, 4, 5, 6];

newWalker();
notes = Tonal.Chord.notes(triads[6]);
logJavaScriptConsole(triads[6]);

newWalker();
notes = Tonal.Chord.notes(triads[6] + "dim");
logJavaScriptConsole(triads[6]);