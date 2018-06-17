let folioles = [];

let Foliole = function(parent) {
    this.parent = parent;
    this.dna = this.parent.dna;
    folioles.push(this);
    this.veinAmount = this.dna.folioleVeinAmount;
    this.veins = [];
    this.createVeins();
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
        this.veins[i].length += 0.3;
        this.veins[i].leftExtenderLength += 0.3;
        this.veins[i].rightExtenderLength += 0.3;
    }
};

Foliole.prototype.gatherShapes = function(x, y) {
    // scene.registerEllipse(x, y);
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
        scene.registerEllipse(veinPos.x, veinPos.y);
        // We then get the position of its leftExtender
        let ll = vein.leftExtenderLength;
        let la = a + vein.leftExtenderAngleDelta;
        let leftExtenderPos = {
            x: veinPos.x + Math.cos((Math.PI * 0.5) + la) * ll,
            y: veinPos.y - Math.sin((Math.PI * 0.5) + la) * ll
        };
        scene.registerLine(veinPos.x, veinPos.y, leftExtenderPos.x, leftExtenderPos.y);
        scene.registerEllipse(leftExtenderPos.x, leftExtenderPos.y, { r: 200, g: 0, b: 0, a: 155 });
        leftPoints.push(leftExtenderPos);

        //And then the position of its RightExtender
        let rl = vein.rightExtenderLength;
        let ra = a + vein.rightExtenderAngleDelta;
        let rightExtenderPos = {
            x: veinPos.x + Math.cos((-Math.PI * 0.5) + ra) * rl,
            y: veinPos.y - Math.sin((-Math.PI * 0.5) + ra) * rl
        };
        scene.registerLine(veinPos.x, veinPos.y, rightExtenderPos.x, rightExtenderPos.y);
        scene.registerEllipse(rightExtenderPos.x, rightExtenderPos.y, { r: 0, g: 0, b: 200, a: 155 });
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
    scene.registerEllipse(finalPoint.x, finalPoint.y);


    contourPoints = contourPoints.concat(leftPoints);
    contourPoints.push(finalPoint);

    // Gotta go backwards in this array ! This doesn't work.
    for (let i = rightPoints.length - 1; i >= 0; i--) {
        contourPoints.push(rightPoints[i]);
    }
    // contourPoints = contourPoints.concat(rightPoints);

    // var newX = x + Math.cos(a) * l;
    // var newY = y - Math.sin(a) * l;
    scene.registerPolygon(contourPoints);
    // scene.registerEllipse(x, y);
};