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


var images = [
    '/Users/guillaumepelletier/Desktop/Dropbox/Art/p5/Evolutionary-Botany/frames/loop-010/botany-00000.png',
    'botany-00000-blur.png'
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
        mode: Jimp.BLEND_MULTIPLY,
        opacitySource: 0.85,
        opacityDest: 1
    });

    data[0].brightness(0.35);
    data[0].contrast(0.5);
    // data[0].resize(680, 680);

    data[0].write('test-lighter.png', function() {
        console.log("wrote the image");
    });
});