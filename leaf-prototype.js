// Leaf

let leaves = [];

let Leaf = function(parent) {
    this.parent = parent;
    this.dna = this.parent.dna;
    this.angle = this.parent.angle;
    this.segmentID = 0;
    this.root = new PetioleSegment(this, "forward");
    leaves.push(this);
};

Leaf.prototype.grow = function() {
    // This should 
    this.root.grow();
};

Leaf.prototype.gatherShapes = function(x, y) {
    // scene.registerEllipse(x, y);
    this.root.gatherShapes(x, y);
};

// Petiole

let PetioleSegment = function(parent, direction) {
    this.parent = parent;
    this.dna = this.parent.dna;
    this.isLeafRoot = this.parent instanceof Leaf;
    this.segmentID = parent.segmentID + 1;
    // this.isPetioluleRoot = this.parent.petioluleIndex == 0;
    this.isBranch = (direction == "left" || direction == "right");
    this.branchedDirection = direction;
    this.foliole = null;
    this.length = 0;
    if (this.isLeafRoot) {
        this.energy = this.dna.initialEnergy;
        // console.log("OH MY, " + this.energy);
        // this.isPetioluleRoot = 0;
        this.petioluleIndex = 0;
        this.petioleIndex = 0;
        this.lastBranching = "forward";
        this.coin = (Math.random() < 0.5) ? -1 : 1;
    } else {
        this.energy = this.parent.energy * this.dna.energyLoss;
        // console.log("Whoa there, " + this.energy);

        // If this petiole segment was a branching segment, then...
        if (this.isBranch) {
            this.lastBranching = direction;
            this.coin = (Math.random() < 0.5) ? -1 : 1;
            this.petioluleIndex = 0;
            this.petioleIndex = this.parent.petioleIndex + 1;
        } else {
            // Here, direction is "forward"
            this.lastBranching = parent.lastBranching;
            this.petioluleIndex = this.parent.petioluleIndex + 1;
            this.petioleIndex = this.parent.petioleIndex;
        }
        if (this.parent.children.length == 1) {
            this.coin = (Math.random() < 0.5) ? -1 : 1;
        } else {
            this.coin = this.parent.coin;
        }
    }

    let fL = this.dna.petioleBranchingFrequencyLeft;
    let oL = this.dna.petioleBranchingOffsetLeft;
    let fR = this.dna.petioleBranchingFrequencyRight;
    let oR = this.dna.petioleBranchingOffsetRight;
    this.branchedLeft = !((1 + this.petioluleIndex + oL) % fL == 0);
    this.branchedRight = !((1 + this.petioluleIndex + oR) % fR == 0);
    this.branchedForward = false;
    this.angle = this.parent.angle;
    this.angleDelta = 0;
    this.children = [];
};

PetioleSegment.prototype.grow = function() {

    if (this.isBranch) {
        if (Math.abs(this.angleDelta) < this.dna.petioleMaxAngleDelta) {
            if (this.lastBranching == "left") {
                this.angleDelta += this.dna.petioleAngleGrowth;
            } else if (this.lastBranching == "right") {
                this.angleDelta -= this.dna.petioleAngleGrowth;
            }
        }
    }
    this.angleDelta += (Math.random() > 0.5) ? -0.005 : 0.005;
    this.angle = this.parent.angle + this.angleDelta;

    for (let i = 0; i < this.children.length; i++) {
        this.children[i].grow();
        if (this.children[i].foliole) {
            this.children[i].foliole.grow();
        }
    }
    if (this.energy > 0) {
        // console.log("GROWTH" + this.energy);
        if (this.length < this.dna.petioleMaxSegmentLength) {
            this.length += this.dna.petioleSegmentGrowth;
            this.energy -= this.dna.petioleSegmentGrowthCost;
        }
    }

    if (this.petioleIndex <= this.dna.petioluleDepth) {
        if (Math.random() <= this.dna.petioleBranchingProbability) {
            if (!this.branchedLeft) {
                this.branch("left");
            }
        }
        if (Math.random() <= this.dna.petioleBranchingProbability) {
            if (!this.branchedRight) {
                this.branch("right");
            }
        }
    }

    if (this.petioluleIndex <= this.dna.petioleSegmentsToLeaflet) {
        if (Math.random() <= this.dna.petioleBranchingProbability) {
            if (!this.branchedForward) {
                this.branch("forward");
            }
        }
    }

    if (Math.random() <= this.dna.folioleProbability) {
        if (!this.foliole && !this.branchedForward) {
            this.makeFoliole();
        }
    }
};

PetioleSegment.prototype.branch = function(direction) {
    this.children.push(new PetioleSegment(this, direction));
    this.energy -= this.dna.petioleBranchingCost;

    if (direction == "left") {
        this.branchedLeft = true;
    } else if (direction == "forward") {
        this.branchedForward = true;
        if (this.foliole) {
            this.pushFoliole(this.children[this.children.length - 1]);
        }
    } else if (direction == "right") {
        this.branchedRight = true;
    } else {
        console.error("Invalid branching direction.");
    }
};


PetioleSegment.prototype.gatherShapes = function(x, y) {
    // console.log("What up?");
    let a = this.angle;
    let l = this.length;
    var newX = x + Math.cos(a) * l;
    var newY = y - Math.sin(a) * l;
    // sketch.strokeWeight(sketch.map(this.segmentID, 0, 40, 50, 5));
    // sketch.line(x, y, newX, newY);
    // console.log("x: " + x + ", y: " + y + ", newX: " + newX + " newY: " + newY);
    scene.registerLine(x, y, newX, newY, { r: 0, g: 0, b: 0, a: 55 });
    // scene.registerLine(0, 1, 2, 3);
    for (let i = 0; i < this.children.length; i++) {
        this.children[i].gatherShapes(newX, newY);
        if (this.children[i].foliole) {
            this.children[i].foliole.gatherShape(newX, newY);
        }
    }
};

PetioleSegment.prototype.makeFoliole = function() {
    this.foliole = new Foliole(this);
};

PetioleSegment.prototype.pushFoliole = function(destination) {
    if (this.foliole) {
        destination.foliole = this.foliole;
        this.foliole = null;
    }
};