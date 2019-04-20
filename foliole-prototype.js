let folioles = [];

let Foliole = function(parent) {
    this.parent = parent;
    this.dna = this.parent.dna;
    folioles.push(this);
    this.veinAmount = this.dna.folioleVeinAmount;
    this.veins = [];
    this.createVeins();
    // let c = sketch.random(0, 75);
    // // c = 0;
    // this.col = { r: c, g: c, b: c, a: 255 };

    // 103, 52, 152
    let c = Math.random();
    let red = 73 * c;
    let green = 102 * c;
    let blue = 252 * c;
    this.col = { r: red, g: green, b: blue, a: 255 };





};

Foliole.prototype.createVeins = function() {
    for (let i = 0; i < this.veinAmount; i++) {
        this.veins.push({
            length: 0,
            angleDelta: 0,
            leftExtenderLength: 0,
            leftExtenderAngleDelta: 0,
            rightExtenderLength: 0,
            rightExtenderAngleDelta: 0,
        });
    }
};

Foliole.prototype.grow = function() {
    for (let i = 0; i < this.veins.length; i++) {

        let growthMap = sketch.map(i, -2, this.veins.length, 0, Math.PI);
        // let a = this.dna.maxKnotsLevel0;
        // let g = sketch.map(this.parent.petioluleIndex, 0, a, 1, 0);
        // console.log("g: ", g);
        let privateGrowth = Math.sin(growthMap);
        // growth *= Math.sin(growth * 0.5);
        // growth = 1;
        if (this.veins[i].length < this.dna.maxFolioleVeinLength) {
            this.veins[i].length += this.dna.folioleVeinGrowth;
        }
        if (growth) {
            this.veins[i].angleDelta += (Math.random() < 0.5) ? -0.0025 : 0.0025;
        }
        if (this.veins[i].leftExtenderLength < this.dna.maxFolioleWidth * privateGrowth) {
            this.veins[i].leftExtenderLength += this.dna.folioleExtenderGrowth * privateGrowth;
        }
        if (this.veins[i].leftExtenderLength < this.dna.maxFolioleWidth * privateGrowth) {
            this.veins[i].rightExtenderLength += this.dna.folioleExtenderGrowth * privateGrowth;
        }
    }
};

Foliole.prototype.gatherShapesDebug = function(x, y) {
    scene.registerEllipse(x, y);
};

Foliole.prototype.gatherShapes = function(x, y) {
    // scene.registerEllipse(x, y, { r: 255, g: 0, b: 0, a: 255 });
    let contourPoints = [];
    contourPoints.push({ x: x, y: y });
    let leftPoints = [];
    let rightPoints = [];
    let a = this.parent.angle;
    for (let i = 0; i < this.veins.length - 1; i++) {

        // We first get the position of a vein
        let vein = this.veins[i];
        let l = vein.length;
        a += vein.angleDelta;
        let veinPos = {
            x: x + Math.cos(a) * l,
            y: y - Math.sin(a) * l
        };
        // scene.registerEllipse(veinPos.x, veinPos.y, { r: 0, g: 255, b: 0, a: 255 });

        // We then get the position of its leftExtender
        let ll = vein.leftExtenderLength;
        let la = a + vein.leftExtenderAngleDelta;
        let leftExtenderPos = {
            x: veinPos.x + Math.cos((Math.PI * 0.5) + la) * ll,
            y: veinPos.y - Math.sin((Math.PI * 0.5) + la) * ll
        };
        // scene.registerLine(veinPos.x, veinPos.y, leftExtenderPos.x, leftExtenderPos.y);
        // scene.registerEllipse(leftExtenderPos.x, leftExtenderPos.y, { r: 200, g: 0, b: 0, a: 155 });
        leftPoints.push(leftExtenderPos);

        //And then the position of its RightExtender
        let rl = vein.rightExtenderLength;
        let ra = a + vein.rightExtenderAngleDelta;
        let rightExtenderPos = {
            x: veinPos.x + Math.cos((-Math.PI * 0.5) + ra) * rl,
            y: veinPos.y - Math.sin((-Math.PI * 0.5) + ra) * rl
        };
        // scene.registerLine(veinPos.x, veinPos.y, rightExtenderPos.x, rightExtenderPos.y);
        // scene.registerEllipse(rightExtenderPos.x, rightExtenderPos.y, { r: 0, g: 0, b: 200, a: 155 });
        rightPoints.push(rightExtenderPos);

        x = veinPos.x;
        y = veinPos.y;
    }

    let finalVein = this.veins[this.veins.length - 1];
    let finalLenght = finalVein.length;
    let finalAngle = a + finalVein.angleDelta;
    let finalPoint = {
        x: x + Math.cos(finalAngle) * finalLenght,
        y: y - Math.sin(finalAngle) * finalLenght
    }
    // scene.registerEllipse(finalPoint.x, finalPoint.y);


    contourPoints = contourPoints.concat(leftPoints);
    contourPoints.push(finalPoint);

    // Gotta go backwards in this array ! This doesn't work.
    for (let i = rightPoints.length - 1; i >= 0; i--) {
        contourPoints.push(rightPoints[i]);
    }
    // contourPoints = contourPoints.concat(rightPoints);

    // var newX = x + Math.cos(a) * l;
    // var newY = y - Math.sin(a) * l;
    // console.log(finalPoint.y);
    let m = Math.min(sketch.map(finalPoint.y, -500, -600, 0, 1), 1);
    let c = this.col;
    scene.registerPolygon(contourPoints, { r: c.r * m, g: c.g * m, b: c.b * m, a: 255 });

    // if (finalPoint.y > -500) {
    //     scene.registerPolygon(contourPoints, { r: 0, g: 0, b: 0, a: 255 });
    //     // console.log("yeah!");
    //     // console.log()
    // } else {
    //     // scene.registerPolygon(contourPoints, { r: 0, g: 0, b: 0, a: 255 });
    //     scene.registerPolygon(contourPoints, this.col);
    // }



    // scene.registerPolygon(contourPoints, this.col);
    // scene.registerEllipse(x, y);
};