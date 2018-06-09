let Tree = function(x, y, dna) {
    this.pos = { x: x, y: y };
    this.dna = dna;
    this.angle = Math.PI / 2;
    this.segmentID = 0;
    this.root = new Segment(this, "forward");
    scene.trees.push(this);
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
    this.isBranch = (direction == "left" || direction == "right");
    this.branchedDirection = direction;
    let fL = this.dna.branchingFrequencyLeft;
    let oL = this.dna.branchingOffsetLeft;
    let fR = this.dna.branchingFrequencyRight;
    let oR = this.dna.branchingOffsetRight;
    this.branchedLeft = !((this.segmentID + oL) % fL == 0);
    this.branchedRight = !((this.segmentID + oR) % fR == 0);
    this.branchedForward = false;
    if (this.isRoot) {
        this.energy = this.dna.initialEnergy;
        this.SegmentPosition = 0;
        this.lastBranching = "forward";

        this.coin = (Math.random() < 0.5) ? -1 : 1;
        // this.angle = this.parent.angle;
    } else {
        this.energy = this.parent.energy * this.dna.energyLoss;

        if (this.isBranch) {
            this.SegmentPosition = 0;
            this.lastBranching = direction;

            this.coin = (Math.random() < 0.5) ? -1 : 1;
        } else {
            this.SegmentPosition = this.parent.SegmentPosition + 1;
            this.lastBranching = parent.lastBranching;

            if (this.parent.children.length == 1) {
                this.coin = (Math.random() < 0.5) ? -1 : 1;
            } else {
                this.coin = this.parent.coin;
            }

        }

    }
    this.angle = this.parent.angle;
    this.angleDelta = 0;
    // if (direction == "left") {
    //     this.angle = this.parent.angle + this.dna.branchingAngle;
    //     this.angle = this.parent.angle;

    //     // this.angle = this.parent.angle + (this.dna.branchingAngle * sketch.map(this.segmentID, 10, 30, 5, 0.1));
    // } else if (direction == "forward") {
    //     this.angle = this.parent.angle;
    // } else if (direction == "right") {
    //     this.angle = this.parent.angle - this.dna.branchingAngle;
    //     this.angle = this.parent.angle;

    //     // this.angle = this.parent.angle - (this.dna.branchingAngle * sketch.map(this.segmentID, 10, 30, 5, 0.1));
    // }

    this.children = [];
    this.length = 0;
};

Segment.prototype.grow = function() {
    if (this.isBranch) {
        if (Math.abs(this.angleDelta) < this.dna.branchingAngle) {
            // console.log("this never happens");
            if (this.branchedDirection == "left") {
                this.angleDelta += 0.005;
                // this.angleDelta += Math.cos(this.SegmentPosition);
            } else if (this.branchedDirection == "right") {
                this.angleDelta -= 0.005;
                // this.angleDelta -= Math.cos(this.SegmentPosition);
            }
        }
    }
    if (Math.abs(this.angleDelta) < this.dna.branchingAngle * 0.1) {
        let freq = 1 + this.SegmentPosition * 0.5;
        // freq = (freq * -this.segmentID);
        // freq = Math.pow(freq, -3);
        if (this.lastBranching == "left") {
            this.angleDelta += (Math.cos(freq) * 0.001);
        } else if (this.lastBranching == "right") {
            this.angleDelta -= (Math.cos(freq) * 0.001);
        } else if (this.lastBranching == "forward") {
            this.angleDelta -= (Math.cos(freq) * 0.0001) * this.coin;
        }
    }
    this.angleDelta += (Math.random() > 0.5) ? -0.0005 : 0.0005;
    this.angle = this.parent.angle + this.angleDelta;
    if (this.energy > 0) {
        if (this.lastBranching == "forward") {
            this.length += this.dna.branchGrowth * 1;
        } else {
            this.length += this.dna.branchGrowth;
        }
        // this.length += this.dna.branchGrowth;
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
    if (Math.random() <= this.dna.branchingProbability) {
        if (!this.branchedRight) {
            this.branch("right");
        }
    }

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