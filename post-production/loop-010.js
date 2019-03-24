const path = require('path');
const fs = require('fs');
const Jimp = require('jimp');

const folder = "/Users/guillaumepelletier/Desktop/Dropbox/Art/p5/Evolutionary-Botany/frames/loop-010";
const blurryFolder = "/Users/guillaumepelletier/Desktop/Dropbox/Art/p5/Evolutionary-Botany/frames/loop-010-blurry-bright";
const blurryFolder2 = "/Users/guillaumepelletier/Desktop/Dropbox/Art/p5/Evolutionary-Botany/frames/loop-010-blurry";

const allFiles = fs.readdirSync(folder);
const allBlurryFiles = fs.readdirSync(blurryFolder);
const allBlurryFiles2 = fs.readdirSync(blurryFolder2);

let images = [];
let blurryImages = [];
let blurryImages2 = [];

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
for (let i = 0; i < allBlurryFiles2.length; i++) {
    if (allBlurryFiles2[i].substr(allBlurryFiles2[i].length - 3) == "png") {
        blurryImages2.push(blurryFolder2 + "/" + allBlurryFiles2[i]);
    }
}
for (let i = 0; i < images.length; i++) {
    let fileName = path.basename(images[i]);
    let blurryFileName = path.basename(blurryImages[i]);
    let currentFiles = [
        Jimp.read(images[i]),
        Jimp.read(blurryImages[i]),
        Jimp.read(blurryImages2[i])
    ];
    Promise.all(currentFiles).then(function(data) {
        return Promise.all(currentFiles);
    }).then(function(data) {
        data[0].composite(data[0], 1, 1, {
            mode: Jimp.BLEND_DARKEN,
            opacitySource: 0.5,
            opacityDest: 1
        });
        data[0].composite(data[1], 0, 0, {
            mode: Jimp.BLEND_HARDLIGHT,
            opacitySource: 0.65,
            opacityDest: 1
        });
        data[0].composite(data[2], 0, 0, {
            mode: Jimp.BLEND_MULTIPLY,
            opacitySource: 0.65,
            opacityDest: 1
        });
        data[0].brightness(0.35);
        data[0].contrast(0.45);
        data[0].write("./loop-010-bright-02/" + fileName, function() {
            console.log("wrote ./loop-010-bright-02/" + fileName);
        });
    });
}