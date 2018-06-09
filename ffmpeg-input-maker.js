var fs = require('fs');
let computedInput = "";

let sequences = [{
        path: "./frames/branching-003/botany-",
        start: 1,
        end: 142,
        copies: 1
    },
    {
        path: "./frames/branching-005/botany-",
        start: 1,
        end: 185,
        copies: 1
    },
    // {
    //     path: "./frames/branching-006/botany-",
    //     start: 1,
    //     end: 105,
    //     copies: 1
    // },
    {
        path: "./frames/branching-007/botany-",
        start: 1,
        end: 95,
        copies: 1
    },
    {
        path: "./frames/branching-008/botany-",
        start: 1,
        end: 98,
        copies: 1
    },
    {
        path: "./frames/branching-009/botany-",
        start: 1,
        end: 93,
        copies: 1
    },
    {
        path: "./frames/branching-010/botany-",
        start: 1,
        end: 122,
        copies: 1
    },
    {
        path: "./frames/branching-011/botany-",
        start: 1,
        end: 137,
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

fs.writeFile('branchings.txt', computedInput, function(err) {
    if (err) {
        return console.error(err);
    } else {
        console.log('branchings.txt written successfully.');
    }
});