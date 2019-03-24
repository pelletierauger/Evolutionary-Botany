var Jimp = require('jimp');

// // open a file called "lenna.png"
// Jimp.read('/Users/guillaumepelletier/Desktop/Dropbox/Art/p5/Evolutionary-Botany/frames/loop-010/botany-00000.png', (err, lenna) => {
//     if (err) throw err;
//     lenna
//         .resize(256, 256) // resize
//         .quality(60) // set JPEG quality
//         .greyscale() // set greyscale
//         .write('botany-00000.jpg'); // save
// });

// let blu = Jimp.read('botany-00000-blur.png');





// Jimp.read('/Users/guillaumepelletier/Desktop/Dropbox/Art/p5/Evolutionary-Botany/frames/loop-010/botany-00000.png')
//     .then(image => {
//         // Do stuff with the image.
//         // image.gaussian(1);

//         image.composite(Jimp.read('botany-00000-blur.png'), 0, 0, {
//             mode: Jimp.BLEND_MULTIPLY,
//             opacitySource: 0.5,
//             opacityDest: 1
//         });
//         // image.gaussian(10);
//         image.write('botany-00000.png');
//     })
//     .catch(err => {
//         // Handle an exception.
//     });

// /Users/guillaumepelletier/Desktop/Dropbox/Art/p5/Evolutionary-Botany/testfilter.png
'/Users/guillaumepelletier/Desktop/Dropbox/Art/p5/Evolutionary-Botany/frames/loop-011-blurry/botany-00101.png';

var images = [
    '/Users/guillaumepelletier/Desktop/Dropbox/Art/p5/Evolutionary-Botany/frames/loop-010/botany-00001.png',
    '/Users/guillaumepelletier/Desktop/Dropbox/Art/p5/Evolutionary-Botany/testfilter.png'
];

var jimps = [];

for (var i = 0; i < images.length; i++) {
    jimps.push(Jimp.read(images[i]));
}

Promise.all(jimps).then(function(data) {
    return Promise.all(jimps);
}).then(function(data) {
    // data[0].composite(data[1], 0, 0);
    // data[0].composite(data[2], 0, 0);

    data[0].composite(data[0], 1, 1, {
        mode: Jimp.BLEND_DARKEN,
        opacitySource: 0.5,
        opacityDest: 1
    });

    data[0].composite(data[1], 0, 0, {
        mode: Jimp.BLEND_OVERLAY,
        opacitySource: 0.95,
        opacityDest: 1
    });
    data[0].brightness(0.05);
    data[0].contrast(0.05);
    // data[0].resize(680, 680);

    data[0].write('test-010-bright.png', function() {
        console.log("wrote the image");
    });
});