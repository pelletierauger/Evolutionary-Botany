const path = require('path');
const fs = require('fs');
const Jimp = require('jimp');

const folder = "/Users/guillaumepelletier/Desktop/Dropbox/Art/p5/Evolutionary-Botany/frames/loop-010";
const blurryFolder = "/Users/guillaumepelletier/Desktop/Dropbox/Art/p5/Evolutionary-Botany/frames/loop-010-blurry";

const allFiles = fs.readdirSync(folder);
const allBlurryFiles = fs.readdirSync(blurryFolder);

let images = [];
let blurryImages = [];

for (let i = 0; i < allFiles.length; i++) {
    if (allFiles[i].substr(allFiles[i].length - 3) == "png") {
        images.push(folder + "/" + allFiles[i]);
    }
}
for (let i = 0; i < allBlurryFiles.length; i++) {
    if (allBlurryFiles[i].substr(allBlurryFiles[i].length - 3) == "png") {
        blurryImages.push(blurryFolder + "/" + allBlurryFiles[i]);
    }
}
// console.log(images);
// console.log(blurryImages);
// var jimps = [];

// for (var i = 0; i < images.length; i++) {
//     jimps.push(Jimp.read(images[i]));
// }

// Gaussian blur a folder
// for (let i = 0; i < images.length; i++) {
//     let fileName = path.basename(images[i]);
//     Jimp.read(images[i])
//         .then(image => {
//             image.gaussian(10);
//             image.write('./blurry/' + fileName);
//         })
//         .catch(err => {
//             // Handle an exception.
//         });
// }

for (let i = Infinity; i < images.length; i++) {
    let fileName = path.basename(images[i]);
    let blurryFileName = path.basename(blurryImages[i]);
    Jimp.read(images[i])
        .then(image => {
            image.composite(image, 3, 3, {
                mode: Jimp.BLEND_DARKEN,
                opacitySource: 0.5,
                opacityDest: 1
            });

            image.composite(Jimp.read(blurryImages[i]), 0, 0, {
                mode: Jimp.BLEND_MULTIPLY,
                opacitySource: 0.85,
                opacityDest: 1
            });
            image.brightness(0.35);
            image.contrast(0.5);
            image.write("./composite/" + fileName, function() {
                console.log("wrote the image");
            });
        });
}

for (let i = 0; i < images.length; i++) {
    let fileName = path.basename(images[i]);
    let blurryFileName = path.basename(blurryImages[i]);
    let currentFiles = [Jimp.read(images[i]), Jimp.read(blurryImages[i])];
    Promise.all(currentFiles).then(function(data) {
        return Promise.all(currentFiles);
    }).then(function(data) {
        // data[0].composite(data[1], 0, 0);
        // data[0].composite(data[2], 0, 0);

        data[0].composite(data[0], 1, 1, {
            mode: Jimp.BLEND_DARKEN,
            opacitySource: 0.75,
            opacityDest: 1
        });

        data[0].composite(data[1], 0, 0, {
            mode: Jimp.BLEND_MULTIPLY,
            opacitySource: 0.85,
            opacityDest: 1
        });

        data[0].brightness(0.35);
        data[0].contrast(0.5);

        data[0].write("./composite-02/" + fileName, function() {
            console.log("wrote ./composite-02/" + fileName);
        });
    });
}
























// Promise.all(jimps).then(function(data) {
//     return Promise.all(jimps);
// }).then(function(data) {
//     // data[0].composite(data[1], 0, 0);
//     // data[0].composite(data[2], 0, 0);
//     data[0].gaussian(10);
//     data[0].write('test.png', function() {
//         console.log("wrote the image");
//     });
// });