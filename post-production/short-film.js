const path = require('path');
const fs = require('fs');
const Jimp = require('jimp');

const folder = "/Users/guillaumepelletier/Desktop/Dropbox/Art/p5/Evolutionary-Botany/frames/short-film-001";
const blurryFolder = "/Users/guillaumepelletier/Desktop/Dropbox/Art/p5/Evolutionary-Botany/frames/short-film-001-blur";
// const blurryFolder2 = "/Users/guillaumepelletier/Desktop/Dropbox/Art/p5/Evolutionary-Botany/frames/loop-010-blurry";

const allFiles = fs.readdirSync(folder);
const allBlurryFiles = fs.readdirSync(blurryFolder);
// const allBlurryFiles2 = fs.readdirSync(blurryFolder2);

let images = [];
let blurryImages = [];
// let blurryImages2 = [];

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
// for (let i = 0; i < allBlurryFiles2.length; i++) {
//     if (allBlurryFiles2[i].substr(allBlurryFiles2[i].length - 3) == "png") {
//         blurryImages2.push(blurryFolder2 + "/" + allBlurryFiles2[i]);
//     }
// }
for (let i = 0; i < images.length; i++) {
    // for (let i = 0; i < 1; i++) {
    let fileName = path.basename(images[i]);
    console.log(fileName);
    let currentFiles = [
        Jimp.read(images[i]),
        Jimp.read(blurryImages[i])
    ];
    Promise.all(currentFiles).then(function(data) {
        return Promise.all(currentFiles);
    }).then(function(data) {
        data[0].composite(data[1], 0, 0, {
            opacitySource: 1,
            opacityDest: 1
        });
        data[0].write("./frames/short-film-001-composite/" + fileName, function() {
            console.log("wrote ./frames/short-film-001-composite/" + fileName);
        });
    });
}