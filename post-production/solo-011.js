var Jimp = require('jimp');

var images = [
    '/Users/guillaumepelletier/Desktop/Dropbox/Art/p5/Evolutionary-Botany/frames/loop-010/botany-00001.png',
    '/Users/guillaumepelletier/Desktop/Dropbox/Art/p5/Evolutionary-Botany/frames/loop-010-blurry-bright/botany-00001.png',
    '/Users/guillaumepelletier/Desktop/Dropbox/Art/p5/Evolutionary-Botany/frames/loop-010-blurry/botany-00001.png'
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
    // data[0].resize(680, 680);

    data[0].write('test-010-bright-02.png', function() {
        console.log("wrote the image");
    });
});