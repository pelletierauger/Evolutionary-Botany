var fs = require('fs');
let computedInput = "";
let fileName = "loop-006-offset-04"

let sequences = [{
        path: "./frames/loop-006/botany-",
        start: 106,
        end: 299,
        copies: 1
    },
    {
        path: "./frames/loop-006/botany-",
        start: 0,
        end: 105,
        copies: 1
    }
];

for (s of sequences) {
    for (let f = s.start; f <= s.end; f++) {
        var formattedF = "" + f;
        while (formattedF.length < 5) {
            formattedF = "0" + formattedF;
        }
        let line = `file '${s.path}${formattedF}.png'\n`;
        for (let i = 0; i < s.copies; i++) {
            computedInput += line;
        }
    }
}

fs.writeFile(fileName + ".txt", computedInput, function(err) {
    if (err) {
        return console.error(err);
    } else {
        console.log(fileName + ".txt written successfully.");
    }
});