let DNA = function() {
    // Energy
    this.initialEnergy = 30;
    this.energyLoss = 0.9;
    this.branchGrowthCost = 0.01;
    this.branchingCost = 0.02;

    // Branching struture
    this.branchGrowth = 0.1;
    this.branchingAngle = Math.PI * 0.5;
    this.branchingProbability = 0.25;
    this.branchingFrequencyLeft = 9;
    this.branchingFrequencyRight = 9;
    this.branchingOffsetLeft = 3;
    this.branchingOffsetRight = 0;

    // Leaf structure
    this.petioleSegmentGrowth = 0.1;
    this.petioleMaxBranchings = 3;
    this.petioleMaxSegmentLength = 10;
    this.petioleSegmentsToLeaflet = 10;
    this.petioleMaxAngle = Math.PI * 0.15;
    this.petioleBranchingProbability = 0.25;
    this.petioleBranchingFrequencyLeft = 9;
    this.petioleBranchingFrequencyRight = 9;
    this.petioleBranchingOffsetLeft = 3;
    this.petioleBranchingOffsetRight = 0;
    this.petioluleDepth = 3;
    this.petioleTerminalLeaflet = 0;
    this.petioleMaxLeafletAmount = 10;
};