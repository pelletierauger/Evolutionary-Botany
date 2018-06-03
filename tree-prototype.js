let Tree = function(x, y, dna) {
    this.pos = { x: x, y: y };
    this.dna = dna;
    this.angle = Math.PI / 2;
    this.segmentID = 0;
    this.root = new Segment(this, "forward");
};

Tree.prototype.grow = function() {
    this.root.grow();
};

Tree.prototype.gatherShapes = function() {
    this.root.gatherShapes(this.pos.x, this.pos.y);
};

Tree.prototype.draw = function() {
    this.root.draw(this.pos.x, this.pos.y);
};

//-----------------------------------------------------------------

let Segment = function(parent, direction) {
    this.parent = parent;
    this.dna = parent.dna;
    this.isRoot = this.parent instanceof Tree;
    this.segmentID = parent.segmentID + 1;
    let fL = this.dna.branchingFrequencyLeft;
    let oL = this.dna.branchingOffsetLeft;
    let fR = this.dna.branchingFrequencyRight;
    let oR = this.dna.branchingOffsetRight;
    this.branchedLeftTest = !((this.segmentID + oL) % fL == 0);
    this.branchedRightTest = !((this.segmentID + oR) % fR == 0);
    this.branchedLeft = !((this.segmentID + oL) % fL == 0);
    this.branchedRight = !((this.segmentID + oR) % fR == 0);
    this.branchedForward = false;
    if (this.isRoot) {
        this.energy = this.dna.initialEnergy;
    } else {
        this.energy = this.parent.energy * this.dna.energyLoss;
    }
    if (direction == "left") {
        // this.angle = this.parent.angle + this.dna.branchingAngle;
        this.angle = this.parent.angle + (this.dna.branchingAngle * sketch.map(this.segmentID, 10, 30, 5, 0.1));
    } else if (direction == "forward") {
        this.angle = this.parent.angle;
    } else if (direction == "right") {
        // this.angle = this.parent.angle - this.dna.branchingAngle;
        this.angle = this.parent.angle - (this.dna.branchingAngle * sketch.map(this.segmentID, 10, 30, 5, 0.1));
    }
    this.children = [];
    this.length = 0;
};

Segment.prototype.grow = function() {
    if (this.energy > 0) {
        this.length += this.dna.branchGrowth;
        this.energy -= this.dna.branchGrowthCost;
    }
    for (let i = 0; i < this.children.length; i++) {
        this.children[i].grow();
    }
    if (Math.random() <= this.dna.branchingProbability) {
        if (!this.branchedLeft) {
            this.branch("left");
        }

    }
    if (Math.random() <= this.dna.branchingProbability) {
        if (!this.branchedForward) {
            this.branch("forward");
        }
    }
    if (Math.random() <= 0.9) {
        if (!this.branchedRight) {
            this.branch("right");
        }
    }
    this.angle += (Math.random() > 0.5) ? -0.005 : 0.005;
};

Segment.prototype.branch = function(direction) {
    this.children.push(new Segment(this, direction));
    this.energy -= this.dna.branchingCost;
    if (direction == "left") {
        this.branchedLeft = true;
    } else if (direction == "forward") {
        this.branchedForward = true;
    } else if (direction == "right") {
        this.branchedRight = true;
    } else {
        console.error("Invalid branching direction.");
    }
};

Segment.prototype.draw = function(x, y) {
    let a = this.angle;
    let l = this.length;
    var newX = x + Math.cos(a) * l;
    var newY = y - Math.sin(a) * l;
    // sketch.strokeWeight(sketch.map(this.segmentID, 0, 40, 50, 5));
    // sketch.line(x, y, newX, newY);
    scene.registerLine(x, y, newX, newY);
    for (let i = 0; i < this.children.length; i++) {
        this.children[i].draw(newX, newY);
    }
};

Segment.prototype.gatherShapes = function(x, y) {
    let a = this.angle;
    let l = this.length;
    var newX = x + Math.cos(a) * l;
    var newY = y - Math.sin(a) * l;
    // sketch.strokeWeight(sketch.map(this.segmentID, 0, 40, 50, 5));
    // sketch.line(x, y, newX, newY);
    // console.log("x: " + x + ", y: " + y + ", newX: " + newX + " newY: " + newY);
    scene.registerLine(x, y, newX, newY);
    // scene.registerLine(0, 1, 2, 3);
    for (let i = 0; i < this.children.length; i++) {
        this.children[i].gatherShapes(newX, newY);
    }
};