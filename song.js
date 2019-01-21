let Song = function() {

};


// Chord.notes("Fm7b5")

// logJavaScriptConsole(Tonal.Key.triads("A major"));

triads = Tonal.Key.triads("A major");
triads = Tonal.Key.triads("E dorian");
triads = Tonal.Key.chords("C# dorian");
// logJavaScriptConsole(triads);
notes = Tonal.Chord.notes(triads[0]);
// logJavaScriptConsole(notes);
note = Tonal.Note.freq(notes[0] + "" + 2);
// logJavaScriptConsole(note);
// tree.reroot();
// newWalker();

let octaves = [1, 2, 3, 4, 5];

triads = Tonal.Key.chords("C# dorian");
// triads = Tonal.Key.chords("C# ionian");

socket.emit('sendOSC', {
   address: "/bassNotes",
   type: "f",
   value: getFreqs(notes, 2)
});

updateBass = function() {
    socket.emit('sendOSC', {
    address: "/bassNotes",
    type: "f",
    value: getFreqs(notes, 2)
    });
};

// log(spawnFreq);
// spawnFreq = 30 * 4 * 2;

// walkers = [];
// tree.rero0t(); 
// growthFrame = 0;
// growthScalar = 1;

// maxGrowth = 250;
// tree.pos.x = 50;

// growthScalar = 0;
// growthScalar = 1;
// treeIsGrowing = !treeIsGrowing;


getFreqs = function(notes, octave) {
    let frequencies = [];
    for (let i = 0; i < notes.length; i++) {
        let note = notes[i] + "" + octave;
        let freq = Tonal.Note.freq(note);
        frequencies.push(freq);
    }
    return frequencies;
}


// log(notes);
// log(getFreqs(notes, 2));

// triads = Tonal.Key.chords("C# dorian");
// // newWalker(0.5);
// notes = Tonal.Chord.notes(triads[0]);
// octaves = [-1, 0, 1, 2, 3, 4, 5];
// logJavaScriptConsole(notes);
// updateBass();

// triads = Tonal.Key.chords("C# ionian");
// // newWalker(0.5);
// notes = Tonal.Chord.notes(triads[0]);
// octaves = [-1, 0, 1, 2, 3, 4, 5];
// logJavaScriptConsole(notes);
// updateBass();

// newWalker(0.5);
// notes = Tonal.Chord.notes(triads[0]);
// octaves = [-1, 0, 1, 2, 3, 4, 5];
// logJavaScriptConsole(notes);

// // newWalker(0.5);
// notes = Tonal.Chord.notes("F#dim7");
// octaves = [1, 2, 3, 4, 5];
// logJavaScriptConsole(notes);

// triads = Tonal.Key.chords("C# ionian");
// // newWalker(0.5);
// notes = Tonal.Chord.notes(triads[5]);
// octaves = [1, 2, 3, 4, 5];
// logJavaScriptConsole(notes);



// newWalker(3);
// notes = Tonal.Chord.notes("G#m7");
// octaves = [1, 2, 3, 4, 5];
// logJavaScriptConsole(notes);

// newWalker();
// notes = Tonal.Chord.notes(triads[5]);
// octaves = [2, 3, 4, 5, 6, 7];
// logJavaScriptConsole(notes);

// newWalker();
// notes = Tonal.Chord.notes(triads[6]);
// logJavaScriptConsole(notes);

// newWalker();
// notes = Tonal.Chord.notes("Bm7");
// logJavaScriptConsole(notes);