let folioles = [];

let Foliole = function(parent) {
    this.parent = parent;
    this.dna = this.parent.dna;
    folioles.push(this);
    this.veinAmount = this.dna.folioleVeinAmount;
    this.createVeins();
    this.veins = [];
};

Foliole.prototype.createVeins = function() {
    for (let i = 0; i < this.veinAmount; i++) {
        this.veins.push({
            length: 0,
            angle: 0,
            leftExtenderLength: 0,
            leftExtenderAngle: 0,
            rightExtenderLength: 0,
            rightExtenderAngle: 0,
        });
    }
};

Foliole.prototype.grow = function() {
    // console.log("The foliole is growing!");
};

Foliole.prototype.gatherShapes = function(x, y) {
    // console.log("The foliole is growing!");
    // scene.registerEllipse(x, y);
};