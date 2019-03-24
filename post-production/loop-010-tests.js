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
    // for (let i = 0; i < 1; i++) {
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

        data[0].scan(0, 0, data[0].bitmap.width, data[0].bitmap.height, function(x, y, idx) {
            // x, y is the position of this pixel on the image
            // idx is the position start position of this rgba tuple in the bitmap Buffer
            // this is the image

            var red = this.bitmap.data[idx + 0];
            var green = this.bitmap.data[idx + 1];
            var blue = this.bitmap.data[idx + 2];
            var alpha = this.bitmap.data[idx + 3];

            // rgba values run from 0 - 255
            // e.g. this.bitmap.data[idx] = 0; // removes red from this pixel
            // let newColor = adjustLevels(-20, 120, 120, {
            //     r: this.bitmap.data[idx + 0],
            //     g: this.bitmap.data[idx + 1],
            //     b: this.bitmap.data[idx + 2]
            // });
            // const colx = 0.5;
            // const coly = 0.5;
            // const colmax = 1;
            // let r = adjFun(this.bitmap.data[idx + 0], colx, coly, colmax);
            // let g = adjFun(this.bitmap.data[idx + 1], colx, coly, colmax);
            // let b = adjFun(this.bitmap.data[idx + 2], colx, coly, colmax);
            red = colorFloor(red, 40);
            green = colorFloor(green, 40);
            blue = colorFloor(blue, 40);

            this.bitmap.data[idx + 0] = red;
            this.bitmap.data[idx + 1] = green;
            this.bitmap.data[idx + 2] = blue;
            this.bitmap.data[idx + 3] = 255;
            // this.bitmap.data[idx + 0] = newColor.r;
            // this.bitmap.data[idx + 1] = newColor.g;
            // this.bitmap.data[idx + 2] = newColor.b;
        });


        data[0].write("./loop-010-bright-03c/" + fileName, function() {
            console.log("./loop-010-bright-03c/" + fileName + " written successfully.");
        });
    });
}

function colorFloor(x, ceiling) {
    if (x > ceiling) {
        return Math.floor(x);
    } else {
        let newX = x * Math.pow(Math.cos(-1 + x / ceiling), 20);
        if (newX > ceiling / 30) {
            let lerps = map(newX, ceiling / 30, ceiling, 0, 1);
            newX = lerp(newX, x, lerps);
        }
        if (newX < 11) { newX = 0; }
        return Math.floor(newX);
    }
}


function adjFun(a, tx, ty, max) {
    var ar = a / max;
    var txr = tx / max;
    var bot = (2 * txr - 1) * ar - txr;
    return ar * (1 + (txr - ty) * (1 - ar) / bot);
}

function adjustLevels(dark, mid, light, values) {
    var originalMid = 255 / 2;
    var stretchedMid = map(originalMid, 0, 255, 0 + dark, 255 + light);
    var vals = [values.r, values.g, values.b];
    for (var i = 0; i < vals.length; i++) {

        vals[i] = map(vals[i], 0, 255, 0 + dark, 255 + light);

        // midPoint Shifting Algorithm : what is between 0 and 128 must be mapped between 0 and 178,
        // what is between 129 and 255 must be mapped between 179 and 255.

        // Adjusted for dark and light : 
        // what is between dark and originalMid must mapped between dark and (originalMid + mid),
        // what is between originalMid and light must be mapped between (originalMid + mid) and light;
        // console.log(vals[i]);
        if (vals[i] >= 0 + dark && vals[i] <= stretchedMid) {
            // console.log("Darker! : " + vals[i]);
            vals[i] = map(vals[i], dark, stretchedMid, dark, stretchedMid + mid);
            // console.log("Darker after ! : " + vals[i]);
        } else if (vals[i] > originalMid && vals[i] <= 255 + light) {
            // console.log("Lighter! : " + vals[i]);
            vals[i] = map(vals[i], stretchedMid, light, stretchedMid + mid, light);
            // console.log("Lighter after! : " + vals[i]);
        }

        //Then we constrain the value to proper rgb values.
        vals[i] = constrain(vals[i], 0, 255);
        //We round the value.
        vals[i] = Math.round(vals[i]);

    }
    values.r = vals[0];
    values.g = vals[1];
    values.b = vals[2];
    return values;
    //For every argument starting at arguments[3], do this...
    // for (var i = 3; i < arguments.length; i++) {

    // }

}


function map(n, start1, stop1, start2, stop2) {
    return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
}

function constrain(n, low, high) {
    return Math.max(Math.min(n, high), low);
}

function lerp(start, stop, amt) {
    return amt * (stop - start) + start;
}